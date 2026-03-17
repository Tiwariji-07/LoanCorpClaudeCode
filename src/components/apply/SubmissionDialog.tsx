'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

export interface SubmissionDialogProps {
  applicationId: string
  loanType: string
  onGoToDashboard: () => void
}

export default function SubmissionDialog({
  applicationId,
  loanType,
  onGoToDashboard,
}: SubmissionDialogProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: '-2px 0px 100px 0px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 12,
        py: 6,
        width: '100%',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: '100%' }}>
        {/* Success illustration */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 442,
            width: '100%',
          }}
        >
          {/* Icon cluster */}
          <Box sx={{ position: 'relative', width: 101, height: 120, mb: 6 }}>
            <DescriptionOutlinedIcon
              sx={{ fontSize: 80, color: '#E5E5EC', position: 'absolute', top: 0, left: 10 }}
            />
            <TaskAltIcon
              sx={{
                fontSize: 40,
                color: '#16A41D',
                bgcolor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                bottom: 10,
                right: 0,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
            {/* Title + ID */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
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
                Your {loanType} application was successfully submitted.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'center' }}>
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
                    color: 'primary.main',
                  }}
                >
                  {applicationId}
                </Typography>
              </Box>
            </Box>

            {/* Description */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                Our team will now review your application. You will receive email and SMS
                notifications as your application progresses. Below are the next steps in your
                application process.
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
        </Box>

        {/* CTA */}
        <Button
          variant="contained"
          onClick={onGoToDashboard}
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '8px',
            height: 42,
            width: 203,
            textTransform: 'none',
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  )
}
