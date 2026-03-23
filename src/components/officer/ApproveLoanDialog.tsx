'use client'

import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import { useLoanControllerEditLoan } from '@/lib/api/generated/loan-controller/loan-controller'
import { useLoanStatusControllerFindLoanStatuses } from '@/lib/api/generated/loan-status-controller/loan-status-controller'
import type { Loan } from '@/types/api/loan'
import type { LoanStatus } from '@/types/api/loanStatus'
import LoanSummaryCard from './LoanSummaryCard'

interface Props {
  open: boolean
  onClose: () => void
  loan: Loan
  onApproveSuccess: (updatedLoan: Loan) => void
}

export default function ApproveLoanDialog({ open, onClose, loan, onApproveSuccess }: Props) {
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')

  // Fetch statuses to find APPROVED id
  const { data: statusesPage } = useLoanStatusControllerFindLoanStatuses({ page: 1, size: 50 })
  const statuses = ((statusesPage?.content ?? []) as LoanStatus[])
  const approvedStatus = statuses.find((s) => s.name?.toUpperCase() === 'APPROVED')

  const { mutateAsync: editLoan, isPending } = useLoanControllerEditLoan()

  const handleApprove = async () => {
    if (!approvedStatus?.id) {
      setError('Could not find approved status. Please try again.')
      return
    }
    setError('')
    try {
      // PUT replaces entire entity — send all flat fields, override only loanStatusId
      const { person, loanStatus, loanType, ...flatLoan } = loan
      const result = await editLoan({ id: loan.id!, data: { ...flatLoan, loanStatusId: approvedStatus.id } })
      onApproveSuccess(result as Loan)
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Failed to approve loan. Please try again.')
    }
  }

  const handleClose = () => {
    setChecked(false)
    setError('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={false} PaperProps={{ sx: { borderRadius: '16px', width: 856, p: 0 } }}>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ pt: '32px', px: '32px', pb: '12px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Header */}
          <Box className="flex items-center justify-between">
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.15px', color: '#0B2171' }}>
              Approve Loan Application
            </Typography>
            <IconButton onClick={handleClose} size="small"><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
          </Box>

          {/* Loan summary */}
          <LoanSummaryCard loan={loan} />

          {/* Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                sx={{ color: '#7F879E', '&.Mui-checked': { color: '#474DDD' } }}
              />
            }
            label="All underwriting checks and policy requirements have been satisfied."
            sx={{ '& .MuiFormControlLabel-label': { fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '0.1px', color: '#0B2171' } }}
          />

          {error && <Alert severity="error" onClose={() => setError('')} sx={{ fontFamily: '"DM Sans", sans-serif' }}>{error}</Alert>}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: '24px', py: '20px', borderTop: '1px solid white' }}>
          <Button
            variant="contained"
            disabled={!checked || isPending}
            onClick={handleApprove}
            startIcon={isPending ? <CircularProgress size={16} sx={{ color: 'white' }} /> : undefined}
            sx={{
              fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px',
              bgcolor: '#474DDD', color: 'white', textTransform: 'none', borderRadius: '8px',
              height: 40, width: 121, boxShadow: 'none',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
              '&.Mui-disabled': { bgcolor: '#C4C6D0', color: 'white' },
            }}
          >
            {isPending ? 'Approving...' : 'Approve'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
