'use client'

import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

export interface NavigationRailProps {
  activeIndex: number
  onNavigate: (index: number) => void
}

interface NavItem {
  icon: ReactNode
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { icon: <HomeOutlinedIcon />, label: 'Dashboard' },
  { icon: <AccountBalanceOutlinedIcon />, label: 'Loans' },
  { icon: <DescriptionOutlinedIcon />, label: 'Documents' },
  { icon: <SettingsOutlinedIcon />, label: 'Settings' },
]

export default function NavigationRail({ activeIndex, onNavigate }: NavigationRailProps) {
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        py: 8,
        bgcolor: '#F8F9FD',
        borderRight: '1px solid',
        borderColor: 'divider',
        width: 80,
        alignSelf: 'stretch',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo placeholder */}
      <Box
        sx={{
          width: 23,
          height: 27,
          bgcolor: 'primary.main',
          borderRadius: '4px',
          flexShrink: 0,
        }}
      />

      {/* Navigation items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex
          return (
            <Box
              key={item.label}
              onClick={() => onNavigate(index)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: isActive ? '8px' : '1000px',
                bgcolor: isActive ? 'rgba(79, 91, 146, 0.16)' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: isActive ? 'rgba(79, 91, 146, 0.16)' : 'rgba(79, 91, 146, 0.08)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 24,
                  color: isActive ? 'primary.main' : 'text.secondary',
                },
              }}
            >
              {item.icon}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
