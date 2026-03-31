'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Stepper from '@/components/apply/Stepper'
import StepHeader from '@/components/apply/StepHeader'
import Step1PersonalDetails from '@/components/apply/Step1PersonalDetails'
import Step2UploadDocument from '@/components/apply/Step2UploadDocument'
import Step3LoanDetails from '@/components/apply/Step3LoanDetails'
import Step4Summary from '@/components/apply/Step4Summary'
import LoanSubmissionDialog from '@/components/loans/LoanSubmissionDialog'
import { useManageLoanControllerCreateLoan } from '@/lib/api/generated/manage-loan-controller/manage-loan-controller'
import { useAuthStore } from '@/stores/auth.store'
import type { PersonDTO } from '@/types/api/personDTO'
import type { LoanDTO } from '@/types/api/loanDTO'
import type { Loan } from '@/types/api/loan'

const STEPS = ['Personal Details', 'Documents Upload', 'Loan Details', 'Review application']

const STEP_HEADERS = [
  { title: 'Personal Details', subtitle: 'Please enter your personal Details below' },
  { title: 'Documents Upload', subtitle: 'Please upload all documents' },
  { title: 'Loan Details', subtitle: 'Specify your loan requirements below' },
  { title: 'Review Application', subtitle: 'Review your application details below' },
]

const NEXT_LABELS = ['Documents Upload', 'Loan Details', 'Review Application', 'Submit Application']
const BACK_LABELS = ['', 'Personal Details', 'Documents Upload', 'Loan Details']

/* ─── Form data shape collected across steps ─── */

export interface PersonFormData {
  firstName: string
  lastName: string
  dob: string
  socialSecurityNumber: string
  email: string
  phoneNumber: string
  address: string
  areaCode: string
  state: string
}

export interface LoanFormData {
  loanCategory: string
  autoPayEnabled: boolean
  principleAmount: number
  tenure: number
}

export default function ApplyPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submittedLoanId, setSubmittedLoanId] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  // Form data lifted from step components
  const [personData, setPersonData] = useState<PersonFormData>({
    firstName: '', lastName: '', dob: '', socialSecurityNumber: '',
    email: '', phoneNumber: '', address: '', areaCode: '', state: '',
  })
  const [loanData, setLoanData] = useState<LoanFormData>({
    loanCategory: 'Home Improvement', autoPayEnabled: true,
    principleAmount: 271000, tenure: 12,
  })

  const user = useAuthStore((s) => s.user)

  // Create loan mutation
  const { mutateAsync: createLoan } = useManageLoanControllerCreateLoan()

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      const fullAddress = [personData.address, personData.areaCode, personData.state]
        .filter(Boolean)
        .join(', ')

      const person: PersonDTO = {
        email: personData.email || user?.email,
        firstName: personData.firstName,
        lastName: personData.lastName,
        socialSecurityNumber: personData.socialSecurityNumber,
        phoneNumber: personData.phoneNumber,
        address: fullAddress,
        dob: personData.dob,
      }

      const dto: LoanDTO = {
        principleAmount: loanData.principleAmount,
        tenure: loanData.tenure,
        loanCategory: loanData.loanCategory,
        autoPayEnabled: loanData.autoPayEnabled,
        person,
      }

      const result = await createLoan({ data: dto }) as Loan
      setSubmittedLoanId(result.applicationId ?? `LC${result.id}`)
      setSubmitted(true)
    } catch (err) {
      console.error('Loan submission failed:', err)
      alert('Failed to submit application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [personData, loanData, user, createLoan])

  const handleNext = () => {
    if (activeStep === STEPS.length - 1) {
      handleSubmit()
      return
    }
    setActiveStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        bgcolor: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Top Nav */}
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
        <Box className="flex items-center gap-[12px]" sx={{ minWidth: 0 }}>
          <Image src="/icons/common/wizard-logo.png" alt="Home" width={44} height={44} />
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '14px', md: '18px' },
              lineHeight: '24px',
              letterSpacing: '0.15px',
              color: '#2E2C46',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Application for {loanData.loanCategory} loan
          </Typography>
        </Box>
        <Button
          variant="text"
          href="/dashboard"
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

      {/* Body */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flex: 1, minHeight: 0 }}>
        {/* Left sidebar stepper — hidden on mobile, shown as horizontal strip */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
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

        {/* Mobile stepper indicator */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            py: '12px',
            px: '16px',
            bgcolor: '#F8F9FD',
            flexShrink: 0,
          }}
        >
          {STEPS.map((step, i) => (
            <Box
              key={step}
              sx={{
                flex: 1,
                height: 4,
                borderRadius: '2px',
                bgcolor: i <= activeStep ? '#474DDD' : '#E5E5EC',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Box>

        {/* Right content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              pt: { xs: '24px', md: '44px' },
              px: { xs: '16px', sm: '32px', md: '100px' },
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
            {activeStep === 0 && (
              <Step1PersonalDetails onDataChange={setPersonData} />
            )}
            {activeStep === 1 && <Step2UploadDocument />}
            {activeStep === 2 && (
              <Step3LoanDetails onDataChange={setLoanData} />
            )}
            {activeStep === 3 && (
              <Step4Summary personData={personData} loanData={loanData} />
            )}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
              height: { xs: 'auto', md: 90 },
              px: { xs: '16px', sm: '32px', md: '100px' },
              py: { xs: '12px', md: 0 },
              borderTop: '1px solid',
              borderColor: '#E5E5EC',
              flexShrink: 0,
              gap: { xs: '12px', md: '20px' },
            }}
          >
            {activeStep > 0 && (
              <Image
                src="/icons/common/ai-assist.png"
                alt="AI Assist"
                width={35}
                height={35}
                style={{ flexShrink: 0 }}
              />
            )}

            {activeStep > 0 && (
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
                onClick={handleBack}
                disabled={submitting}
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

            <Button
              variant="contained"
              startIcon={
                submitting ? (
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                ) : activeStep < 3 ? (
                  <ArrowForwardIcon sx={{ fontSize: '14px !important' }} />
                ) : undefined
              }
              onClick={handleNext}
              disabled={submitting}
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
              {submitting ? 'Submitting...' : NEXT_LABELS[activeStep]}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Success dialog */}
      <LoanSubmissionDialog
        open={submitted}
        onClose={() => setSubmitted(false)}
        loanId={submittedLoanId}
      />
    </Box>
  )
}
