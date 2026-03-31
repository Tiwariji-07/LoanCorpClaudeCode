'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

interface NavLink {
  label: string
  href: string
}

export interface LandingHeaderProps {
  navLinks?: NavLink[]
  isLoggedIn?: boolean
  onSignIn?: () => void
  onGetStarted?: () => void
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Loans', href: '#loans' },
  { label: 'About Us', href: '#about' },
  { label: 'Help', href: '#help' },
]

export default function LandingHeader({
  navLinks = DEFAULT_LINKS,
  isLoggedIn = false,
  onSignIn,
  onGetStarted,
}: LandingHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 67,
        px: 6,
        bgcolor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      {/* Logo + nav links */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 3, md: 8 } }}>
        {/* Logo placeholder */}
        <Box
          sx={{
            width: 122,
            height: 28,
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: 'white',
            }}
          >
            LoanCorp
          </Typography>
        </Box>

        {/* Nav links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 6 }}>
          {navLinks.map((link) => (
            <Typography
              key={link.label}
              component="a"
              href={link.href}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Auth actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {!isLoggedIn && (
          <>
            <Button
              variant="text"
              onClick={onSignIn}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: 'white',
                textTransform: 'none',
                borderRadius: '8px',
                height: 42,
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              onClick={onGetStarted}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: 'white',
                borderColor: 'white',
                textTransform: 'none',
                borderRadius: '8px',
                height: 42,
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Get Started
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}
