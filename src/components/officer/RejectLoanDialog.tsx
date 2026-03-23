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
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import { useLoanControllerEditLoan } from '@/lib/api/generated/loan-controller/loan-controller'
import { useLoanStatusControllerFindLoanStatuses } from '@/lib/api/generated/loan-status-controller/loan-status-controller'
import type { Loan } from '@/types/api/loan'
import type { LoanStatus } from '@/types/api/loanStatus'

const REJECTION_REASONS = [
  'Debt-to-income ratio exceeds policy threshold',
  'Insufficient income verification',
  'Credit risk concerns',
  'Insufficient credit history',
  'Existing debt obligations exceed acceptable exposure limits',
]

const checkboxSx = { color: '#7F879E', '&.Mui-checked': { color: '#474DDD' }, p: '4px' }
const labelSx = { '& .MuiFormControlLabel-label': { fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '0.1px', color: '#0B2171' } }

interface Props {
  open: boolean
  onClose: () => void
  loan: Loan
  onRejectSuccess: (updatedLoan: Loan) => void
}

export default function RejectLoanDialog({ open, onClose, loan, onRejectSuccess }: Props) {
  const [selectedReasons, setSelectedReasons] = useState<Set<string>>(new Set())
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  // Fetch statuses to find REJECTED id
  const { data: statusesPage } = useLoanStatusControllerFindLoanStatuses({ page: 1, size: 50 })
  const statuses = ((statusesPage?.content ?? []) as LoanStatus[])
  const rejectedStatus = statuses.find((s) => s.name?.toUpperCase() === 'REJECTED')

  const { mutateAsync: editLoan, isPending } = useLoanControllerEditLoan()

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) => {
      const next = new Set(prev)
      if (next.has(reason)) next.delete(reason)
      else next.add(reason)
      return next
    })
  }

  const handleReject = async () => {
    if (!rejectedStatus?.id) {
      setError('Could not find rejected status. Please try again.')
      return
    }
    setError('')
    try {
      // PUT replaces entire entity — send all flat fields, override only loanStatusId
      const { person, loanStatus, loanType, ...flatLoan } = loan
      const result = await editLoan({ id: loan.id!, data: { ...flatLoan, loanStatusId: rejectedStatus.id } })
      onRejectSuccess(result as Loan)
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Failed to reject loan. Please try again.')
    }
  }

  const handleClose = () => {
    setSelectedReasons(new Set())
    setNotes('')
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
              Reject Loan Application
            </Typography>
            <IconButton onClick={handleClose} size="small"><CloseIcon sx={{ fontSize: 16 }} /></IconButton>
          </Box>

          {/* Instructions + checkboxes */}
          <Box className="flex flex-col gap-[24px]">
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#0B2171' }}>
              Please provide a reason for rejection. This information will be shared with the customer.
            </Typography>
            <Box className="flex flex-col gap-[32px]">
              {/* Row 1 */}
              <Box className="flex items-center gap-[24px]" sx={{ flexWrap: 'wrap' }}>
                {REJECTION_REASONS.slice(0, 3).map((reason) => (
                  <FormControlLabel
                    key={reason}
                    control={<Checkbox checked={selectedReasons.has(reason)} onChange={() => toggleReason(reason)} sx={checkboxSx} />}
                    label={reason}
                    sx={labelSx}
                  />
                ))}
              </Box>
              {/* Row 2 */}
              <Box className="flex items-center gap-[32px]">
                {REJECTION_REASONS.slice(3).map((reason) => (
                  <FormControlLabel
                    key={reason}
                    control={<Checkbox checked={selectedReasons.has(reason)} onChange={() => toggleReason(reason)} sx={checkboxSx} />}
                    label={reason}
                    sx={labelSx}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Additional notes */}
          <Box className="flex flex-col gap-[12px]">
            <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, fontSize: '14px', lineHeight: '20px', color: '#7F879E' }}>
              Additional notes
            </Typography>
            <TextField
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '14px',
                  '& fieldset': { borderColor: '#E5E5EC' },
                },
              }}
            />
          </Box>

          {error && <Alert severity="error" onClose={() => setError('')} sx={{ fontFamily: '"DM Sans", sans-serif' }}>{error}</Alert>}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: '24px', py: '20px', borderTop: '1px solid #E5E5EC' }}>
          <Button
            variant="contained"
            disabled={selectedReasons.size === 0 || isPending}
            onClick={handleReject}
            startIcon={isPending ? <CircularProgress size={16} sx={{ color: 'white' }} /> : undefined}
            sx={{
              fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px',
              bgcolor: '#474DDD', color: 'white', textTransform: 'none', borderRadius: '8px',
              height: 40, width: 106, boxShadow: 'none',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
              '&.Mui-disabled': { bgcolor: '#C4C6D0', color: 'white' },
            }}
          >
            {isPending ? 'Rejecting...' : 'Reject'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
