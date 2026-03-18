'use client'

import Image from 'next/image'
import Link from 'next/link'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export interface LoanSubmissionDialogProps {
  open: boolean
  onClose: () => void
  loanId?: string
}

export default function LoanSubmissionDialog({
  open,
  onClose,
  loanId = 'HL-2026-123456',
}: LoanSubmissionDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        // Prevent closing on backdrop click — user must use buttons
        if (reason === 'backdropClick') return
        onClose()
      }}
      maxWidth={false}
      PaperProps={{
        sx: {
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: '-2px 0px 100px 0px rgba(0,0,0,0.06)',
          width: 680,
          maxWidth: '90vw',
          px: '48px',
          py: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        },
      }}
    >
      {/* Main content block */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: 442,
        }}
      >
        {/* Success illustration — Figma: 101×120px */}
        <Image
          src="/icons/common/success-illustration.png"
          alt="Application submitted"
          width={101}
          height={120}
          style={{ marginBottom: 24 }}
        />

        {/* Title + Application ID */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%', mb: '24px' }}>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.15px',
              color: '#1A1A1A',
              textAlign: 'center',
            }}
          >
            Your Home Loan application was successfully submitted.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: '#4B4B4C',
              }}
            >
              Application ID:
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: '#474DDD',
              }}
            >
              {loanId}
            </Typography>
          </Box>
        </Box>

        {/* Description + tracking note */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#4B4B4C',
              textAlign: 'center',
            }}
          >
            Our team will now review your application. You will receive email and SMS notifications
            as your application progresses. Below are the next steps in your application process.
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '18px',
              color: '#4B4B4C',
              textAlign: 'center',
            }}
          >
            You can begin tracking your application on your dashboard once process begins!
          </Typography>
        </Box>
      </Box>

      {/* CTA button */}
      <Button
        component={Link}
        href="/dashboard"
        variant="contained"
        onClick={onClose}
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.1px',
          bgcolor: '#474DDD',
          color: 'white',
          textTransform: 'none',
          borderRadius: '8px',
          height: 42,
          width: 203,
          boxShadow: 'none',
          px: '20px',
          '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
        }}
      >
        Go to Dashboard
      </Button>
    </Dialog>
  )
}
