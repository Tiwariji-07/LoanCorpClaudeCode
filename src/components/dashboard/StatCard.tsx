'use client'

import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface StatCardProps {
  label: string
  value: string
  detail: string
  detailSuffix?: string
  icon: ReactNode
}

export default function StatCard({ label, value, detail, detailSuffix, icon }: StatCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        height: 117,
        p: 5,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px', flex: 1 }}>
        {/* Label */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '16px',
            color: 'text.secondary',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </Typography>

        {/* Value + detail */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '16px',
                color: 'text.primary',
              }}
            >
              {detail}
            </Typography>
            {detailSuffix && (
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: 'text.secondary',
                }}
              >
                {detailSuffix}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Icon */}
      <Box sx={{ display: 'flex', width: 24, height: 24, flexShrink: 0 }}>{icon}</Box>
    </Box>
  )
}
