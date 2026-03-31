'use client'

import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import XIcon from '@mui/icons-material/X'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'

interface LinkGroup {
  title: string
  links: string[]
}

const SOCIAL_ICONS = [
  { icon: <XIcon sx={{ fontSize: 18 }} />, label: 'Twitter' },
  { icon: <FacebookOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Facebook' },
  { icon: <InstagramIcon sx={{ fontSize: 18 }} />, label: 'Instagram' },
  { icon: <GitHubIcon sx={{ fontSize: 18 }} />, label: 'GitHub' },
]

const LINK_GROUPS: LinkGroup[] = [
  { title: 'Navigation', links: ['Personal', 'Business'] },
  { title: 'Help', links: ['Terms & Conditions', 'Privacy Policy'] },
  { title: 'Resources', links: ['Blogs'] },
]


export default function LandingFooter() {
  return (
    <Box
      component="footer"
      className="flex flex-col"
      sx={{ px: { xs: '20px', sm: '40px', md: '94px' }, pt: '52px', pb: '32px', gap: '52px' }}
    >
      {/* Top row — Figma: 234px gap between brand and nav columns */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'center', gap: { xs: '32px', md: '234px' } }}>
        {/* Brand info — Figma: flex-1 */}
        <Box className="flex flex-col gap-[8px]" sx={{ flex: 1 }}>
          <Image src="/icons/common/logo.png" alt="Loan Corp" width={122} height={28} />
          {/* Figma: DM Sans Light 14px, line-height 20px, #2E2C46, 66px height */}
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: '14px',
              lineHeight: '20px',
              color: 'text.primary',
              height: 66,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan
            porta lectus ridiculus in mattis. Netus sodales in volutpat
          </Typography>
        </Box>

        {/* Link groups — Figma: 522.25px wide, 55px gap between columns */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: { xs: '32px', md: '55px' }, width: { xs: '100%', md: 522 } }}>
          {LINK_GROUPS.map((group) => (
            <Box key={group.title} className="flex flex-col gap-[20px]" sx={{ flex: 1 }}>
              {/* Figma: DM Sans Bold 18px, #2E2C46 */}
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
                {group.title}
              </Typography>
              {/* Figma: links are text buttons, DM Sans Regular 12px, 10px gap, 40px height each */}
              <Box className="flex flex-col gap-[10px]">
                {group.links.map((link) => (
                  <Button
                    key={link}
                    variant="text"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                      color: 'text.primary',
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      borderRadius: '1000px',
                      height: 40,
                      pl: '12px',
                      minWidth: 'auto',
                    }}
                  >
                    {link}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Social icons — Figma: bottom-left, 150×22px row */}
      <Box className="flex items-center gap-[12px]" sx={{ width: 150 }}>
        {SOCIAL_ICONS.map((social) => (
          <IconButton
            key={social.label}
            size="small"
            aria-label={social.label}
            sx={{ color: 'text.primary', p: 0 }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  )
}
