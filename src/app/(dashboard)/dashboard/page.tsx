'use client'

import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Link from 'next/link'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useManageLoanControllerGetLoanSummary } from '@/lib/api/generated/manage-loan-controller/manage-loan-controller'
import { useLoanControllerFindLoans } from '@/lib/api/generated/loan-controller/loan-controller'
import { useAuthStore } from '@/stores/auth.store'
import type { LoanSummaryDTO } from '@/types/api/loanSummaryDTO'
import type { Loan } from '@/types/api/loan'

/* ─── Helpers ─── */

function formatCurrency(n: number | undefined, compact = false): string {
  if (n == null) return '—'
  if (compact) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`.replace('.0k', 'k')
    return `$${n.toLocaleString()}`
  }
  return `$${n.toLocaleString()}`
}

function formatDate(d: string | undefined): string {
  if (!d) return '—'
  const date = new Date(d)
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }).replace(' ', " '")
}

function getAccountHealth(paid: number, total: number): string {
  if (total === 0) return '—'
  const ratio = paid / total
  if (ratio >= 0.95) return 'Excellent'
  if (ratio >= 0.8) return 'Good'
  if (ratio >= 0.6) return 'Fair'
  return 'Needs Attention'
}

/* ─── Milestones (static — computed from paid count thresholds) ─── */

const MILESTONES = [
  { title: 'On-time streak', description: '48 on-time\npayments', reward: 'Late fee waiver unlocked!', date: 'Mar 2024' },
  { title: 'Consistent payer', description: '60 consecutive on-time payments', reward: '0.10% interest\nrate reduction', date: 'Mar 2025' },
  { title: 'Halfway There', description: '50% of Auto Loan paid off', reward: '$100 principal\nbonus payment', date: 'Nov 2025' },
  { title: 'Payment Veteran', description: '72 on-time payments', reward: 'Priority loan\nservicing', date: 'Mar 2026' },
  { title: 'Auto-pay enabled', description: 'Auto-payments active for Auto Loan', reward: 'Keep auto-pay enabled for 6 months to unlock reward', date: 'Mar 2026', special: true },
]

/* ─── Component ─── */

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  // Fetch loan summary
  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useManageLoanControllerGetLoanSummary(
    { userEmail: user?.email ?? '' },
    { query: { enabled: !!user?.email } }
  ) as {
    data: LoanSummaryDTO | undefined
    isLoading: boolean
    isError: boolean
    refetch: () => void
  }

  // Fetch loans for this user only
  const {
    data: loansPage,
    isLoading: loansLoading,
    isError: loansError,
    refetch: refetchLoans,
  } = useLoanControllerFindLoans(
    { q: `personEmail='${user?.email}'`, page: 1, size: 10, sort: 'startDate desc' },
    { query: { enabled: !!user?.email } }
  ) as {
    data: { content?: Loan[] } | undefined
    isLoading: boolean
    isError: boolean
    refetch: () => void
  }

  const loans: Loan[] = (loansPage as { content?: Loan[] })?.content ?? []

  // Split loans: APPROVED = active, PENDING = in-progress, REJECTED = excluded
  const activeLoans = loans.filter(
    (l) => l.loanStatus?.name === 'APPROVED'
  )
  const inProgressLoans = loans.filter(
    (l) => l.loanStatus?.name === 'PENDING'
  )

  // Computed values
  const totalInstallments = summary?.totalInstallments ?? 0
  const paidInstallments = summary?.totalPaidInstallments ?? 0
  const remainingInstallments = totalInstallments - paidInstallments
  const paidPercentage = totalInstallments > 0 ? (paidInstallments / totalInstallments) * 100 : 0
  const accountHealth = getAccountHealth(paidInstallments, totalInstallments)

  // Build stat cards from API data
  const statCards = [
    {
      label: 'ACCOUNT HEALTH',
      value: summaryLoading ? null : accountHealth,
      detail: summaryLoading ? null : `${paidInstallments}/${totalInstallments}`,
      detailSuffix: 'payments on time',
      icon: '/icons/stat/account-health.png',
    },
    {
      label: 'OUTSTANDING BALANCE',
      value: summaryLoading ? null : formatCurrency(summary?.outstandingAmount, true),
      detail: summaryLoading ? null : `${paidInstallments}/${totalInstallments}`,
      detailSuffix: 'payments on time',
      icon: '/icons/stat/outstanding-balance.png',
    },
    {
      label: 'TOTAL MONTHLY EMI AMOUNT',
      value: summaryLoading ? null : formatCurrency(summary?.installmentAmount, true),
      detail: summaryLoading ? null : 'All loans',
      icon: '/icons/stat/emi-milestone.png',
    },
    {
      label: 'NEXT MILESTONE',
      value: summaryLoading ? null : `${Math.round((summary?.percentagePayOff ?? 0) * 100)}% payoff`,
      detail: summaryLoading
        ? null
        : `on your ${summary?.upcomingInstallmentLoanType ?? 'loan'} | ${formatDate(summary?.upcomingInstallmentDate)}`,
      icon: '/icons/stat/emi-milestone.png',
    },
  ]

  return (
    <>
      {/* Title row */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: { xs: '12px', sm: 0 }, width: '100%' }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '36px' },
            lineHeight: { xs: '36px', md: '44px' },
            color: '#2E2C46',
            textTransform: 'capitalize',
          }}
        >
          Dashboard
        </Typography>
        <Box className="flex items-center gap-[8px]" sx={{ flexShrink: 0 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#474DDD',
              borderColor: '#474DDD',
              borderWidth: 1,
              textTransform: 'none',
              borderRadius: '8px',
              height: 34,
              minWidth: 85,
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              px: '24px',
            }}
          >
            Ask Lex
          </Button>
          <Button
            component={Link}
            href="/apply"
            variant="contained"
            size="small"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              bgcolor: '#474DDD',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              height: 34,
              minWidth: 133,
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              px: '24px',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
            }}
          >
            Apply for a loan
          </Button>
        </Box>
      </Box>

      {/* Stats + cards container */}
      <Box className="flex flex-col gap-[10px] items-center" sx={{ width: '100%' }}>
        {/* Stat cards row */}
        {summaryError ? (
          <Alert
            severity="error"
            action={<Button onClick={() => refetchSummary()} size="small" sx={{ textTransform: 'none' }}>Retry</Button>}
            sx={{ width: '100%', borderRadius: '12px' }}
          >
            Failed to load account summary.
          </Alert>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: '10px', width: '100%' }}>
            {statCards.map((card) => (
              <Card
                key={card.label}
                elevation={0}
                sx={{
                  height: 117,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: '20px',
                  bgcolor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
                }}
              >
                <Box className="flex flex-col gap-[28px]" sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#7F879E',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.label}
                  </Typography>
                  <Box className="flex flex-col gap-[6px]">
                    {card.value === null ? (
                      <Skeleton variant="text" width={80} height={24} />
                    ) : (
                      <Typography
                        sx={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 700,
                          fontSize: '18px',
                          lineHeight: '24px',
                          letterSpacing: '0.15px',
                          color: '#2E2C46',
                        }}
                      >
                        {card.value}
                      </Typography>
                    )}
                    <Box className="flex items-center gap-[2px]">
                      {card.detail === null ? (
                        <Skeleton variant="text" width={120} height={16} />
                      ) : (
                        <>
                          <Typography
                            sx={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontWeight: 600,
                              fontSize: '12px',
                              lineHeight: '16px',
                              color: '#2E2C46',
                            }}
                          >
                            {card.detail}
                          </Typography>
                          {card.detailSuffix && (
                            <Typography
                              sx={{
                                fontFamily: '"DM Sans", sans-serif',
                                fontWeight: 400,
                                fontSize: '12px',
                                lineHeight: '18px',
                                color: '#7F879E',
                              }}
                            >
                              {card.detailSuffix}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Image src={card.icon} alt={card.label} width={24} height={24} style={{ flexShrink: 0 }} />
              </Card>
            ))}
          </Box>
        )}

        {/* Two-column loans area */}
        <Box className="flex flex-col gap-[10px] items-start" sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '10px', alignItems: 'stretch', width: '100%' }}>
            <ActiveLoansCard loans={activeLoans} loading={loansLoading} error={loansError} onRetry={refetchLoans} />
            <LoanInProgressCard loans={inProgressLoans} loading={loansLoading} error={loansError} onRetry={refetchLoans} />
          </Box>
          <MilestonesCard />
        </Box>
      </Box>
    </>
  )
}

/* ─── Active Loans Card ─── */

function ActiveLoansCard({ loans, loading, error, onRetry }: { loans: Loan[]; loading: boolean; error: boolean; onRetry: () => void }) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minHeight: { xs: 300, md: 412 },
        height: { xs: 'auto', md: 412 },
        bgcolor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        px: '20px',
        pb: '20px',
        overflow: 'hidden',
      }}
    >
      <Box
        className="flex items-center justify-between"
        sx={{ height: 49, pt: '20px', pb: '16px', borderRadius: '8px 8px 0 0', flexShrink: 0 }}
      >
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#2E2C46' }}>
          Active loans ({loading ? '…' : loans.length})
        </Typography>
        <Button variant="text" sx={{ fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontSize: '14px', color: '#474DDD', textTransform: 'none', borderRadius: '8px', height: 34, width: 102 }}>
          View Details
        </Button>
      </Box>

      <Box sx={{ bgcolor: '#F8F9FD', borderRadius: '8px', p: '20px', flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {error ? (
          <Alert severity="error" action={<Button onClick={onRetry} size="small" sx={{ textTransform: 'none' }}>Retry</Button>} sx={{ borderRadius: '8px' }}>
            Failed to load loans.
          </Alert>
        ) : loading ? (
          <>
            <Skeleton variant="rounded" height={120} />
            <Skeleton variant="rounded" height={120} />
          </>
        ) : loans.length === 0 ? (
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#7F879E', textAlign: 'center', mt: 4 }}>
            No active loans
          </Typography>
        ) : (
          loans.map((loan) => <LoanEntry key={loan.id} loan={loan} />)
        )}
      </Box>
    </Card>
  )
}

function LoanEntry({ loan }: { loan: Loan }) {
  const totalAmount = loan.totalAmount ?? loan.principleAmount ?? 0
  const amountPaid = totalAmount - (loan.balance ?? 0)
  const amountRemaining = loan.balance ?? 0
  const progress = totalAmount > 0 ? (amountPaid / totalAmount) * 100 : 0
  const loanTypeName = loan.loanType?.displayName ?? loan.loanType?.name ?? 'Loan'

  return (
    <Box className="flex flex-col gap-[24px]">
      <Box className="flex items-center gap-[16px]">
        <Box className="flex items-center gap-[8px]">
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', color: '#2E2C46', textTransform: 'uppercase' }}>
            {loanTypeName}
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 6, color: '#2E2C46' }} />
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#2E2C46' }}>
            {formatCurrency(totalAmount)}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: loan.autoPayEnabled ? '#6750A4' : '#7F879E', borderRadius: '120px', height: 24, px: '8px', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '8px', lineHeight: '16px', letterSpacing: '0.5px', color: 'white' }}>
            {loan.autoPayEnabled ? 'AUTO-PAY ENABLED' : 'AUTO-PAY DISABLED'}
          </Typography>
        </Box>
      </Box>

      <Box className="flex flex-col gap-[8px]">
        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-[8px]">
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.5px', color: '#2E2C46' }}>
              {formatCurrency(amountPaid)}
            </Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: '20px', color: '#2E2C46' }}>paid</Typography>
          </Box>
          <Box className="flex items-center gap-[4px]">
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#2E2C46', textAlign: 'right' }}>
              {formatCurrency(amountRemaining)}
            </Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: '20px', color: '#2E2C46' }}>remaining</Typography>
          </Box>
        </Box>
        <Box className="flex flex-col gap-[4px] items-end">
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: '100%', height: 12, borderRadius: '8px', bgcolor: 'white', '& .MuiLinearProgress-bar': { borderRadius: '8px', bgcolor: loan.autoPayEnabled ? '#474DDD' : '#16A41D' } }}
          />
          <Box className="flex items-center gap-[4px]">
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#2E2C46', textAlign: 'right' }}>Loan ending on</Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#7F879E' }}>
              {formatDate(loan.endDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/* ─── Loan In Progress Card ─── */

function LoanInProgressCard({ loans, loading, error, onRetry }: { loans: Loan[]; loading: boolean; error: boolean; onRetry: () => void }) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minHeight: { xs: 300, md: 412 },
        height: { xs: 'auto', md: 412 },
        bgcolor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        px: '20px',
        overflow: 'hidden',
      }}
    >
      <Box
        className="flex items-center justify-between"
        sx={{ height: 49, pt: '20px', pb: '16px', borderRadius: '8px 8px 0 0', flexShrink: 0 }}
      >
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#2E2C46' }}>
          Loan in progress ({loading ? '…' : loans.length})
        </Typography>
        <Button variant="text" sx={{ fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontSize: '14px', color: '#474DDD', textTransform: 'none', borderRadius: '8px', height: 34, width: 102 }}>
          View Details
        </Button>
      </Box>

      <Box className="flex flex-col gap-[10px]" sx={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
        {error ? (
          <Alert severity="error" action={<Button onClick={onRetry} size="small" sx={{ textTransform: 'none' }}>Retry</Button>} sx={{ borderRadius: '8px' }}>
            Failed to load applications.
          </Alert>
        ) : loading ? (
          <>
            <Skeleton variant="rounded" height={140} />
            <Skeleton variant="rounded" height={140} />
          </>
        ) : loans.length === 0 ? (
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#7F879E', textAlign: 'center', mt: 4 }}>
            No loans in progress
          </Typography>
        ) : (
          loans.map((loan) => <ApplicationEntry key={loan.id} loan={loan} />)
        )}
      </Box>
    </Card>
  )
}

function ApplicationEntry({ loan }: { loan: Loan }) {
  return (
    <Box sx={{ bgcolor: '#F8F9FD', borderRadius: '8px', p: '20px', display: 'flex', flexDirection: 'column' }}>
      <Box className="flex flex-col gap-[44px]">
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#7F879E' }}>
          Application ID {loan.applicationId ?? `LC${loan.id}`}
        </Typography>
        <Box className="flex flex-col gap-[16px]">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <FieldWithIcon iconSrc="/icons/loan/loan-type.png" label="Loan type" value={loan.loanType?.displayName ?? '—'} />
            <FieldWithIcon iconSrc="/icons/loan/loan-amount.png" label="Requested Amount" value={formatCurrency(loan.principleAmount)} />
            <FieldWithIcon iconSrc="/icons/loan/current-stage.png" label="Current stage" value={loan.loanStatus?.displayName ?? '—'} />
          </Box>
          <Box className="flex items-center gap-[8px]" sx={{ px: '8px', height: 28 }}>
            <FiberManualRecordIcon sx={{ fontSize: 6, color: '#16A41D' }} />
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#2E2C46' }}>
              Est. time left in this stage approx. 1 day
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function FieldWithIcon({ iconSrc, label, value }: { iconSrc: string; label: string; value: string }) {
  return (
    <Box className="flex items-center gap-[12px]" sx={{ flex: 1 }}>
      <Image src={iconSrc} alt={label} width={36} height={36} style={{ flexShrink: 0, borderRadius: '50%' }} />
      <Box className="flex flex-col gap-[4px]">
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', color: '#7F879E' }}>{label}</Typography>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#2E2C46' }}>{value}</Typography>
      </Box>
    </Box>
  )
}

/* ─── Milestones Card (static — no API for milestones) ─── */

function MilestonesCard() {
  return (
    <Card
      elevation={0}
      sx={{ width: '100%', height: { xs: 'auto', md: 370 }, bgcolor: 'white', borderRadius: '12px', boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '40px', pb: { xs: '20px', md: 0 } }}
    >
      <Box className="flex items-center justify-between" sx={{ height: 55, pt: '20px', pb: '16px', px: '20px', flexShrink: 0 }}>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#2E2C46' }}>
          Milestones with Loancorp
        </Typography>
        <Button variant="text" sx={{ fontFamily: '"Roboto", sans-serif', fontWeight: 500, fontSize: '14px', color: '#474DDD', textTransform: 'none', borderRadius: '8px', height: 34, width: 146 }}>
          View all milestones
        </Button>
      </Box>
      <Box className="flex flex-col gap-[16px]" sx={{ px: '24px', flex: 1, minHeight: 0 }}>
        <Box sx={{ width: '100%', height: 70, position: 'relative', flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
          <Image src="/icons/milestone/timeline-bar.png" alt="Milestone timeline" fill style={{ objectFit: 'contain', objectPosition: 'center' }} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' }, alignItems: 'flex-start', gap: { xs: '16px', md: 0 }, flex: 1, minHeight: 0 }}>
          {MILESTONES.map((m) => (
            <Box key={m.title} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: { xs: '1 1 calc(50% - 8px)', md: 1 }, minWidth: { xs: 'calc(50% - 8px)', md: 0 }, height: { xs: 'auto', md: '100%' } }}>
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#2E2C46', textAlign: 'center' }}>{m.title}</Typography>
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', color: '#7F879E', textAlign: 'center', whiteSpace: 'pre-line' }}>{m.description}</Typography>
              <Box className="flex flex-col items-center gap-[3px]" sx={{ mt: '9px' }}>
                {m.special ? (
                  <Box sx={{ bgcolor: '#D8F3E1', borderRadius: '8px', height: 55, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', px: '8px' }}>
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '8px', lineHeight: '16px', letterSpacing: '0.5px', color: '#2E2C46', textAlign: 'center', width: 100 }}>{m.reward}</Typography>
                  </Box>
                ) : (
                  <>
                    <Image src="/icons/milestone/reward.png" alt="Reward" width={20} height={20} />
                    <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', color: '#7F879E', textAlign: 'center', whiteSpace: 'pre-line' }}>{m.reward}</Typography>
                  </>
                )}
              </Box>
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', color: '#2E2C46', textAlign: 'center', mt: 'auto', pb: '20px' }}>{m.date}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  )
}
