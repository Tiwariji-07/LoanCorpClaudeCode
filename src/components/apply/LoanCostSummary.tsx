'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

interface CostField {
  label: string
  value: string
}

export interface LoanCostSummaryProps {
  fields: CostField[]
  principalAmount: number
  interestAmount: number
  feesAmount: number
}

export default function LoanCostSummary({
  fields,
  principalAmount,
  interestAmount,
  feesAmount,
}: LoanCostSummaryProps) {
  const total = principalAmount + interestAmount + feesAmount
  const principalPct = total > 0 ? (principalAmount / total) * 100 : 0
  const interestPct = total > 0 ? (interestAmount / total) * 100 : 0
  const feesPct = total > 0 ? (feesAmount / total) * 100 : 0

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
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
        Loan cost details
      </Typography>

      <Box
        sx={{
          bgcolor: '#F8F9FD',
          borderRadius: '8px',
          px: 8,
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 5,
        }}
      >
        {/* Top row: cost fields */}
        <Box
          sx={{
            display: 'flex',
            gap: '60px',
            pb: 5,
            borderBottom: '1px dashed',
            borderColor: 'divider',
          }}
        >
          {fields.map((f) => (
            <Box key={f.label} sx={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: 'text.secondary',
                  opacity: 0.7,
                }}
              >
                {f.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '24px',
                  letterSpacing: '0.15px',
                  color: '#1A1A1A',
                }}
              >
                {f.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Stacked progress bar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {/* Amount labels */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: 'text.primary' }}>
              ${principalAmount.toLocaleString()}
            </Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: 'text.primary' }}>
              ${interestAmount.toLocaleString()}
            </Typography>
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: 'text.primary' }}>
              ${feesAmount.toLocaleString()}
            </Typography>
          </Box>

          {/* Stacked bar */}
          <Box sx={{ display: 'flex', width: '100%', height: 16, borderRadius: '8px', overflow: 'hidden' }}>
            <Box sx={{ width: `${principalPct}%`, bgcolor: '#FF6800', height: '100%' }} />
            <Box sx={{ width: `${interestPct}%`, bgcolor: 'primary.main', height: '100%' }} />
            <Box sx={{ width: `${feesPct}%`, bgcolor: '#D08CFF', height: '100%' }} />
          </Box>

          {/* Legend */}
          <Box sx={{ display: 'flex', gap: 5, justifyContent: 'flex-end', mt: 2 }}>
            <LegendItem color="#FF6800" label={`Principal - ${Math.round(principalPct)}%`} />
            <LegendItem color="#474DDD" label={`Interest paid over tenure - ${Math.round(interestPct)}%`} />
            <LegendItem color="#D08CFF" label={`Taxes & Fees - ${Math.round(feesPct)}%`} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: color, flexShrink: 0 }} />
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          lineHeight: '16px',
          color: 'text.secondary',
          opacity: 0.7,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
