'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/* All badges use a light tinted background with colored text (no solid fills) */
const STATUS_STYLES: Record<string, { bgcolor: string; color: string }> = {
  Pending:        { bgcolor: '#EEEDF9', color: '#474DDD' },
  Awaiting:       { bgcolor: '#EEEDF9', color: '#474DDD' },
  'In-Progress':  { bgcolor: '#E3F2FD', color: '#1565C0' },
  Approved:       { bgcolor: '#E8F5E9', color: '#16A41D' },
  Rejected:       { bgcolor: '#FDECEA', color: '#BA1A1A' },
}

const DEFAULT_STYLE = { bgcolor: '#EEEDF9', color: '#474DDD' }

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
