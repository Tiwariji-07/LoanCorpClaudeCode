'use client'

import { use } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function CustomerDetailPage({ params }: { params: Promise<{ email: string }> }) {
  const { email } = use(params)
  const decodedEmail = decodeURIComponent(email)

  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#2E2C46',
          mb: '24px',
        }}
      >
        Customer Details
      </Typography>

      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#7F879E',
        }}
      >
        Viewing details for: {decodedEmail}
      </Typography>
    </Box>
  )
}
