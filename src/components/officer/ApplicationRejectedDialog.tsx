'use client'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import WarningIcon from '@mui/icons-material/Warning'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import type { Loan } from '@/types/api/loan'

interface Props {
  open: boolean
  onClose: () => void
  loan: Loan | null
}

export default function ApplicationRejectedDialog({ open, onClose, loan }: Props) {
  if (!loan) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{ sx: { borderRadius: '16px', width: 500, p: 0 } }}>
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Illustration */}
        <Box sx={{ pt: '48px', pb: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Box sx={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: '#F0F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DescriptionOutlinedIcon sx={{ fontSize: 48, color: '#474DDD' }} />
            </Box>
            <WarningIcon sx={{ position: 'absolute', bottom: 4, right: 12, fontSize: 32, color: '#E32E34' }} />
          </Box>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', color: '#0B2171', textAlign: 'center' }}>
            Application {loan.applicationId}
          </Typography>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '24px', color: '#E32E34', textAlign: 'center', mt: '-8px' }}>
            Rejected!
          </Typography>
        </Box>

        {/* Done button */}
        <Box sx={{ pb: '32px', pt: '16px' }}>
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
