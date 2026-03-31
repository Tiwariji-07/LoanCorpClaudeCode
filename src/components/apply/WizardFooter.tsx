'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import IconButton from '@mui/material/IconButton'

export interface WizardFooterProps {
  onBack?: () => void
  backLabel?: string
  onNext: () => void
  nextLabel: string
  showAiAssist?: boolean
  onAiAssist?: () => void
}

export default function WizardFooter({
  onBack,
  backLabel,
  onNext,
  nextLabel,
  showAiAssist = false,
  onAiAssist,
}: WizardFooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: onBack ? 'space-between' : 'flex-end',
        height: 90,
        px: { xs: 2, sm: 4, md: 25 },
        borderTop: '1px solid',
        borderColor: 'divider',
        width: '100%',
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: 'flex', gap: 5, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
        {showAiAssist && (
          <IconButton
            onClick={onAiAssist}
            sx={{
              width: 35,
              height: 35,
              bgcolor: 'rgba(71, 77, 221, 0.08)',
              borderRadius: '50%',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          </IconButton>
        )}

        {onBack && backLabel && (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ fontSize: '14px !important' }} />}
            onClick={onBack}
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.1px',
              color: 'primary.main',
              borderColor: 'primary.main',
              borderRadius: '12px',
              height: 42,
              textTransform: 'none',
              px: 6,
            }}
          >
            {backLabel}
          </Button>
        )}

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
          onClick={onNext}
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '12px',
            height: 42,
            textTransform: 'none',
            px: 6,
          }}
        >
          {nextLabel}
        </Button>
      </Box>
    </Box>
  )
}
