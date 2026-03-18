'use client'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import RefreshIcon from '@mui/icons-material/Refresh'

export default function OfficerDashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 1304, pt: '40px' }}>
      <Alert
        severity="error"
        sx={{
          borderRadius: '12px',
          fontFamily: '"DM Sans", sans-serif',
          '& .MuiAlertTitle-root': {
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
          },
        }}
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon sx={{ fontSize: '16px !important' }} />}
            onClick={reset}
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              color: '#BA1A1A',
              borderColor: '#BA1A1A',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { borderColor: '#BA1A1A', bgcolor: 'rgba(186,26,26,0.04)' },
            }}
          >
            Try again
          </Button>
        }
      >
        <AlertTitle>Something went wrong</AlertTitle>
        {error.message}
      </Alert>
    </Box>
  )
}
