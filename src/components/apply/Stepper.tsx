'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'

export interface StepperProps {
  steps: string[]
  activeStep: number
}

type StepStatus = 'completed' | 'active' | 'upcoming'

function getStepStatus(index: number, activeStep: number): StepStatus {
  if (index < activeStep) return 'completed'
  if (index === activeStep) return 'active'
  return 'upcoming'
}

export default function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {steps.map((label, index) => {
        const status = getStepStatus(index, activeStep)
        const isLast = index === steps.length - 1

        // Connector style: solid green between completed steps,
        // solid between completed→active, dashed for rest
        const nextStatus = !isLast ? getStepStatus(index + 1, activeStep) : null
        const connectorSolid = status === 'completed'
        const connectorColor = connectorSolid ? '#16A41D' : '#E5E5EC'

        return (
          <Box key={label}>
            {/* Step row: circle + label */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minHeight: status === 'completed' ? 32 : 33,
              }}
            >
              {/* Circle */}
              <Box
                sx={{
                  width: status === 'completed' ? 32 : 33,
                  height: status === 'completed' ? 32 : 33,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  ...(status === 'completed' && { bgcolor: '#16A41D' }),
                  ...(status === 'active' && { bgcolor: '#474DDD' }),
                  ...(status === 'upcoming' && {
                    border: '1.5px solid',
                    borderColor: '#E5E5EC',
                  }),
                }}
              >
                {status === 'completed' ? (
                  <CheckIcon sx={{ color: 'white', fontSize: 18 }} />
                ) : (
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.1px',
                      textAlign: 'center',
                      color: status === 'active' ? 'white' : '#7F879E',
                    }}
                  >
                    {index + 1}
                  </Typography>
                )}
              </Box>

              {/* Label */}
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.1px',
                  color: status === 'upcoming' ? '#7F879E' : '#2E2C46',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
            </Box>

            {/* Vertical connector line — Figma: 41px tall, centered under circle */}
            {!isLast && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: status === 'completed' ? 32 : 33,
                  height: 41,
                  py: '4px',
                }}
              >
                <Box
                  sx={{
                    width: 0,
                    height: '100%',
                    borderLeft: connectorSolid ? '2px solid' : '1.5px dashed',
                    borderColor: connectorColor,
                  }}
                />
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}
