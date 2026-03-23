'use client'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import type { Loan } from '@/types/api/loan'

function fmt(v: number | undefined): string {
  if (v == null) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
}

const labelSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '18px', color: '#7F879E' }
const valSx = { fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#0B2171' }

interface Props {
  open: boolean
  onClose: () => void
  loan: Loan | null
}

export default function ApplicationApprovedDialog({ open, onClose, loan }: Props) {
  if (!loan) return null
  const annual = (loan.emiAmount ?? 0) * 12

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{ sx: { borderRadius: '16px', width: 500, p: 0 } }}>
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Illustration */}
        <Box sx={{ pt: '48px', pb: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Box sx={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: '#F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DescriptionOutlinedIcon sx={{ fontSize: 48, color: '#474DDD' }} />
            </Box>
            <CheckCircleIcon sx={{ position: 'absolute', bottom: 4, right: 12, fontSize: 32, color: '#16A41D' }} />
          </Box>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', color: '#0B2171', textAlign: 'center' }}>
            Application {loan.applicationId}
          </Typography>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', color: '#0B2171', textAlign: 'center', mt: '-8px' }}>
            Approved!
          </Typography>
        </Box>

        {/* Summary grid */}
        <Box sx={{ mx: '32px', mb: '24px', bgcolor: '#FAFAFB', borderRadius: '12px', p: '12px', width: 'calc(100% - 64px)' }}>
          <Box className="flex">
            <Box sx={{ flex: 1, p: '12px' }}><Typography sx={labelSx}>Amount</Typography><Typography sx={valSx}>{fmt(loan.principleAmount)}</Typography></Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC' }} />
            <Box sx={{ flex: 1, p: '12px' }}><Typography sx={labelSx}>Tenure</Typography><Typography sx={valSx}>{loan.tenure} years</Typography></Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC' }} />
            <Box sx={{ flex: 1, p: '12px' }}><Typography sx={labelSx}>APR</Typography><Typography sx={valSx}>{loan.interest}%</Typography></Box>
          </Box>
          <Divider sx={{ borderColor: '#E5E5EC' }} />
          <Box className="flex">
            <Box sx={{ flex: 1, p: '12px' }}><Typography sx={labelSx}>Monthly EMI</Typography><Typography sx={valSx}>{fmt(loan.emiAmount)}</Typography></Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC' }} />
            <Box sx={{ flex: 1, p: '12px' }}><Typography sx={labelSx}>Annual payment</Typography><Typography sx={valSx}>{fmt(annual)}</Typography></Box>
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#E5E5EC' }} />
            <Box sx={{ flex: 1, p: '12px' }}><Typography sx={labelSx}>Total Repayment</Typography><Typography sx={valSx}>{fmt(loan.totalAmount)}</Typography></Box>
          </Box>
        </Box>

        {/* Done button */}
        <Box sx={{ pb: '32px' }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px',
              bgcolor: '#474DDD', color: 'white', textTransform: 'none', borderRadius: '8px',
              height: 40, width: 147, boxShadow: 'none',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
            }}
          >
            Done
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
