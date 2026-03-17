'use client'

import { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function HeroSection() {
  const [query, setQuery] = useState('')

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      {/* Decorative gradient wave background — spans hero + features */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(71,77,221,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(208,140,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 40%, rgba(71,77,221,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero content — Figma px: 282px horizontal, no top gap above social proof */}
      <Box
        className="flex flex-col items-center"
        sx={{ position: 'relative', zIndex: 1, px: '282px' }}
      >
        {/* Social proof badge */}
        <Box className="flex items-center justify-center gap-[10px]" sx={{ pt: '24px', mb: '24px' }}>
          <Image src="/icons/landing/customer-icon.png" alt="Customers" width={58} height={30} />
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: 'text.primary',
            }}
          >
            5 million + customers served
          </Typography>
        </Box>

        {/* Main Heading — Figma: 60px Bold, -0.25 tracking, 78px line-height */}
        <Box className="flex flex-col items-center" sx={{ height: 178, justifyContent: 'center', mb: '12px', width: '100%' }}>
          <Box className="flex items-center justify-between" sx={{ width: '100%' }}>
            <Typography
              component="span"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: '60px',
                lineHeight: '78px',
                letterSpacing: '-0.25px',
                color: 'text.primary',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Simplifying Smart
            </Typography>
            <Image src="/icons/landing/subheading-icon.png" alt="" width={61} height={58} style={{ flexShrink: 0 }} />
            <Typography
              component="span"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: '60px',
                lineHeight: '78px',
                letterSpacing: '-0.25px',
                color: 'text.primary',
                textAlign: 'center',
                flex: 1,
              }}
            >
              Financing
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: '60px',
              lineHeight: '78px',
              letterSpacing: '-0.25px',
              color: 'text.primary',
              textAlign: 'center',
              width: '100%',
            }}
          >
            for Every Need
          </Typography>
        </Box>

        {/* Subheadline — Figma: DM Sans Light 14px, #7F879E, 574px max, 40px tall */}
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#7F879E',
            textAlign: 'center',
            width: 574,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: '36px',
          }}
        >
          From personal loans to business needs, our complete range of financial solutions is
          designed to simplify borrowing and put you in control.
        </Typography>

        {/* AI Search Box — Figma: #FAFAFB bg, 2px #D08CFF border, 12px radius, 16px padding, 42px inner gap */}
        <Box
          sx={{
            width: '100%',
            bgcolor: '#FAFAFB',
            border: '2px solid',
            borderColor: '#D08CFF',
            borderRadius: '12px',
            p: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '42px',
          }}
        >
          {/* Search input row */}
          <Box className="flex items-center gap-[8px]">
            <Image src="/icons/landing/search-icon.png" alt="" width={17} height={20} style={{ flexShrink: 0 }} />
            <Box
              sx={{
                width: 0,
                height: 22,
                borderLeft: '1px solid',
                borderColor: '#2E2C46',
                flexShrink: 0,
              }}
            />
            <InputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How can I help you today ?"
              sx={{
                flex: 1,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#2E2C46',
                '& ::placeholder': { color: '#2E2C46', opacity: 1 },
              }}
            />
          </Box>

          {/* Submit button — Figma: 38px filled circle, primary bg, white arrow */}
          <Box className="flex items-center justify-end" sx={{ px: '10px' }}>
            <IconButton
              sx={{
                width: 38,
                height: 38,
                bgcolor: 'primary.main',
                borderRadius: '1000px',
                '&:hover': { bgcolor: '#3B41C4' },
              }}
            >
              <ArrowForwardIcon sx={{ fontSize: 14, color: 'white' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
