'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function CTASection() {
  return (
    <Box component="section" sx={{ px: '94px', pt: '72px' }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          borderRadius: '8px',
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '72px',
        }}
      >
        {/* Figma: DM Sans Bold, 36px, line-height 44px, white, capitalize, max-width 539px */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '44px',
            color: 'white',
            textTransform: 'capitalize',
            maxWidth: 539,
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
