'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/stores/auth.store'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

const SIDEBAR_WIDTH = 80

const NAV_ITEMS = [
  { icon: '/icons/nav/dashboard.svg', href: '/dashboard', label: 'Dashboard' },
  { icon: '/icons/nav/loans.svg', href: '/loans', label: 'Loans' },
  { icon: '/icons/nav/documents.svg', href: '/apply', label: 'Apply' },
  { icon: '/icons/nav/settings.svg', href: '#', label: 'Settings' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8F9FD', pb: { xs: '64px', md: 0 } }}>
      {/* Sidebar — hidden on mobile, shown on md+ */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            bgcolor: '#F8F9FD',
            borderRight: '1px solid',
            borderColor: '#E5E5EC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
            py: '32px',
            overflow: 'hidden',
          },
        }}
      >
        <Image
          src="/icons/common/sidebar-icon.png"
          alt="LoanCorp"
          width={23}
          height={27}
          style={{ flexShrink: 0 }}
        />

        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            p: 0,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <ListItem key={item.href} disablePadding sx={{ width: 80, height: 56, justifyContent: 'center' }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isActive ? 72 : 56,
                    height: 56,
                    minWidth: 0,
                    mx: 'auto',
                    p: '4px',
                    borderRadius: isActive ? '8px' : '1000px',
                    bgcolor: isActive ? 'rgba(79, 91, 146, 0.16)' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive
                        ? 'rgba(79, 91, 146, 0.16)'
                        : 'rgba(79, 91, 146, 0.08)',
                    },
                  }}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={16}
                    height={16}
                    style={{
                      opacity: isActive ? 1 : 0.6,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>

      {/* Mobile bottom navigation */}
      <Box
        component="nav"
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          bgcolor: 'white',
          borderTop: '1px solid',
          borderColor: '#E5E5EC',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                flex: 1,
                height: '100%',
                minWidth: 0,
                p: 0,
                borderRadius: 0,
                bgcolor: 'transparent',
              }}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                style={{ opacity: isActive ? 1 : 0.5 }}
              />
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '10px',
                  color: isActive ? '#474DDD' : '#7F879E',
                }}
              >
                {item.label}
              </Typography>
            </ListItemButton>
          )
        })}
      </Box>

      {/* Main area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar — Figma: 62px, bottom border, 20px px */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: '#F8F9FD',
            borderBottom: '1px solid',
            borderColor: '#E5E5EC',
            height: 62,
          }}
        >
          <Toolbar
            sx={{
              height: 62,
              minHeight: '62px !important',
              px: '20px !important',
              justifyContent: 'space-between',
            }}
          >
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
              👋🏻 Welcome, {user?.name ?? 'User'}!
            </Typography>

            <Box className="flex items-center gap-[20px]">
              <Box
                className="flex items-center gap-[20px]"
                sx={{
                  height: 32,
                  borderRight: '1px solid',
                  borderColor: '#E5E5EC',
                  pr: '20px',
                }}
              >
                <IconButton size="small" sx={{ p: 0 }}>
                  <Image src="/icons/common/settings-gear.svg" alt="Settings" width={18} height={18} />
                </IconButton>
                <IconButton size="small" sx={{ p: 0 }}>
                  <Image src="/icons/common/notification-bell.svg" alt="Notifications" width={14} height={18} />
                </IconButton>
              </Box>
              <Image
                src="/icons/common/avatar.png"
                alt="User"
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            px: { xs: '12px', sm: '20px', md: '28px' },
            pt: { xs: '16px', md: '30px' },
            pb: { xs: '16px', md: '28px' },
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
