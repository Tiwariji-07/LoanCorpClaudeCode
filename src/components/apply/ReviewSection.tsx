'use client'

import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'

export interface ReviewSectionProps {
  icon: ReactNode
  title: string
  onEdit: () => void
  children: ReactNode
}

export default function ReviewSection({ icon, title, onEdit, children }: ReviewSectionProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
      {/* Section header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', width: 20, height: 20, flexShrink: 0 }}>{icon}</Box>
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
        </Box>
        <IconButton onClick={onEdit} size="small" sx={{ width: 20, height: 20 }}>
          <EditIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </IconButton>
      </Box>

      {/* Section content */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          pb: 6,
          borderBottom: '1px dashed',
          borderColor: 'divider',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
