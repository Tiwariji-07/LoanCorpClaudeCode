'use client'

import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

interface LoanStat {
  icon: string
  label: string
}

interface LoanOption {
  icon: string
  title: string
  description: string
  stats: LoanStat[]
  featured?: boolean
}

const STATS: LoanStat[] = [
  { icon: '/icons/landing/stat-amount.png', label: 'Upto 75K' },
  { icon: '/icons/landing/stat-tenure.png', label: 'Till 5Y' },
  { icon: '/icons/landing/stat-rate.png', label: '8-10%' },
]

const LOAN_OPTIONS: LoanOption[] = [
  {
    icon: '/icons/landing/loan-consolidation.png',
    title: 'Loan Consolidation',
    description: 'Combine multiple loans into one simple payment and manage your finances.',
    stats: STATS,
  },
  {
    icon: '/icons/landing/home-improvement.png',
    title: 'Home Improvement',
    description: 'Upgrade your home without stretching your budget with flexible options.',
    stats: STATS,
    featured: true,
  },
  {
    icon: '/icons/landing/wedding.png',
    title: 'Wedding',
    description: 'Invest in your future with easy financing for education and skill-building.',
    stats: STATS,
  },
]

export default function FeaturesSection() {
  return (
    <Box
      component="section"
      className="flex flex-col items-center"
      sx={{ px: '94px', position: 'relative', zIndex: 1 }}
    >
      {/* Section header */}
      <Box className="flex flex-col items-center gap-[8px]" sx={{ pt: '72px', mb: 0, px: '206px', width: '100%' }}>
        <Box className="flex items-center justify-center gap-[4px]">
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#7F879E',
              textTransform: 'uppercase',
              letterSpacing: 0,
            }}
          >
            WHY LOAN CORP
          </Typography>
          <Image src="/icons/landing/why-us-icon.png" alt="" width={24} height={14} />
        </Box>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '44px',
            color: 'text.primary',
            textTransform: 'capitalize',
            textAlign: 'center',
          }}
        >
          Loans Tailored To Your Goals
        </Typography>
      </Box>

      {/* Loan option cards */}
      <Box
        className="flex items-center justify-center gap-[32px]"
        sx={{ width: '100%', height: 609, alignItems: 'center' }}
      >
        {LOAN_OPTIONS.map((option) => (
          <Box
            key={option.title}
            sx={{
              flex: 1,
              height: 351,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '52px',
              p: '32px',
              borderRadius: '12px',
              boxShadow: '0px 8px 35px 0px rgba(0,0,0,0.11)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' },
            }}
          >
            {/* Card background image from Figma */}
            <Image
              src="/icons/landing/card-bg.png"
              alt=""
              fill
              style={{ objectFit: 'cover', borderRadius: '12px', pointerEvents: 'none' }}
            />

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Icon from Figma — 60×60 */}
              <Image src={option.icon} alt={option.title} width={60} height={60} />

              <Box className="flex flex-col" sx={{ gap: option.featured ? '24px' : '32px' }}>
                <Box className="flex flex-col gap-[8px]">
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: '18px',
                      lineHeight: '24px',
                      letterSpacing: '0.15px',
                      color: 'text.primary',
                    }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: 'text.primary',
                    }}
                  >
                    {option.description}
                  </Typography>
                </Box>

                {/* Stats row with Figma icons */}
                <Box className="flex items-center gap-[16px]">
                  {option.stats.map((stat) => (
                    <Box key={stat.label} className="flex items-center gap-[4px]">
                      <Image src={stat.icon} alt="" width={14} height={14} />
                      <Typography
                        sx={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 400,
                          fontSize: '12px',
                          lineHeight: '18px',
                          color: 'text.primary',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Apply Now button */}
            <Button
              component={Link}
              href="/apply"
              variant="text"
              endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                position: 'relative',
                zIndex: 1,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.1px',
                color: option.featured ? 'primary.main' : '#7F879E',
                textTransform: 'none',
                borderRadius: '1000px',
                height: 40,
                width: 132,
                justifyContent: 'flex-start',
                pl: '12px',
                pr: '16px',
                gap: '8px',
              }}
            >
              Apply Now
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
