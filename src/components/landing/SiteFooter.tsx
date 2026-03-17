'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

interface FooterLink {
  label: string
  href: string
}

interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}

export interface SiteFooterProps {
  brandDescription: string
  linkGroups: FooterLinkGroup[]
}

export default function SiteFooter({ brandDescription, linkGroups }: SiteFooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        py: 6,
        px: '94px',
        width: '100%',
      }}
    >
      {/* Top row: brand + link groups */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 496 }}>
          {/* Logo placeholder */}
          <Box
            sx={{
              width: 122,
              height: 28,
              bgcolor: 'primary.main',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                color: 'white',
              }}
            >
              LoanCorp
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '18px',
              color: 'text.secondary',
            }}
          >
            {brandDescription}
          </Typography>
        </Box>

        {/* Link groups */}
        <Box sx={{ display: 'flex', gap: '55px' }}>
          {linkGroups.map((group) => (
            <Box key={group.title} sx={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '24px',
                  color: 'text.primary',
                  textTransform: 'uppercase',
                }}
              >
                {group.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {group.links.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant="text"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      color: 'text.secondary',
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      p: 0,
                      minWidth: 'auto',
                      height: 'auto',
                      '&:hover': { bgcolor: 'transparent', color: 'text.primary' },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom divider + socials placeholder */}
      <Divider sx={{ borderColor: 'divider' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: 'text.secondary',
          }}
        >
          © {new Date().getFullYear()} LoanCorp. All rights reserved.
        </Typography>
        {/* Social icons placeholder */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['Twitter', 'LinkedIn', 'Facebook'].map((s) => (
            <Typography
              key={s}
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'text.primary' },
              }}
            >
              {s}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
