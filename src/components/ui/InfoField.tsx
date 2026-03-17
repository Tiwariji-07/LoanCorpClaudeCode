'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface InfoFieldProps {
  label: string
  value: string
  width?: number | string
}

export default function InfoField({ label, value, width = 162 }: InfoFieldProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', width }}>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16px',
          color: 'text.secondary',
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
          color: 'text.primary',
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
