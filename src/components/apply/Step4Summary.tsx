'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'

/* ─── Mock summary data ─── */

const PERSONAL_FIELDS = [
  { label: 'First name', value: 'Amanda' },
  { label: 'Last name', value: 'Anisimova' },
  { label: 'Date of birth', value: '21 / 03 / 1993' },
  { label: 'Social security number', value: '268-45-7392' },
  { label: 'Email', value: 'amanda_anisimova@gmail.com' },
  { label: 'Phone Number', value: '(216) 555-0123' },
  { label: 'Address', value: '1244, East Decker Drive, Seven Hills, Ohio, 44131' },
]

const DOCUMENT_FIELDS = [
  { label: 'Document 1', value: 'Passport.jpeg' },
  { label: 'Document 2', value: 'Nov 25-Jan 26 Bank Statement.pdf' },
  { label: 'Document 3', value: 'W2 2025.pdf' },
  { label: 'Document 4', value: 'Employment Proof.pdf' },
  { label: 'Document 5', value: 'Home Purchase Agreement.png' },
]

const LOAN_FIELDS = [
  { label: 'Total cost', value: '$1,351,500' },
  { label: 'Tenure', value: '25 years' },
  { label: 'Principal', value: '$650,000' },
  { label: 'Interest paid', value: '$690,000' },
  { label: 'Interest APR', value: '6.85%' },
  { label: 'Monthly EMI', value: '$4,471.5' },
  { label: 'Avg. yearly cost', value: '$54,000' },
]

export default function Step4Summary() {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: '#E5E5EC',
        borderRadius: '8px',
        p: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '24px',
        width: '100%',
      }}
    >
      {/* Section: Personal Details */}
      <SummarySection
        icon={<PersonOutlinedIcon sx={{ fontSize: 20, color: '#474DDD' }} />}
        title="Personal Details"
      >
        <Box
          className="flex flex-wrap"
          sx={{
            gap: '32px',
            pb: '24px',
            borderBottom: '1px dashed',
            borderColor: '#E5E5EC',
          }}
        >
          {PERSONAL_FIELDS.map((f) => (
            <InfoField key={f.label} label={f.label} value={f.value} />
          ))}
        </Box>
      </SummarySection>

      {/* Section: Documents */}
      <SummarySection
        icon={<DescriptionOutlinedIcon sx={{ fontSize: 20, color: '#474DDD' }} />}
        title="Documents"
      >
        <Box
          className="flex flex-wrap"
          sx={{
            gap: '32px 59px',
            pb: '24px',
            borderBottom: '1px dashed',
            borderColor: '#E5E5EC',
          }}
        >
          {DOCUMENT_FIELDS.map((f) => (
            <InfoField key={f.label} label={f.label} value={f.value} />
          ))}
        </Box>
      </SummarySection>

      {/* Section: Loan details */}
      <SummarySection
        icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 20, color: '#474DDD' }} />}
        title="Loan details"
      >
        <Box className="flex gap-[32px] items-center">
          {LOAN_FIELDS.map((f) => (
            <InfoField key={f.label} label={f.label} value={f.value} width="auto" />
          ))}
        </Box>
      </SummarySection>
    </Box>
  )
}

/* ─── Sub-components ─── */

function SummarySection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <Box className="flex flex-col gap-[24px]" sx={{ width: '100%' }}>
      {/* Header */}
      <Box className="flex items-center justify-between">
        <Box className="flex items-center gap-[8px]">
          {icon}
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.15px',
              color: '#2E2C46',
            }}
          >
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

function InfoField({
  label,
  value,
  width = 162,
}: {
  label: string
  value: string
  width?: number | string
}) {
  return (
    <Box className="flex flex-col gap-[8px]" sx={{ width }}>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16px',
          color: '#7F879E',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.1px',
          color: '#2E2C46',
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}
