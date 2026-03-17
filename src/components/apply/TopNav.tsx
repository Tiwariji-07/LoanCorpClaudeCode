'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'

export interface TopNavProps {
  title: string
  onExit: () => void
}

export default function TopNav({ title, onExit }: TopNavProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 67,
        px: 6,
        py: 5,
        bgcolor: 'background.paper',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
        width: '100%',
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'primary.main',
            borderRadius: '50%',
          }}
        >
          <HomeIcon sx={{ color: 'white', fontSize: 24 }} />
        </Box>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '24px',
            letterSpacing: '0.15px',
            color: 'text.primary',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Button
        variant="text"
        onClick={onExit}
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          letterSpacing: '0.1px',
          color: 'text.primary',
          borderRadius: '12px',
          height: 42,
          width: 130,
          textTransform: 'none',
        }}
      >
        Exit Application
      </Button>
    </Box>
  )
}
