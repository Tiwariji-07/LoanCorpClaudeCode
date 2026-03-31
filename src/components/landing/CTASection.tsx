'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function CTASection() {
  return (
    <Box component="section" sx={{ px: { xs: '20px', sm: '40px', md: '94px' }, pt: '72px', pb: '48px', position: 'relative', zIndex: 1 }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          borderRadius: '8px',
          height: { xs: 'auto', md: 160 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: '24px', md: '72px' },
          py: { xs: '32px', md: 0 },
          gap: { xs: '24px', md: 0 },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '24px', md: '36px' },
            lineHeight: { xs: '32px', md: '44px' },
            color: 'white',
            textTransform: 'capitalize',
            maxWidth: { xs: '100%', md: 539 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Stuck Somewhere? Our Team Is Ready To Assist You.
        </Typography>
        {/* Figma: outlined white, 2px border, 8px radius, 156×40 */}
        <Button
          variant="outlined"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
            color: 'white',
            borderColor: 'white',
            borderWidth: 2,
            textTransform: 'none',
            borderRadius: '8px',
            height: 40,
            width: 156,
            flexShrink: 0,
            '&:hover': {
              borderColor: 'white',
              borderWidth: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  )
}
