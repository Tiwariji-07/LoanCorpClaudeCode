'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export interface FooterCTAProps {
  title: string
  buttonLabel: string
  onAction: () => void
}

export default function FooterCTA({ title, buttonLabel, onAction }: FooterCTAProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 3, sm: 6 },
        bgcolor: 'primary.main',
        py: 8,
        px: 6,
        width: '100%',
      }}
    >
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: { xs: '20px', sm: '24px' },
          lineHeight: { xs: '28px', sm: '32px' },
          textAlign: 'center',
          color: 'white',
        }}
      >
        {title}
      </Typography>
      <Button
        variant="outlined"
        onClick={onAction}
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          color: 'white',
          borderColor: 'white',
          borderRadius: '8px',
          height: 42,
          textTransform: 'none',
          '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        {buttonLabel}
      </Button>
    </Box>
  )
}
