'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import AutoPayBadge from './AutoPayBadge'

export interface LoanProgressCardProps {
  loanType: string
  totalAmount: number
  amountPaid: number
  amountRemaining: number
  endDate: string
  autopayEnabled: boolean
}

export default function LoanProgressCard({
  loanType,
  totalAmount,
  amountPaid,
  amountRemaining,
  endDate,
  autopayEnabled,
}: LoanProgressCardProps) {
  const progress = totalAmount > 0 ? (amountPaid / totalAmount) * 100 : 0

  const formatCurrency = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 3).replace(/\.?0+$/, '')}k` : `$${n.toLocaleString()}`

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {/* Header row: loan type + badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '16px',
              color: 'text.primary',
              textTransform: 'uppercase',
            }}
          >
            {loanType}
          </Typography>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'text.primary' }} />
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.1px',
              color: 'text.primary',
            }}
          >
            ${totalAmount.toLocaleString()}
          </Typography>
        </Box>
        <AutoPayBadge enabled={autopayEnabled} />
      </Box>

      {/* Amounts + progress */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Paid vs remaining */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '32px',
                letterSpacing: '-0.5px',
                color: 'text.primary',
              }}
            >
              ${amountPaid.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'text.primary',
              }}
            >
              paid
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: 'text.primary',
                textAlign: 'right',
              }}
            >
              ${amountRemaining.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'text.primary',
              }}
            >
              remaining
            </Typography>
          </Box>
        </Box>

        {/* Progress bar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: '100%',
              height: 12,
              borderRadius: '8px',
              bgcolor: 'background.paper',
              '& .MuiLinearProgress-bar': {
                borderRadius: '8px',
                bgcolor: autopayEnabled ? '#6750A4' : '#16A41D',
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '16px',
                color: 'text.primary',
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
                color: 'text.secondary',
              }}
            >
              {endDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
