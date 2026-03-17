'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

interface LoanField {
  icon: string
  label: string
  value: string
}

export interface LoanApplicationCardProps {
  applicationId: string
  fields: LoanField[]
  estimatedTimeLeft: string
}

export default function LoanApplicationCard({
  applicationId,
  fields,
  estimatedTimeLeft,
}: LoanApplicationCardProps) {
  return (
    <Box
      sx={{
        bgcolor: '#F8F9FD',
        borderRadius: '8px',
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
        {/* Application ID */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            color: 'text.secondary',
          }}
        >
          Application ID {applicationId}
        </Typography>

        {/* Fields row */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {fields.map((field) => (
              <Box key={field.label} sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'rgba(71, 77, 221, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '18px',
                  }}
                >
                  {field.icon}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: 'text.secondary',
                    }}
                  >
                    {field.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.1px',
                      color: 'text.primary',
                    }}
                  >
                    {field.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Progress note */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, height: 28 }}>
            <FiberManualRecordIcon sx={{ fontSize: 6, color: '#16A41D' }} />
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                color: 'text.primary',
              }}
            >
              {estimatedTimeLeft}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
