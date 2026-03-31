'use client'

import { use, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Divider from '@mui/material/Divider'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts'
import { usePersonControllerFindPersons } from '@/lib/api/generated/person-controller/person-controller'
import { usePersonControllerFindAssociatedLoans } from '@/lib/api/generated/person-controller/person-controller'
import { useLoanControllerGetLoan, useLoanControllerFindAssociatedLoanEmis } from '@/lib/api/generated/loan-controller/loan-controller'
import type { Person } from '@/types/api/person'
import type { Loan } from '@/types/api/loan'
import type { LoanEmi } from '@/types/api/loanEmi'
import LoanStatusBadge from '@/components/officer/LoanStatusBadge'
import ApproveLoanDialog from '@/components/officer/ApproveLoanDialog'
import RejectLoanDialog from '@/components/officer/RejectLoanDialog'
import ApplicationApprovedDialog from '@/components/officer/ApplicationApprovedDialog'
import ApplicationRejectedDialog from '@/components/officer/ApplicationRejectedDialog'

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

const CREDIT_HISTORY = [
  { month: "Dec '24", score: 748 }, { month: "Jan '25", score: 755 },
  { month: "Feb '25", score: 762 }, { month: "Mar '25", score: 758 },
  { month: "Apr '25", score: 771 }, { month: "May '25", score: 780 },
  { month: "Jun '25", score: 785 }, { month: "Jul '25", score: 792 },
  { month: "Aug '25", score: 801 }, { month: "Sep '25", score: 810 },
  { month: "Oct '25", score: 825 }, { month: "Nov '25", score: 818 },
  { month: "Dec '25", score: 795 }, { month: "Jan '26", score: 768 },
  { month: "Feb '26", score: 742 }, { month: "Mar '26", score: 721 },
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

const labelSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#7F879E' }
const valueSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#2E2C46' }

const emiHeaderSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '11px', color: '#7F879E', borderBottom: '1px solid #E5E5EC', py: '10px' }
const emiCellSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', color: '#2E2C46', borderBottom: '1px solid #F5F5F5', py: '8px' }

const EMI_STATUS_COLORS: Record<string, string> = {
  PAID: '#16A41D',
  PENDING: '#FF6800',
  OVERDUE: '#BA1A1A',
}

/* ─── Page Component ─── */

export default function CustomerDetailPage({ params }: { params: Promise<{ email: string }> }) {
  const { email } = use(params)
  const decodedEmail = decodeURIComponent(email)
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const selectedLoanId = searchParams.get('loanId')

  // Dialog state
  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [approvedLoan, setApprovedLoan] = useState<Loan | null>(null)
  const [rejectedLoan, setRejectedLoan] = useState<Loan | null>(null)

  // ── STEP 1: Fetch person ──
  const { data: personPage, isLoading: personLoading } = usePersonControllerFindPersons(
    { q: `email='${decodedEmail}'`, page: 1, size: 1 },
  ) as { data: { content?: Person[] } | undefined; isLoading: boolean }
  const person = (personPage as { content?: Person[] })?.content?.[0]

  // ── STEP 2: Fetch specific loan ──
  const loanId = selectedLoanId ? Number(selectedLoanId) : 0
  const { data: loanData, isLoading: loanLoading } = useLoanControllerGetLoan(
    loanId,
    { query: { enabled: loanId > 0 } },
  )
  const activeLoan = (loanData as Loan | undefined) ?? null

  // ── STEP 3: Fetch all loans for person ──
  const { data: personLoansPage, isLoading: personLoansLoading } = usePersonControllerFindAssociatedLoans(
    decodedEmail,
    { page: 1, size: 20 },
  )
  const allLoans = ((personLoansPage as { content?: Loan[] })?.content ?? []) as Loan[]

  // If no loanId in URL but we have loans, use first one
  const displayLoan = activeLoan ?? allLoans[0] ?? null

  // ── STEP 4: Fetch EMI schedule for the active loan ──
  const displayLoanId = displayLoan?.id ?? 0
  const { data: emisPage, isLoading: emisLoading } = useLoanControllerFindAssociatedLoanEmis(
    displayLoanId,
    { page: 1, size: 100 },
    { query: { enabled: displayLoanId > 0 } },
  )
  const emis = ((emisPage as { content?: LoanEmi[] })?.content ?? []) as LoanEmi[]

  // ── Computed fields ──
  const totalInterest = (displayLoan?.totalAmount ?? 0) - (displayLoan?.principleAmount ?? 0)
  const latestScore = CREDIT_HISTORY[CREDIT_HISTORY.length - 1]?.score ?? 0

  // ── STEP 5: Button visibility ──
  const statusName = displayLoan?.loanStatus?.name
  const canAction = statusName === 'PENDING' || statusName === 'AWAITING'
  const isApproved = statusName === 'APPROVED'
  const isRejected = statusName === 'REJECTED'

  const isLoading = personLoading || (loanId > 0 && loanLoading)

  // ── STEP 3 continued: clicking a loan in the list ──
  const handleSelectLoan = (loan: Loan) => {
    router.replace(`/officer/customers/${encodeURIComponent(decodedEmail)}?loanId=${loan.id}`)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1304 }}>
      {/* Title row */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: { xs: '12px', sm: 0 }, mb: '24px' }}>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: { xs: '28px', md: '36px' }, lineHeight: { xs: '36px', md: '44px' }, color: '#2E2C46' }}>
          Customer Details
        </Typography>
        <Button variant="contained" sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '0.1px', bgcolor: '#474DDD', color: 'white', textTransform: 'none', borderRadius: '8px', height: 34, boxShadow: 'none', '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' } }}>
          Ask Lex Anything
        </Button>
      </Box>

      {/* Two-column layout */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: '5px', width: '100%' }}>
        {/* ─── LEFT PANEL ─── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: 840 }, gap: '5px' }}>

          {/* ── Profile + Personal Info (single card) ── */}
          <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
            {isLoading ? (
              <Box sx={{ p: '20px' }}>
                <Box className="flex items-center gap-[12px]" sx={{ mb: '20px' }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box><Skeleton variant="text" width={160} height={24} /><Skeleton variant="text" width={120} height={20} /></Box>
                </Box>
                <Skeleton variant="rounded" width="100%" height={120} sx={{ borderRadius: '8px' }} />
              </Box>
            ) : (
              <>
                {/* Profile header */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', px: '20px', py: '16px' }}>
                  <Box className="flex items-center gap-[12px]">
                    <Image src="/icons/officer/avatar-1.png" alt="" width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                    <Box>
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#2E2C46' }}>
                        {person?.firstName} {person?.lastName}
                      </Typography>
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '13px', color: '#474DDD' }}>
                        {displayLoan?.applicationId ?? decodedEmail}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-center gap-[12px]">
                    <Box className="flex items-center gap-[6px]" sx={{ border: '1px solid #E5E5EC', borderRadius: '1000px', px: '12px', py: '6px' }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#16A41D' }} />
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', color: '#16A41D' }}>Income $66K</Typography>
                    </Box>
                    <Box className="flex items-center gap-[6px]" sx={{ border: '1px solid #E5E5EC', borderRadius: '1000px', px: '12px', py: '6px' }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#FF6800' }} />
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', color: '#FF6800' }}>Credit score {latestScore}</Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Personal info fields */}
                <Box sx={{ mx: '20px', mb: '20px', bgcolor: '#F8F9FD', borderRadius: '8px', px: '20px', py: '20px' }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '16px', md: '32px' }, mb: '28px' }}>
                    <InfoField label="D.O.B" value={formatDate(person?.dob)} />
                    <InfoField label="Phone" value={person?.phoneNumber ?? '—'} />
                    <InfoField label="Email" value={person?.email ?? '—'} />
                    <InfoField label="Social Security No." value={formatSSN(person?.socialSecurityNumber)} />
                    <InfoField label="Job title" value="—" />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '16px', md: '32px' } }}>
                    <InfoField label="Employer" value="—" />
                    <InfoField label="Employment type" value="—" />
                    <InfoField label="Years with employer" value="—" />
                    <InfoField label="Address" value={person?.address ?? '—'} />
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {/* ── Financial Overview — 3 metric cards ── */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: '5px' }}>
            <FinancialMetric label="DEBT TO INCOME RATIO" value="34%" trend="Acceptable Risk" trendColor="#16A41D" showTrendIcon />
            <FinancialMetric label="PROBABILITY OF DEFAULT" value="10%" trend="2% since last credit update" trendColor="#16A41D" showTrendIcon />
            <FinancialMetric label="TOTAL EXPOSURE" value={displayLoan ? formatCurrency(displayLoan.totalAmount) : '—'} trend="Normal lending range" trendColor="#7F879E" showTrendIcon={false} />
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
                <XAxis dataKey="month" tick={{ fontFamily: '"DM Sans", sans-serif', fontSize: 10, fill: '#7F879E' }} axisLine={false} tickLine={false} interval="equidistantPreserveStart" />
                <YAxis domain={[0, 900]} ticks={[0, 300, 600, 900]} tick={{ fontFamily: '"DM Sans", sans-serif', fontSize: 11, fill: '#7F879E' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontFamily: '"DM Sans", sans-serif', fontSize: '12px', borderRadius: '12px', border: 'none', color: 'white', backgroundColor: '#2E2C46', padding: '14px 18px' }}
                  labelStyle={{ color: '#FFFFFF80', fontSize: '10px', marginBottom: '4px' }}
                  itemStyle={{ color: 'white', fontWeight: 700, fontSize: '22px' }}
                  formatter={(value) => [`${value}`, '']}
                />
                <Area type="linear" dataKey="score" stroke="#FF6800" strokeWidth={2.5} fill="url(#scoreGradient)" dot={false} activeDot={{ r: 5, fill: '#FF6800', stroke: 'white', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* ─── RIGHT PANEL ─── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', lg: 467 } }}>
          <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0', p: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>

            {/* Applications header */}
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', color: '#474DDD', mb: '18px' }}>
              Applications in progress ({allLoans.length})
            </Typography>

            {personLoansLoading ? (
              <Box className="flex flex-col gap-[12px]">
                <Skeleton variant="rounded" width="100%" height={42} />
                <Skeleton variant="rounded" width="100%" height={62} />
                <Skeleton variant="rounded" width="100%" height={300} />
              </Box>
            ) : displayLoan ? (
              <>
                {/* Active loan card */}
                <Box className="flex items-center gap-[12px]" sx={{ mb: '18px' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: '#F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src="/icons/officer/metric-pending.png" alt="" width={20} height={20} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box className="flex items-center gap-[6px]">
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: '#2E2C46' }}>
                        {displayLoan.loanType?.displayName ?? 'Personal Loan'}
                      </Typography>
                      <Typography sx={{ fontSize: '10px', color: '#7F879E' }}>▾</Typography>
                    </Box>
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#7F879E' }}>
                      {displayLoan.applicationId}
                    </Typography>
                  </Box>
                  <LoanStatusBadge status={displayLoan.loanStatus?.displayName ?? 'Pending'} />
                </Box>

                {/* Loan details row */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: { xs: '12px', md: 0 }, mb: '20px' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ...labelSx, mb: '2px' }}>Requested amount</Typography>
                    <Typography sx={{ ...valueSx, fontWeight: 700 }}>{formatCurrency(displayLoan.principleAmount)}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC', mx: '16px' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ...labelSx, mb: '2px' }}>Requested tenure</Typography>
                    <Typography sx={{ ...valueSx, fontWeight: 700 }}>{displayLoan.tenure} year{(displayLoan.tenure ?? 0) !== 1 ? 's' : ''}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC', mx: '16px' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ ...labelSx, mb: '2px' }}>Purpose</Typography>
                    <Typography sx={{ ...valueSx, fontWeight: 700 }}>{displayLoan.loanType?.displayName ?? '—'}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: '#F0F0F0', mb: '12px' }} />

                {/* Summary section */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ borderLeft: '3px solid #474DDD', pl: '12px', mb: '12px' }}>
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', color: '#2E2C46' }}>Summary</Typography>
                  </Box>
                  <Divider sx={{ borderColor: '#F0F0F0' }} />

                  {SUMMARY_ROWS.map((row, idx) => (
                    <Box key={row.label}>
                      <Box className="flex items-center justify-between" sx={{ py: '11px' }}>
                        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '13px', lineHeight: '16px', color: '#2E2C46' }}>
                          {row.label}
                        </Typography>
                        {row.badge ? (
                          <Box sx={{ bgcolor: row.color === '#BA1A1A' ? '#FDECEA' : '#E8F5E9', borderRadius: '4px', px: '8px', py: '4px' }}>
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

                {/* ── STEP 5: Action buttons / status chip ── */}
                {canAction && (
                  <Box className="flex items-center justify-end gap-[12px]" sx={{ pt: '16px', borderTop: '1px solid #F0F0F0', mt: '12px' }}>
                    <Image src="/icons/common/ai-assist.png" alt="AI" width={34} height={34} style={{ marginRight: 'auto' }} />
                    <Button onClick={() => setRejectOpen(true)} variant="outlined" sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: '#E32E34', borderColor: '#E32E34', textTransform: 'none', borderRadius: '8px', height: 40, width: 90, borderWidth: 1, '&:hover': { borderColor: '#E32E34', bgcolor: 'rgba(227,46,52,0.04)', borderWidth: 1 } }}>
                      Reject
                    </Button>
                    <Button onClick={() => setApproveOpen(true)} variant="contained" sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', bgcolor: '#474DDD', color: 'white', textTransform: 'none', borderRadius: '8px', height: 40, width: 105, boxShadow: 'none', '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' } }}>
                      Approve
                    </Button>
                  </Box>
                )}
                {isApproved && (
                  <Box sx={{ pt: '16px', borderTop: '1px solid #F0F0F0', mt: '12px', textAlign: 'center' }}>
                    <LoanStatusBadge status="Approved" />
                  </Box>
                )}
                {isRejected && (
                  <Box sx={{ pt: '16px', borderTop: '1px solid #F0F0F0', mt: '12px', textAlign: 'center' }}>
                    <LoanStatusBadge status="Rejected" />
                  </Box>
                )}
              </>
            ) : (
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '14px', color: '#7F879E', textAlign: 'center', py: '40px' }}>
                No loan applications found for this customer.
              </Typography>
            )}

            {/* ── Other loans list ── */}
            {allLoans.length > 1 && (
              <Box sx={{ mt: '20px', pt: '16px', borderTop: '1px solid #F0F0F0' }}>
                <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', color: '#7F879E', mb: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Other Applications
                </Typography>
                {allLoans
                  .filter((l) => l.id !== displayLoan?.id)
                  .map((loan) => (
                    <Box
                      key={loan.id}
                      className="flex items-center justify-between"
                      onClick={() => handleSelectLoan(loan)}
                      sx={{ py: '10px', cursor: 'pointer', borderRadius: '6px', px: '8px', '&:hover': { bgcolor: '#F8F9FD' } }}
                    >
                      <Box>
                        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '13px', color: '#2E2C46' }}>
                          {loan.applicationId}
                        </Typography>
                        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '11px', color: '#7F879E' }}>
                          {loan.loanType?.displayName ?? '—'} · {formatCurrency(loan.principleAmount)}
                        </Typography>
                      </Box>
                      <LoanStatusBadge status={loan.loanStatus?.displayName ?? 'Pending'} />
                    </Box>
                  ))}
              </Box>
            )}
          </Box>

          {/* ── STEP 4: EMI Schedule ── */}
          {displayLoanId > 0 && (
            <Box sx={{ bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0', p: '20px', mt: '5px' }}>
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '14px', color: '#2E2C46', mb: '12px' }}>
                EMI Schedule
              </Typography>
              {emisLoading ? (
                <Box className="flex flex-col gap-[8px]">
                  {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rounded" width="100%" height={32} />)}
                </Box>
              ) : emis.length === 0 ? (
                <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: '#7F879E', textAlign: 'center', py: '20px' }}>
                  No EMI schedule available
                </Typography>
              ) : (
                <TableContainer sx={{ maxHeight: 260 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={emiHeaderSx}>#</TableCell>
                        <TableCell sx={emiHeaderSx}>Due Date</TableCell>
                        <TableCell sx={emiHeaderSx}>Amount</TableCell>
                        <TableCell sx={emiHeaderSx}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {emis.slice(0, 12).map((emi) => (
                        <TableRow key={emi.id}>
                          <TableCell sx={emiCellSx}>{emi.emiNumber}</TableCell>
                          <TableCell sx={emiCellSx}>{formatDate(emi.dueDate)}</TableCell>
                          <TableCell sx={emiCellSx}>{formatCurrency(emi.emiAmount)}</TableCell>
                          <TableCell sx={{ ...emiCellSx, color: EMI_STATUS_COLORS[emi.status ?? ''] ?? '#7F879E', fontWeight: 600 }}>
                            {emi.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* ─── Dialogs ─── */}
      {displayLoan && (
        <>
          <ApproveLoanDialog
            open={approveOpen}
            loan={displayLoan}
            onClose={() => setApproveOpen(false)}
            onApproveSuccess={(updatedLoan) => {
              setApproveOpen(false)
              setApprovedLoan(updatedLoan)
              queryClient.invalidateQueries({ queryKey: [`/loancorp/Loan/${displayLoan.id}`] })
              queryClient.invalidateQueries({ queryKey: [`/loancorp/Person/${decodedEmail}/loans`] })
            }}
          />
          <RejectLoanDialog
            open={rejectOpen}
            loan={displayLoan}
            onClose={() => setRejectOpen(false)}
            onRejectSuccess={(updatedLoan) => {
              setRejectOpen(false)
              setRejectedLoan(updatedLoan)
              queryClient.invalidateQueries({ queryKey: [`/loancorp/Loan/${displayLoan.id}`] })
              queryClient.invalidateQueries({ queryKey: [`/loancorp/Person/${decodedEmail}/loans`] })
            }}
          />
          <ApplicationApprovedDialog
            open={!!approvedLoan}
            loan={approvedLoan}
            onClose={() => setApprovedLoan(null)}
          />
          <ApplicationRejectedDialog
            open={!!rejectedLoan}
            loan={rejectedLoan}
            onClose={() => setRejectedLoan(null)}
          />
        </>
      )}
    </Box>
  )
}

/* ─── Sub-components ─── */

function InfoField({ label, value }: { label: string; value: string; width?: number }) {
  return (
    <Box sx={{ minWidth: { xs: 'calc(50% - 16px)', md: 'auto' }, flex: { xs: '1 1 auto', md: 'none' } }}>
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
    <Box sx={{ height: 117, bgcolor: 'white', borderRadius: '8px', border: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: '20px', py: '12px' }}>
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
