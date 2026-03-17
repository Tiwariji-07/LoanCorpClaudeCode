'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface StepHeaderProps {
  title: string
  subtitle: string
}

export default function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '36px',
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.1px',
          color: 'text.secondary',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  )
}
