'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

export interface DashboardTopBarProps {
  userName: string
  avatarUrl?: string
}

export default function DashboardTopBar({ userName, avatarUrl }: DashboardTopBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 62,
        px: 5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        width: '100%',
        flexShrink: 0,
      }}
    >
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
        {userName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 5, flex: 1, justifyContent: 'flex-end' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            height: 32,
            borderRight: '1px solid',
            borderColor: 'divider',
            pr: 5,
          }}
        >
          <IconButton size="small">
            <SettingsOutlinedIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
          </IconButton>
          <IconButton size="small">
            <NotificationsNoneIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
          </IconButton>
        </Box>
        <Avatar
          src={avatarUrl}
          sx={{ width: 40, height: 40 }}
        />
      </Box>
    </Box>
  )
}
