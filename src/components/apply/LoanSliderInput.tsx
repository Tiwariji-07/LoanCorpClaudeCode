'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

export interface LoanSliderInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  tickLabels: string[]
  displayValue: string
}

export default function LoanSliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1000,
  tickLabels,
  displayValue,
}: LoanSliderInputProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        flex: 1,
        height: 193,
        alignItems: 'center',
        justifyContent: 'center',
        px: 9,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
      }}
    >
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
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
        <TextField
          value={displayValue}
          size="small"
          InputProps={{ readOnly: true }}
          sx={{
            width: 122,
            '& .MuiOutlinedInput-root': {
              height: 40,
              borderRadius: '8px',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '16px',
              '& fieldset': { borderColor: '#E5E5EC' },
            },
          }}
        />
      </Box>

      {/* Slider + tick labels */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
        <Slider
          value={value}
          onChange={(_, v) => onChange(v as number)}
          min={min}
          max={max}
          step={step}
          sx={{
            color: '#FF6800',
            height: 16,
            '& .MuiSlider-track': {
              borderRadius: '16px 4px 4px 16px',
            },
            '& .MuiSlider-rail': {
              bgcolor: '#FFF9F5',
              borderRadius: '2px 16px 16px 2px',
              opacity: 1,
            },
            '& .MuiSlider-thumb': {
              width: 4,
              height: 24,
              borderRadius: '2px',
              bgcolor: '#FF6800',
              '&:hover, &.Mui-active': { boxShadow: 'none' },
            },
          }}
        />

        {/* Tick labels */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {tickLabels.map((tick) => (
            <Typography
              key={tick}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: 'text.primary',
                textAlign: 'center',
              }}
            >
              {tick}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
