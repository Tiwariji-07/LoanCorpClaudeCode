'use client'

import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'
import Link from 'next/link'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

/* ─── Mock Data ─── */

const STAT_CARDS = [
  {
    label: 'ACCOUNT HEALTH',
    value: 'Excellent',
    detail: '120/120',
    detailSuffix: 'payments on time',
    icon: '/icons/stat/account-health.png',
  },
  {
    label: 'OUTSTANDING BALANCE',
    value: '$411k',
    detail: '120/120',
    detailSuffix: 'payments on time',
    icon: '/icons/stat/outstanding-balance.png',
  },
  {
    label: 'TOTAL MONTHLY EMI AMOUNT',
    value: '$12.5k',
    detail: 'All loans',
    icon: '/icons/stat/emi-milestone.png',
  },
  {
    label: 'NEXT MILESTONE',
    value: '25% payoff',
    detail: 'on you home loan | 4jun',
    icon: '/icons/stat/emi-milestone.png',
  },
]

const ACTIVE_LOANS = [
  {
    type: 'HOME LOAN',
    totalAmount: 493_600,
    amountPaid: 98_720,
    amountRemaining: 394_880,
    endDate: "Oct '45",
    autopayEnabled: true,
  },
  {
    type: 'AUTO LOAN',
    totalAmount: 44_306,
    amountPaid: 27_913,
    amountRemaining: 16_393,
    endDate: "Oct '26",
    autopayEnabled: false,
  },
]

const IN_PROGRESS_APPS = [
  {
    applicationId: 'LCPL20260113',
    loanType: 'Personal Loan',
    requestedAmount: '$35,000',
    currentStage: 'Underwriting',
    eta: 'Est. time left in this stage approx. 1 day',
  },
  {
    applicationId: 'LCPL20260113',
    loanType: 'Personal Loan',
    requestedAmount: '$35,000',
    currentStage: 'Underwriting',
    eta: 'Est. time left in this stage approx. 1 day',
  },
  {
    applicationId: 'LCPL20260113',
    loanType: 'Personal Loan',
    requestedAmount: '$35,000',
    currentStage: 'Underwriting',
    eta: 'Est. time left in this stage approx. 1 day',
  },
]

const MILESTONES = [
  {
    title: 'On-time streak',
    description: '48 on-time\npayments',
    reward: 'Late fee waiver unlocked!',
    date: 'Mar 2024',
  },
  {
    title: 'Consistent payer',
    description: '60 consecutive on-time payments',
    reward: '0.10% interest\nrate reduction',
    date: 'Mar 2025',
  },
  {
    title: 'Halfway There',
    description: '50% of Auto Loan paid off',
    reward: '$100 principal\nbonus payment',
    date: 'Nov 2025',
  },
  {
    title: 'Payment Veteran',
    description: '72 on-time payments',
    reward: 'Priority loan\nservicing',
    date: 'Mar 2026',
  },
  {
    title: 'Auto-pay enabled',
    description: 'Auto-payments active for Auto Loan',
    reward: 'Keep auto-pay enabled for 6 months to unlock reward',
    date: 'Mar 2026',
    special: true,
  },
]

/* ─── Component ─── */

export default function DashboardPage() {
  return (
    <>
      {/* Title row — Figma: space-between, full width */}
      <Box className="flex items-center justify-between" sx={{ width: '100%' }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '44px',
            color: '#2E2C46',
            textTransform: 'capitalize',
          }}
        >
          Dashboard
        </Typography>
        <Box className="flex items-center gap-[8px]">
          <Button
            variant="outlined"
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
              width: 85,
              boxShadow: 'none',
            }}
          >
            Ask Lex
          </Button>
          <Button
            component={Link}
            href="/apply"
            variant="contained"
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
              width: 133,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
            }}
          >
            Apply for a loan
          </Button>
        </Box>
      </Box>

      {/* Stats + cards container — Figma: 10px gap vertical */}
      <Box className="flex flex-col gap-[10px] items-center" sx={{ width: '100%' }}>
        {/* Stat cards row — Figma: 4 cards, 10px gap, each flex:1, 117px tall */}
        <Box className="flex gap-[10px] items-center" sx={{ width: '100%' }}>
          {STAT_CARDS.map((card) => (
            <Card
              key={card.label}
              elevation={0}
              sx={{
                flex: 1,
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
                  <Box className="flex items-center gap-[2px]">
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
                  </Box>
                </Box>
              </Box>
              <Image src={card.icon} alt={card.label} width={24} height={24} style={{ flexShrink: 0 }} />
            </Card>
          ))}
        </Box>

        {/* Two-column loans area — Figma: 10px gap, equal width, 412px tall */}
        <Box className="flex flex-col gap-[10px] items-start" sx={{ width: '100%' }}>
          <Box className="flex gap-[10px] items-center justify-center" sx={{ width: '100%' }}>
            {/* Active Loans */}
            <ActiveLoansCard />
            {/* Loan In Progress */}
            <LoanInProgressCard />
          </Box>

          {/* Milestones — full width */}
          <MilestonesCard />
        </Box>
      </Box>
    </>
  )
}

/* ─── Active Loans Card ─── */

function ActiveLoansCard() {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        height: 412,
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
      {/* Header */}
      <Box
        className="flex items-center justify-between"
        sx={{ height: 49, pt: '20px', pb: '16px', borderRadius: '8px 8px 0 0', flexShrink: 0 }}
      >
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
          Active loans (2)
        </Typography>
        <Button
          variant="text"
          sx={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#474DDD',
            textTransform: 'none',
            borderRadius: '8px',
            height: 34,
            width: 102,
          }}
        >
          View Details
        </Button>
      </Box>

      {/* Body — scrollable when list grows */}
      <Box
        sx={{
          bgcolor: '#F8F9FD',
          borderRadius: '8px',
          p: '20px',
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {ACTIVE_LOANS.map((loan, i) => (
          <LoanEntry key={i} loan={loan} />
        ))}
      </Box>
    </Card>
  )
}

function LoanEntry({
  loan,
}: {
  loan: (typeof ACTIVE_LOANS)[number]
}) {
  const progress = (loan.amountPaid / loan.totalAmount) * 100

  return (
    <Box className="flex flex-col gap-[24px]">
      {/* Loan type + badge */}
      <Box className="flex items-center gap-[16px]">
        <Box className="flex items-center gap-[8px]">
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#2E2C46',
              textTransform: 'uppercase',
            }}
          >
            {loan.type}
          </Typography>
          <FiberManualRecordIcon sx={{ fontSize: 6, color: '#2E2C46' }} />
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.1px',
              color: '#2E2C46',
            }}
          >
            ${loan.totalAmount.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: loan.autopayEnabled ? '#6750A4' : '#7F879E',
            borderRadius: '120px',
            height: 24,
            px: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: '8px',
              lineHeight: '16px',
              letterSpacing: '0.5px',
              color: 'white',
            }}
          >
            {loan.autopayEnabled ? 'AUTO-PAY ENABLED' : 'AUTO-PAY DISABLED'}
          </Typography>
        </Box>
      </Box>

      {/* Amounts + progress */}
      <Box className="flex flex-col gap-[8px]">
        {/* Paid vs remaining row */}
        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-[8px]">
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '32px',
                letterSpacing: '-0.5px',
                color: '#2E2C46',
              }}
            >
              ${loan.amountPaid.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#2E2C46',
              }}
            >
              paid
            </Typography>
          </Box>
          <Box className="flex items-center gap-[4px]">
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: '#2E2C46',
                textAlign: 'right',
              }}
            >
              ${loan.amountRemaining.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#2E2C46',
              }}
            >
              remaining
            </Typography>
          </Box>
        </Box>

        {/* Progress bar + end date */}
        <Box className="flex flex-col gap-[4px] items-end">
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: '100%',
              height: 12,
              borderRadius: '8px',
              bgcolor: 'white',
              '& .MuiLinearProgress-bar': {
                borderRadius: '8px',
                bgcolor: loan.autopayEnabled ? '#474DDD' : '#16A41D',
              },
            }}
          />
          <Box className="flex items-center gap-[4px]">
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#2E2C46',
                textAlign: 'right',
              }}
            >
              Loan ending on
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                color: '#7F879E',
              }}
            >
              {loan.endDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/* ─── Loan In Progress Card ─── */

function LoanInProgressCard() {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        height: 412,
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
      {/* Header */}
      <Box
        className="flex items-center justify-between"
        sx={{ height: 49, pt: '20px', pb: '16px', borderRadius: '8px 8px 0 0', flexShrink: 0 }}
      >
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
          Loan in progress (3)
        </Typography>
        <Button
          variant="text"
          sx={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#474DDD',
            textTransform: 'none',
            borderRadius: '8px',
            height: 34,
            width: 102,
          }}
        >
          View Details
        </Button>
      </Box>

      {/* Scrollable body — Figma: h-[353px], scrolls when more than 2 entries */}
      <Box className="flex flex-col gap-[10px]" sx={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
        {IN_PROGRESS_APPS.map((app, i) => (
          <ApplicationEntry key={i} app={app} />
        ))}
      </Box>
    </Card>
  )
}

function ApplicationEntry({
  app,
}: {
  app: (typeof IN_PROGRESS_APPS)[number]
}) {
  return (
    <Box
      sx={{
        bgcolor: '#F8F9FD',
        borderRadius: '8px',
        p: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box className="flex flex-col gap-[44px]">
        {/* Application ID */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            color: '#7F879E',
          }}
        >
          Application ID {app.applicationId}
        </Typography>

        <Box className="flex flex-col gap-[16px]">
          {/* 3-column fields */}
          <Box className="flex items-center justify-between">
            <FieldWithIcon
              iconSrc="/icons/loan/loan-type.png"
              label="Loan type"
              value={app.loanType}
            />
            <FieldWithIcon
              iconSrc="/icons/loan/loan-amount.png"
              label="Requested Amount"
              value={app.requestedAmount}
            />
            <FieldWithIcon
              iconSrc="/icons/loan/current-stage.png"
              label="Current stage"
              value={app.currentStage}
            />
          </Box>

          {/* Progress note */}
          <Box className="flex items-center gap-[8px]" sx={{ px: '8px', height: 28 }}>
            <FiberManualRecordIcon sx={{ fontSize: 6, color: '#16A41D' }} />
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                color: '#2E2C46',
              }}
            >
              {app.eta}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function FieldWithIcon({
  iconSrc,
  label,
  value,
}: {
  iconSrc: string
  label: string
  value: string
}) {
  return (
    <Box className="flex items-center gap-[12px]" sx={{ flex: 1 }}>
      <Image
        src={iconSrc}
        alt={label}
        width={36}
        height={36}
        style={{ flexShrink: 0, borderRadius: '50%' }}
      />
      <Box className="flex flex-col gap-[4px]">
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '16px',
            color: '#7F879E',
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            color: '#2E2C46',
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}

/* ─── Milestones Card ─── */

function MilestonesCard() {
  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        height: 370,
        bgcolor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
      }}
    >
      {/* Header */}
      <Box
        className="flex items-center justify-between"
        sx={{ height: 55, pt: '20px', pb: '16px', px: '20px', flexShrink: 0 }}
      >
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
          Milestones with Loancorp
        </Typography>
        <Button
          variant="text"
          sx={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            color: '#474DDD',
            textTransform: 'none',
            borderRadius: '8px',
            height: 34,
            width: 146,
          }}
        >
          View all milestones
        </Button>
      </Box>

      {/* Timeline + milestones — Figma: 16px gap between timeline and labels, 24px side padding */}
      <Box className="flex flex-col gap-[16px]" sx={{ px: '24px', flex: 1, minHeight: 0 }}>
        {/* Horizontal timeline bar — Figma asset with embedded medal nodes */}
        <Box
          sx={{
            width: '100%',
            height: 70,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <Image
            src="/icons/milestone/timeline-bar.png"
            alt="Milestone timeline"
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
          />
        </Box>

        {/* Milestone items — Figma: flex row, each flex:1, evenly distributed under the medals */}
        <Box className="flex items-start" sx={{ flex: 1, minHeight: 0 }}>
          {MILESTONES.map((m) => (
            <Box
              key={m.title}
              className="flex flex-col items-center gap-[4px]"
              sx={{ flex: 1, height: '100%' }}
            >
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.1px',
                  color: '#2E2C46',
                  textAlign: 'center',
                }}
              >
                {m.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#7F879E',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}
              >
                {m.description}
              </Typography>

              {/* Reward — Figma: 9px gap from description, 17px gap to date, 3px between icon and text */}
              <Box className="flex flex-col items-center gap-[3px]" sx={{ mt: '9px' }}>
                {m.special ? (
                  <Box
                    sx={{
                      bgcolor: '#D8F3E1',
                      borderRadius: '8px',
                      height: 55,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: '8px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 700,
                        fontSize: '8px',
                        lineHeight: '16px',
                        letterSpacing: '0.5px',
                        color: '#2E2C46',
                        textAlign: 'center',
                        width: 100,
                      }}
                    >
                      {m.reward}
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Image src="/icons/milestone/reward.png" alt="Reward" width={20} height={20} />
                    <Typography
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#7F879E',
                        textAlign: 'center',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {m.reward}
                    </Typography>
                  </>
                )}
              </Box>

              {/* Date */}
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#2E2C46',
                  textAlign: 'center',
                  mt: 'auto',
                  pb: '20px',
                }}
              >
                {m.date}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  )
}
