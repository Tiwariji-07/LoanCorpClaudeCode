'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type StatusVariant = 'Pending' | 'Awaiting Decision' | 'Approved' | 'Rejected'

const STATUS_STYLES: Record<StatusVariant, { bgcolor: string; color: string }> = {
  Pending:            { bgcolor: '#E8EAF6', color: '#474DDD' },
  'Awaiting Decision': { bgcolor: '#FFF3E0', color: '#E65100' },
  Approved:           { bgcolor: '#16A41D', color: '#FFFFFF' },
  Rejected:           { bgcolor: '#BA1A1A', color: '#FFFFFF' },
}

interface Props {
  status: string
}

export default function LoanStatusBadge({ status }: Props) {
  const variant = status as StatusVariant
  const style = STATUS_STYLES[variant] ?? STATUS_STYLES.Pending

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: '12px',
        py: '4px',
        borderRadius: '1000px',
        bgcolor: style.bgcolor,
        minWidth: 80,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16px',
          color: style.color,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </Typography>
    </Box>
  )
}
