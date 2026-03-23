'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import type { Loan } from '@/types/api/loan'

function formatCurrency(value: number | undefined): string {
  if (value == null) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

const labelSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#7F879E' }
const valSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#0B2171' }

interface Props {
  loan: Loan
}

export default function LoanSummaryCard({ loan }: Props) {
  const annualPayment = (loan.emiAmount ?? 0) * 12

  return (
    <Box sx={{ bgcolor: '#FAFAFB', borderRadius: '12px', px: '32px', py: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px', color: '#0B2171' }}>
        You are about to approve this loan application.
      </Typography>
      <Box className="flex items-center" sx={{ gap: '0px' }}>
        <SummaryField label="Amount" value={formatCurrency(loan.principleAmount)} />
        <VertDivider />
        <SummaryField label="Tenure" value={`${loan.tenure ?? 0} years`} />
        <VertDivider />
        <SummaryField label="APR" value={`${loan.interest ?? 0}%`} />
        <VertDivider />
        <SummaryField label="Monthly EMI" value={formatCurrency(loan.emiAmount)} />
        <VertDivider />
        <SummaryField label="Annual payment" value={formatCurrency(annualPayment)} />
        <VertDivider />
        <SummaryField label="Total Repayment" value={formatCurrency(loan.totalAmount)} />
      </Box>
    </Box>
  )
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={labelSx}>{label}</Typography>
      <Typography sx={valSx}>{value}</Typography>
    </Box>
  )
}

function VertDivider() {
  return <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC', mx: '0px', height: 37, alignSelf: 'center' }} />
}
