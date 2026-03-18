'use client'

import { use, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'
import { XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts'
import { usePersonControllerFindPersons } from '@/lib/api/generated/person-controller/person-controller'
import { useLoanControllerFindLoans } from '@/lib/api/generated/loan-controller/loan-controller'
import type { Person } from '@/types/api/person'
import type { Loan } from '@/types/api/loan'
import LoanStatusBadge from '@/components/officer/LoanStatusBadge'

/* ─── Helpers ─── */

function formatCurrency(value: number | undefined): string {
  if (value == null) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatSSN(ssn: string | undefined): string {
  if (!ssn) return '—'
  if (ssn.length === 9) return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`
  return ssn
}

/* ─── Realistic credit score mock data (TODO: replace with real API) ─── */
/* Matches Figma: scores in 700-900 range, gentle variation, 16 months Dec '24 → Mar '26 */

const CREDIT_HISTORY = [
  { month: "Dec '24", score: 748 },
  { month: "Jan '25", score: 755 },
  { month: "Feb '25", score: 762 },
  { month: "Mar '25", score: 758 },
  { month: "Apr '25", score: 771 },
  { month: "May '25", score: 780 },
  { month: "Jun '25", score: 785 },
  { month: "Jul '25", score: 792 },
  { month: "Aug '25", score: 801 },
  { month: "Sep '25", score: 810 },
  { month: "Oct '25", score: 825 },
  { month: "Nov '25", score: 818 },
  { month: "Dec '25", score: 795 },
  { month: "Jan '26", score: 768 },
  { month: "Feb '26", score: 742 },
  { month: "Mar '26", score: 721 },
]

/* ─── Mock summary data (TODO: replace with AI risk assessment API) ─── */

const SUMMARY_ROWS: { label: string; value: string; color: string; badge?: boolean }[] = [
  { label: 'Identity', value: 'Verified', color: '#16A41D', badge: true },
  { label: 'Verified income', value: '$92,000', color: '#16A41D' },
  { label: 'Estimated Monthly Net Income', value: '$6,400', color: '#16A41D' },
  { label: 'Income Stability Score', value: 'High', color: '#16A41D', badge: true },
  { label: 'Average Monthly Balance', value: '$9,882', color: '#16A41D' },
  { label: 'Savings Rate', value: '22%', color: '#16A41D' },
  { label: 'Cash Flow Stability', value: 'High', color: '#16A41D', badge: true },
  { label: 'Fraud Risk Score', value: 'Low', color: '#BA1A1A', badge: true },
]

/* ─── Shared styles ─── */

const labelSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '16px',
  color: '#7F879E',
}

const valueSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#2E2C46',
}

/* ─── Page Component ─── */

export default function CustomerDetailPage({ params }: { params: Promise<{ email: string }> }) {
  const { email } = use(params)
  const decodedEmail = decodeURIComponent(email)
  const searchParams = useSearchParams()
  const selectedLoanId = searchParams.get('loanId')

  // Fetch person
  const { data: personPage, isLoading: personLoading } = usePersonControllerFindPersons(
    { q: `email='${decodedEmail}'`, page: 1, size: 1 },
  ) as { data: { content?: Person[] } | undefined; isLoading: boolean }
  const person = (personPage as { content?: Person[] })?.content?.[0]

  // Fetch all loans for this person
  const { data: loansPage, isLoading: loansLoading } = useLoanControllerFindLoans(
    { q: `personEmail='${decodedEmail}'`, page: 1, size: 20, sort: 'id desc' },
  )
  const loans = ((loansPage as { content?: Loan[] })?.content ?? []) as Loan[]

  // Selected loan (from query param or first loan)
  const activeLoan = useMemo(() => {
    if (selectedLoanId) {
      const found = loans.find((l) => String(l.id) === selectedLoanId)
      if (found) return found
    }
    return loans[0] ?? null
  }, [loans, selectedLoanId])

  const latestScore = CREDIT_HISTORY[CREDIT_HISTORY.length - 1]?.score ?? 0
  const isLoading = personLoading || loansLoading
  const canAction = activeLoan?.loanStatus?.name === 'PENDING' || activeLoan?.loanStatus?.name === 'AWAITING'

  return (
    <Box sx={{ width: '100%', maxWidth: 1304 }}>
      {/* Title row */}
      <Box className="flex items-center justify-between" sx={{ mb: '24px' }}>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: '#2E2C46' }}>
          Customer Details
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px',
            letterSpacing: '0.1px', bgcolor: '#474DDD', color: 'white', textTransform: 'none',
            borderRadius: '8px', height: 34, boxShadow: 'none',
            '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
          }}
        >
          Ask Lex Anything
        </Button>
      </Box>

      {/* Two-column layout */}
      <Box className="flex gap-[5px]" sx={{ width: '100%' }}>
        {/* ─── LEFT PANEL (840px) ─── */}
        <Box className="flex flex-col" sx={{ width: 840, gap: '5px' }}>

          {/* ── Profile + Personal Info (single card matching Figma) ── */}
          <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
            {isLoading ? (
              <Box sx={{ p: '20px' }}>
                <Box className="flex items-center gap-[12px]" sx={{ mb: '20px' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box><Skeleton variant="text" width={160} height={24} /><Skeleton variant="text" width={120} height={20} /></Box>
                </Box>
                <Box className="flex gap-[32px]">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="text" width={100} height={40} />)}</Box>
              </Box>
            ) : (
              <>
                {/* Profile header row */}
                <Box className="flex items-center justify-between" sx={{ px: '20px', py: '16px' }}>
                  <Box className="flex items-center gap-[12px]">
                    <Image src="/icons/officer/avatar-1.png" alt="" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    <Box>
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#2E2C46' }}>
                        {person?.firstName} {person?.lastName}
                      </Typography>
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '13px', color: '#474DDD' }}>
                        {activeLoan?.applicationId ?? decodedEmail}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-[12px]">
                    <Box className="flex items-center gap-[6px]" sx={{ border: '1px solid #E5E5EC', borderRadius: '1000px', px: '12px', py: '6px' }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#16A41D' }} />
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', color: '#16A41D' }}>
                        Income $66K
                      </Typography>
                    </Box>
                    <Box className="flex items-center gap-[6px]" sx={{ border: '1px solid #E5E5EC', borderRadius: '1000px', px: '12px', py: '6px' }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#FF6800' }} />
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', color: '#FF6800' }}>
                        Credit score {latestScore}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Personal info fields — inner tinted area matching Figma */}
                <Box sx={{ mx: '20px', mb: '20px', bgcolor: '#F8F9FD', borderRadius: '8px', px: '20px', py: '20px' }}>
                  {/* Row 1 */}
                  <Box className="flex" sx={{ gap: '32px', mb: '28px' }}>
                    <InfoField label="D.O.B" value={formatDate(person?.dob)} width={109} />
                    <InfoField label="Phone" value={person?.phoneNumber ?? '—'} width={101} />
                    <InfoField label="Email" value={person?.email ?? '—'} width={157} />
                    <InfoField label="Social Security No." value={formatSSN(person?.socialSecurityNumber)} width={106} />
                    <InfoField label="Job title" value="—" width={151} />
                  </Box>
                  {/* Row 2 */}
                  <Box className="flex" sx={{ gap: '32px' }}>
                    <InfoField label="Employer" value="—" width={105} />
                    <InfoField label="Employment type" value="—" width={101} />
                    <InfoField label="Years with employer" value="—" width={114} />
                    <InfoField label="Address" value={person?.address ?? '—'} width={235} />
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {/* ── Financial Overview — 3 metric cards ── */}
          <Box className="flex gap-[5px]">
            <FinancialMetric label="DEBT TO INCOME RATIO" value="34%" trend="Acceptable Risk" trendColor="#16A41D" showTrendIcon />
            <FinancialMetric label="PROBABILITY OF DEFAULT" value="10%" trend="2% since last credit update" trendColor="#16A41D" showTrendIcon />
            <FinancialMetric label="TOTAL EXPOSURE" value="437K" trend="Normal lending range" trendColor="#7F879E" showTrendIcon={false} />
          </Box>

          {/* ── Credit Score History Chart ── */}
          <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0', p: '20px' }}>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#2E2C46', mb: '12px' }}>
              Credit Score History
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={CREDIT_HISTORY} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6800" stopOpacity={0.08} />
                    <stop offset="100%" stopColor="#FF6800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, fill: '#7F879E' }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  domain={[0, 900]}
                  ticks={[0, 300, 600, 900]}
                  tick={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, fill: '#7F879E' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    color: 'white',
                    backgroundColor: '#2E2C46',
                    padding: '14px 18px',
                  }}
                  labelStyle={{ color: '#FFFFFF80', fontSize: '10px', marginBottom: '4px' }}
                  itemStyle={{ color: 'white', fontWeight: 700, fontSize: '22px' }}
                  formatter={(value) => [`${value}`, '']}
                  labelFormatter={(label) => `${label}`}
                />
                <Area
                  type="linear"
                  dataKey="score"
                  stroke="#FF6800"
                  strokeWidth={2.5}
                  fill="url(#scoreGradient)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#FF6800', stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* ─── RIGHT PANEL (467px) ─── */}
        <Box className="flex flex-col" sx={{ width: 467 }}>
          <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0', p: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>

            {/* Applications header */}
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', color: '#474DDD', mb: '18px' }}>
              Applications in progress ({loans.length})
            </Typography>

            {loansLoading ? (
              <Box className="flex flex-col gap-[12px]">
                <Skeleton variant="rounded" width="100%" height={42} />
                <Skeleton variant="rounded" width="100%" height={62} />
                <Skeleton variant="rounded" width="100%" height={300} />
              </Box>
            ) : activeLoan ? (
              <>
                {/* Active loan card */}
                <Box className="flex items-center gap-[12px]" sx={{ mb: '18px' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: '#F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/icons/officer/metric-pending.png" alt="" width={20} height={20} />
                  </Box>
                  <Box>
                    <Box className="flex items-center gap-[6px]">
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#2E2C46' }}>
                        {activeLoan.loanType?.displayName ?? 'Personal Loan'}
                      </Typography>
                      <Typography sx={{ fontSize: '10px', color: '#7F879E' }}>▾</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#7F879E' }}>
                      {activeLoan.applicationId}
                    </Typography>
                  </Box>
                </Box>

                {/* Loan details row — 3 columns with dividers */}
                <Box className="flex items-start" sx={{ gap: '0px', mb: '20px' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ...labelSx, mb: '2px' }}>Requested amount</Typography>
                    <Typography sx={{ ...valueSx, fontWeight: 700 }}>{formatCurrency(activeLoan.principleAmount)}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC', mx: '16px' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ...labelSx, mb: '2px' }}>Requested tenure</Typography>
                    <Typography sx={{ ...valueSx, fontWeight: 700 }}>{activeLoan.tenure} year{(activeLoan.tenure ?? 0) !== 1 ? 's' : ''}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC', mx: '16px' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ...labelSx, mb: '2px' }}>Purpose</Typography>
                    <Typography sx={{ ...valueSx, fontWeight: 700 }}>{activeLoan.loanType?.displayName ?? '—'}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F0F0F0', mb: '12px' }} />

                {/* Summary section */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ borderLeft: '3px solid #474DDD', pl: '12px', mb: '12px' }}>
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', color: '#2E2C46' }}>
                      Summary
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: '#F0F0F0', mb: '0px' }} />

                  {SUMMARY_ROWS.map((row, idx) => (
                    <Box key={row.label}>
                      <Box className="flex items-center justify-between" sx={{ py: '11px' }}>
                        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#2E2C46' }}>
                          {row.label}
                        </Typography>
                        {row.badge ? (
                          <Box
                            sx={{
                              bgcolor: row.color === '#BA1A1A' ? '#FDECEA' : '#E8F5E9',
                              borderRadius: '4px',
                              px: '8px',
                              py: '4px',
                            }}
                          >
                            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', color: row.color }}>
                              {row.value}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '13px', lineHeight: '16px', color: row.color }}>
                            {row.value}
                          </Typography>
                        )}
                      </Box>
                      {idx < SUMMARY_ROWS.length - 1 && <Divider sx={{ borderColor: '#F5F5F5' }} />}
                    </Box>
                  ))}
                </Box>

                {/* Action buttons — only for pending/awaiting loans */}
                {canAction && (
                  <Box className="flex items-center justify-end gap-[12px]" sx={{ pt: '16px', borderTop: '1px solid #F0F0F0', mt: '12px' }}>
                    <Image src="/icons/common/ai-assist.png" alt="AI" width={34} height={34} style={{ marginRight: 'auto' }} />
                    <Button
                      variant="outlined"
                      sx={{
                        fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px',
                        color: '#E32E34', borderColor: '#E32E34', textTransform: 'none',
                        borderRadius: '8px', height: 40, width: 90, borderWidth: 1,
                        '&:hover': { borderColor: '#E32E34', bgcolor: 'rgba(227,46,52,0.04)', borderWidth: 1 },
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px',
                        bgcolor: '#474DDD', color: 'white', textTransform: 'none',
                        borderRadius: '8px', height: 40, width: 105, boxShadow: 'none',
                        '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
                      }}
                    >
                      Approve
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '14px', color: '#7F879E', textAlign: 'center', py: '40px' }}>
                No loan applications found for this customer.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/* ─── Sub-components ─── */

function InfoField({ label, value, width }: { label: string; value: string; width?: number }) {
  return (
    <Box sx={{ width: width ?? 'auto', minWidth: 0 }}>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '11px', lineHeight: '16px', color: '#7F879E', mb: '16px' }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '13px', lineHeight: '20px', color: '#2E2C46' }}>
        {value}
      </Typography>
    </Box>
  )
}

function FinancialMetric({ label, value, trend, trendColor, showTrendIcon }: { label: string; value: string; trend: string; trendColor: string; showTrendIcon: boolean }) {
  return (
    <Box
      sx={{
        flex: 1, height: 117, bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '20px', py: '12px',
      }}
    >
      <Box className="flex flex-col" sx={{ gap: '13px' }}>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '10px', lineHeight: '16px', color: '#7F879E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </Typography>
        <Box className="flex flex-col" sx={{ gap: '12px' }}>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '28px', lineHeight: '36px', color: '#2E2C46' }}>
            {value}
          </Typography>
          <Box className="flex items-center gap-[8px]">
            {showTrendIcon && <Image src="/icons/officer/trend-up.png" alt="" width={16} height={16} />}
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '10px', lineHeight: '16px', color: trendColor }}>
              {trend}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Image src="/icons/officer/metric-value.png" alt="" width={24} height={24} />
    </Box>
  )
}
