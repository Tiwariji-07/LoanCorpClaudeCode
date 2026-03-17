'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import Link from 'next/link'

export default function LandingNav() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: '#F0F0F0',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Centered layout with 375px gap between groups — matches Figma */}
      <Box className="flex items-center justify-center gap-[375px]">
        {/* Logo */}
        <Box sx={{ width: 122, flexShrink: 0 }}>
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
            Loan Corp
          </Typography>
        </Box>

        {/* Nav Links — center group */}
        <Box className="flex items-center gap-[32px]">
          <Button
            variant="text"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.1px',
              color: 'text.primary',
              textTransform: 'none',
              borderRadius: '1000px',
              height: 40,
              width: 81,
            }}
          >
            Personal
          </Button>
          <Button
            variant="text"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.1px',
              color: 'text.primary',
              textTransform: 'none',
              borderRadius: '1000px',
              height: 40,
              width: 91,
            }}
          >
            Business
          </Button>
        </Box>

        {/* User Actions — right group */}
        <Box className="flex items-center gap-[20px]">
          <IconButton size="large" sx={{ width: 48, height: 48 }}>
            <LightModeOutlinedIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
          </IconButton>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.1px',
              bgcolor: 'primary.main',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              height: 40,
              width: 156,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
