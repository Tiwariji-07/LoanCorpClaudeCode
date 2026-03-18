'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import type { PersonFormData, LoanFormData } from '@/app/(apply)/apply/page'

interface Props {
  personData: PersonFormData
  loanData: LoanFormData
}

export default function Step4Summary({ personData, loanData }: Props) {
  const personalFields = [
    { label: 'First name', value: personData.firstName },
    { label: 'Last name', value: personData.lastName },
    { label: 'Date of birth', value: personData.dob },
    { label: 'Social security number', value: personData.socialSecurityNumber },
    { label: 'Email', value: personData.email },
    { label: 'Phone Number', value: personData.phoneNumber },
    { label: 'Address', value: [personData.address, personData.areaCode, personData.state].filter(Boolean).join(', ') },
  ]

  const loanFields = [
    { label: 'Loan type', value: loanData.loanCategory },
    { label: 'Principal', value: `$${loanData.principleAmount.toLocaleString()}` },
    { label: 'Tenure', value: `${loanData.tenure} years` },
    { label: 'Auto-pay', value: loanData.autoPayEnabled ? 'Enabled' : 'Disabled' },
  ]

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: '#E5E5EC',
        borderRadius: '8px',
        p: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      <SummarySection
        icon={<PersonOutlinedIcon sx={{ fontSize: 20, color: '#474DDD' }} />}
        title="Personal Details"
      >
        <Box
          className="flex flex-wrap"
          sx={{ gap: '32px', pb: '24px', borderBottom: '1px dashed', borderColor: '#E5E5EC' }}
        >
          {personalFields.map((f) => (
            <InfoField key={f.label} label={f.label} value={f.value || '—'} />
          ))}
        </Box>
      </SummarySection>

      <SummarySection
        icon={<DescriptionOutlinedIcon sx={{ fontSize: 20, color: '#474DDD' }} />}
        title="Documents"
      >
        <Box
          className="flex flex-wrap"
          sx={{ gap: '32px 59px', pb: '24px', borderBottom: '1px dashed', borderColor: '#E5E5EC' }}
        >
          <InfoField label="Document 1" value="Passport.jpeg" />
          <InfoField label="Document 2" value="Bank Statement.pdf" />
          <InfoField label="Document 3" value="W2 2025.pdf" />
          <InfoField label="Document 4" value="Employment Proof.pdf" />
          <InfoField label="Document 5" value="Home Purchase Agreement.png" />
        </Box>
      </SummarySection>

      <SummarySection
        icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 20, color: '#474DDD' }} />}
        title="Loan details"
      >
        <Box className="flex gap-[32px] items-center">
          {loanFields.map((f) => (
            <InfoField key={f.label} label={f.label} value={f.value} width="auto" />
          ))}
        </Box>
      </SummarySection>
    </Box>
  )
}

function SummarySection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Box className="flex flex-col gap-[24px]" sx={{ width: '100%' }}>
      <Box className="flex items-center justify-between">
        <Box className="flex items-center gap-[8px]">
          {icon}
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#2E2C46' }}>
            {title}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ width: 20, height: 20 }}>
          <EditIcon sx={{ fontSize: 16, color: '#7F879E' }} />
        </IconButton>
      </Box>
      {children}
    </Box>
  )
}

function InfoField({ label, value, width = 162 }: { label: string; value: string; width?: number | string }) {
  return (
    <Box className="flex flex-col gap-[8px]" sx={{ width }}>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#7F879E' }}>{label}</Typography>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#2E2C46' }}>{value}</Typography>
    </Box>
  )
}
