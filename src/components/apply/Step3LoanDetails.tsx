'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Slider from '@mui/material/Slider'

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    height: 56,
    borderRadius: '8px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    '& fieldset': { borderColor: '#E5E5EC', borderWidth: 1 },
  },
}

const smallFieldSx = {
  '& .MuiOutlinedInput-root': {
    height: 40,
    borderRadius: '8px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    '& fieldset': { borderColor: '#E5E5EC', borderWidth: 1 },
  },
}

const COST_FIELDS = [
  { label: 'Total cost', value: '$1.351M' },
  { label: 'Principal', value: '$650K' },
  { label: 'Tenure', value: '25y' },
  { label: 'Interest APR', value: '6.85%' },
  { label: 'Monthly EMI', value: '$4.47K' },
  { label: 'Avg. yearly cost', value: '$54K' },
]

export default function Step3LoanDetails() {
  const [loanAmount, setLoanAmount] = useState(271000)
  const [tenure, setTenure] = useState(12)
  const [autopay, setAutopay] = useState(true)

  return (
    <Box className="flex flex-col gap-[32px]" sx={{ width: '100%', flex: 1 }}>
      {/* Loan type + Autopay row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          height: 100,
          border: '1px solid',
          borderColor: '#E5E5EC',
          borderRadius: '12px',
          px: '24px',
        }}
      >
        <TextField
          select
          defaultValue="home-improvement"
          variant="outlined"
          sx={{ width: 346, ...fieldSx }}
        >
          <MenuItem value="home-improvement">Home Improvement</MenuItem>
          <MenuItem value="personal">Personal Loan</MenuItem>
          <MenuItem value="auto">Auto Loan</MenuItem>
          <MenuItem value="wedding">Wedding</MenuItem>
        </TextField>

        <Box className="flex items-center gap-[16px]">
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.1px',
              color: 'black',
              whiteSpace: 'nowrap',
            }}
          >
            Enable Autopay
          </Typography>
          <Switch
            checked={autopay}
            onChange={(e) => setAutopay(e.target.checked)}
            sx={{
              width: 52,
              height: 32,
              p: 0,
              '& .MuiSwitch-switchBase': {
                p: '4px',
                '&.Mui-checked': {
                  color: 'white',
                  '& + .MuiSwitch-track': { bgcolor: '#474DDD', opacity: 1 },
                },
              },
              '& .MuiSwitch-thumb': { width: 24, height: 24 },
              '& .MuiSwitch-track': { borderRadius: '1000px' },
            }}
          />
        </Box>
      </Box>

      {/* Slider cards row */}
      <Box className="flex gap-[24px] items-center justify-center" sx={{ width: '100%' }}>
        {/* Loan Amount slider */}
        <SliderCard
          label="Loan Amount"
          value={loanAmount}
          displayValue={`$${(loanAmount / 1000).toFixed(0)},000`}
          min={0}
          max={400000}
          step={1000}
          tickLabels={['$0', '$100k', '$200k', '$300k', '$400k']}
          onChange={setLoanAmount}
        />

        {/* Tenure slider */}
        <SliderCard
          label="Loan Tenure"
          value={tenure}
          displayValue={`${tenure}Y`}
          min={8}
          max={22}
          step={1}
          tickLabels={['8Y', '10Y', '15Y', '20Y', '22Y']}
          onChange={setTenure}
        />
      </Box>

      {/* Loan cost details */}
      <Box className="flex flex-col gap-[12px]" sx={{ width: '100%' }}>
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
          Loan cost details
        </Typography>

        <Box
          sx={{
            bgcolor: '#F8F9FD',
            borderRadius: '8px',
            px: '32px',
            py: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Cost fields row */}
          <Box
            className="flex items-start"
            sx={{
              gap: '60px',
              pb: '20px',
              borderBottom: '1px dashed',
              borderColor: '#E5E5EC',
            }}
          >
            {COST_FIELDS.map((f) => (
              <Box key={f.label} className="flex flex-col gap-[4px]" sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#7F879E',
                    opacity: 0.7,
                  }}
                >
                  {f.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '24px',
                    letterSpacing: '0.15px',
                    color: '#1A1A1A',
                  }}
                >
                  {f.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Stacked bar + legend */}
          <Box className="flex flex-col gap-[7px]">
            {/* Amount labels */}
            <Box className="flex justify-between">
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: '#2E2C46' }}>
                $650,000
              </Typography>
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: '#2E2C46' }}>
                $690,000
              </Typography>
              <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: '14px', color: '#2E2C46' }}>
                $11,500
              </Typography>
            </Box>

            {/* Bar */}
            <Box className="flex" sx={{ width: '100%', height: 16, borderRadius: '8px', overflow: 'hidden' }}>
              <Box sx={{ width: '48.1%', bgcolor: '#FF6800' }} />
              <Box sx={{ width: '51.1%', bgcolor: '#474DDD' }} />
              <Box sx={{ width: '0.8%', bgcolor: '#D08CFF' }} />
            </Box>

            {/* Legend */}
            <Box className="flex gap-[20px] items-center justify-end" sx={{ mt: '8px' }}>
              {[
                { color: '#FF6800', label: 'Principal - 50%' },
                { color: '#474DDD', label: 'Interest paid over tenure - 48%' },
                { color: '#D08CFF', label: 'Taxes & Fees - 2%' },
              ].map((item) => (
                <Box key={item.label} className="flex items-center gap-[8px]">
                  <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: item.color, flexShrink: 0 }} />
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#7F879E',
                      opacity: 0.7,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

/* ─── Slider Card Sub-component ─── */

function SliderCard({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  tickLabels,
  onChange,
}: {
  label: string
  value: number
  displayValue: string
  min: number
  max: number
  step: number
  tickLabels: string[]
  onChange: (v: number) => void
}) {
  return (
    <Box
      sx={{
        flex: 1,
        height: 193,
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        alignItems: 'center',
        justifyContent: 'center',
        px: '36px',
        border: '1px solid',
        borderColor: '#E5E5EC',
        borderRadius: '12px',
      }}
    >
      {/* Header */}
      <Box className="flex items-center justify-between" sx={{ width: '100%' }}>
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
              color: '#2E2C46',
              '& fieldset': { borderColor: '#E5E5EC' },
            },
          }}
        />
      </Box>

      {/* Slider + tick labels */}
      <Box className="flex flex-col gap-[16px]" sx={{ width: '100%' }}>
        <Slider
          value={value}
          onChange={(_, v) => onChange(v as number)}
          min={min}
          max={max}
          step={step}
          sx={{
            color: '#FF6800',
            height: 16,
            '& .MuiSlider-track': { borderRadius: '16px 4px 4px 16px' },
            '& .MuiSlider-rail': { bgcolor: '#FFF9F5', borderRadius: '2px 16px 16px 2px', opacity: 1 },
            '& .MuiSlider-thumb': {
              width: 4,
              height: 24,
              borderRadius: '2px',
              bgcolor: '#FF6800',
              '&:hover, &.Mui-active': { boxShadow: 'none' },
            },
          }}
        />
        <Box className="flex justify-between" sx={{ width: '100%' }}>
          {tickLabels.map((t) => (
            <Typography
              key={t}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: '#2E2C46',
                textAlign: 'center',
              }}
            >
              {t}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
