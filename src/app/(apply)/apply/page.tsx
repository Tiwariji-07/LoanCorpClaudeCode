'use client'

import { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Stepper from '@/components/apply/Stepper'
import StepHeader from '@/components/apply/StepHeader'
import Step1PersonalDetails from '@/components/apply/Step1PersonalDetails'
import Step2UploadDocument from '@/components/apply/Step2UploadDocument'
import Step3LoanDetails from '@/components/apply/Step3LoanDetails'
import Step4Summary from '@/components/apply/Step4Summary'

const STEPS = ['Personal Details', 'Documents Upload', 'Loan Details', 'Review application']

const STEP_HEADERS = [
  { title: 'Personal Details', subtitle: 'Please enter your personal Details below' },
  { title: 'Documents Upload', subtitle: 'Please upload all documents' },
  { title: 'Loan Details', subtitle: 'Specify your loan requirements below' },
  { title: 'Review Application', subtitle: 'Review your application details below' },
]

const NEXT_LABELS = ['Documents Upload', 'Loan Details', 'Review Application', 'Submit Application']
const BACK_LABELS = ['', 'Personal Details', 'Documents Upload', 'Loan Details']

export default function ApplyPage() {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, STEPS.length - 1))
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        bgcolor: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Top Nav — Figma: 67px, shadow, logo + title + Exit */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 67,
          px: '24px',
          py: '20px',
          boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.05)',
          flexShrink: 0,
          bgcolor: 'white',
          zIndex: 1,
        }}
      >
        <Box className="flex items-center gap-[12px]">
          <Image src="/icons/common/wizard-logo.png" alt="Home" width={44} height={44} />
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.15px',
              color: '#2E2C46',
              whiteSpace: 'nowrap',
            }}
          >
            Application for Home Improvement loan
          </Typography>
        </Box>
        <Button
          variant="text"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
            color: '#2E2C46',
            textTransform: 'none',
            borderRadius: '12px',
            height: 42,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Exit Application
        </Button>
      </Box>

      {/* Body: sidebar stepper + content */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left sidebar — Figma: 409px, #F8F9FD */}
        <Box
          sx={{
            width: 409,
            flexShrink: 0,
            bgcolor: '#F8F9FD',
            pl: '84px',
            pr: '52px',
            pt: '44px',
            alignSelf: 'stretch',
          }}
        >
          <Stepper steps={STEPS} activeStep={activeStep} />
        </Box>

        {/* Right: content + footer */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
          {/* Scrollable content */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              pt: '44px',
              px: '100px',
              pb: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <StepHeader
              title={STEP_HEADERS[activeStep].title}
              subtitle={STEP_HEADERS[activeStep].subtitle}
            />
            {activeStep === 0 && <Step1PersonalDetails />}
            {activeStep === 1 && <Step2UploadDocument />}
            {activeStep === 2 && <Step3LoanDetails />}
            {activeStep === 3 && <Step4Summary />}
          </Box>

          {/* Footer — Figma: 90px, top border */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 90,
              px: '100px',
              borderTop: '1px solid',
              borderColor: '#E5E5EC',
              flexShrink: 0,
              gap: '20px',
            }}
          >
            {/* AI assist (steps 1-3) */}
            {activeStep > 0 && (
              <Image
                src="/icons/common/ai-assist.png"
                alt="AI Assist"
                width={35}
                height={35}
                style={{ flexShrink: 0 }}
              />
            )}

            {/* Back button */}
            {activeStep > 0 && (
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
                onClick={handleBack}
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  letterSpacing: '0.1px',
                  color: '#474DDD',
                  borderColor: '#474DDD',
                  borderWidth: 1,
                  textTransform: 'none',
                  borderRadius: '12px',
                  height: 42,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  pl: '16px',
                  pr: '24px',
                }}
              >
                {BACK_LABELS[activeStep]}
              </Button>
            )}

            {/* Next / Submit */}
            <Button
              variant="contained"
              startIcon={
                activeStep < 3 ? (
                  <ArrowForwardIcon sx={{ fontSize: '14px !important' }} />
                ) : undefined
              }
              onClick={handleNext}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.1px',
                bgcolor: '#474DDD',
                color: 'white',
                textTransform: 'none',
                borderRadius: '12px',
                height: 42,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                pl: activeStep < 3 ? '16px' : '24px',
                pr: '24px',
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
              }}
            >
              {NEXT_LABELS[activeStep]}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
