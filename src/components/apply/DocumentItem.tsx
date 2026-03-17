'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

export interface DocumentItemProps {
  label: string
  description?: string
  fileName?: string
  status: 'uploaded' | 'pending'
  onUpload: () => void
  onRemove: () => void
}

export default function DocumentItem({
  label,
  description,
  fileName,
  status,
  onUpload,
  onRemove,
}: DocumentItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: 56,
        px: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        width: '100%',
      }}
    >
      {/* Document icon */}
      {status === 'uploaded' ? (
        <CheckCircleIcon sx={{ fontSize: 16, color: '#16A41D', flexShrink: 0 }} />
      ) : (
        <DescriptionOutlinedIcon
          sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0, opacity: 0.6 }}
        />
      )}

      {/* Label + description */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.1px',
            color: 'text.primary',
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: '20px',
              color: 'text.secondary',
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Right side: filename + remove, or upload button */}
      {status === 'uploaded' && fileName ? (
        <>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#7F879E',
              textDecoration: 'underline',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {fileName}
          </Typography>
          <IconButton onClick={onRemove} size="small" sx={{ flexShrink: 0 }}>
            <CloseIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
          </IconButton>
        </>
      ) : (
        <Button
          variant="text"
          onClick={onUpload}
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
            color: 'primary.main',
            bgcolor: 'rgba(79, 91, 146, 0.08)',
            borderRadius: '8px',
            height: 32,
            minWidth: 73,
            textTransform: 'none',
          }}
        >
          Upload
        </Button>
      )}
    </Box>
  )
}
