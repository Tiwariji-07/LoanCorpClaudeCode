'use client'

import Chip from '@mui/material/Chip'

export interface AutoPayBadgeProps {
  enabled: boolean
}

export default function AutoPayBadge({ enabled }: AutoPayBadgeProps) {
  return (
    <Chip
      label={enabled ? 'AUTO-PAY ENABLED' : 'AUTO-PAY DISABLED'}
      sx={{
        bgcolor: enabled ? '#6750A4' : '#7F879E',
        color: 'white',
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 700,
        fontSize: '8px',
        lineHeight: '16px',
        letterSpacing: '0.5px',
        height: 24,
        borderRadius: '120px',
        px: 2,
        '& .MuiChip-label': {
          px: 0,
        },
      }}
    />
  )
}
