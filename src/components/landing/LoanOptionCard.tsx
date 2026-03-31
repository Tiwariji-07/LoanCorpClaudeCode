'use client'

import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface StatItem {
  icon: ReactNode
  label: string
}

export interface LoanOptionCardProps {
  title: string
  description: string
  icon: ReactNode
  stats: StatItem[]
  onApply: () => void
}

export default function LoanOptionCard({
  title,
  description,
  icon,
  stats,
  onApply,
}: LoanOptionCardProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: '0px 8px 35px 0px rgba(0,0,0,0.11)',
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: { xs: '100%', md: 260 },
        flexShrink: 0,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-2px)' },
      }}
    >
      {/* Icon */}
      <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </Box>

      {/* Title + description */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
            color: 'text.primary',
          }}
        >
          {title}
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
          {description}
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {stats.map((stat) => (
          <Box key={stat.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {stat.icon}
            </Box>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                color: 'text.secondary',
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Apply button */}
      <Button
        variant="contained"
        onClick={onApply}
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: '8px',
          height: 42,
          textTransform: 'none',
          mt: 'auto',
        }}
      >
        Apply Now
      </Button>
    </Box>
  )
}
