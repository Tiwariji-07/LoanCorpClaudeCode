'use client'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

export default function LoginError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        px: 4,
      }}
    >
      <Alert
        severity="error"
        action={
          <Button
            onClick={reset}
            size="small"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: '#D32F2F',
              textTransform: 'none',
            }}
          >
            Try again
          </Button>
        }
        sx={{
          maxWidth: 480,
          width: '100%',
          borderRadius: '12px',
          fontFamily: '"DM Sans", sans-serif',
        }}
      >
        {error.message || 'Something went wrong loading the login page.'}
      </Alert>
    </Box>
  )
}
