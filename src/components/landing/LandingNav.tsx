'use client'

import { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'

export default function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        px: { xs: '16px', md: 0 },
      }}
    >
      {/* Desktop layout */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'space-between', md: 'center' },
          gap: { xs: 0, md: '375px' },
          width: '100%',
        }}
      >
        {/* Logo */}
        <Box sx={{ width: 122, height: 28, flexShrink: 0 }}>
          <Image src="/icons/common/logo.png" alt="Loan Corp" width={122} height={28} />
        </Box>

        {/* Nav Links — hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '32px' }}>
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

        {/* User Actions — hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '20px' }}>
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

        {/* Mobile hamburger */}
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            position: 'absolute',
            top: 72,
            left: 0,
            right: 0,
            bgcolor: 'background.paper',
            borderBottom: '1px solid #F0F0F0',
            py: 2,
            px: '16px',
            gap: 1,
            zIndex: 99,
          }}
        >
          <Button variant="text" sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: 'text.primary', textTransform: 'none', justifyContent: 'flex-start' }}>
            Personal
          </Button>
          <Button variant="text" sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: 'text.primary', textTransform: 'none', justifyContent: 'flex-start' }}>
            Business
          </Button>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              bgcolor: 'primary.main',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              height: 40,
              boxShadow: 'none',
              mt: 1,
            }}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Box>
  )
}
