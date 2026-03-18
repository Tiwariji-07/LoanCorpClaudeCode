'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/* Styles keyed by LoanStatus.displayName from GET /loancorp/LoanStatus */
const STATUS_STYLES: Record<string, { bgcolor: string; color: string }> = {
  Pending:        { bgcolor: '#E8EAF6', color: '#474DDD' },
  Awaiting:       { bgcolor: '#FFF3E0', color: '#E65100' },
  'In-Progress':  { bgcolor: '#E3F2FD', color: '#1565C0' },
  Approved:       { bgcolor: '#16A41D', color: '#FFFFFF' },
  Rejected:       { bgcolor: '#BA1A1A', color: '#FFFFFF' },
}

const DEFAULT_STYLE = { bgcolor: '#E8EAF6', color: '#474DDD' }

interface Props {
  status: string
}

export default function LoanStatusBadge({ status }: Props) {
  const style = STATUS_STYLES[status] ?? DEFAULT_STYLE

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
