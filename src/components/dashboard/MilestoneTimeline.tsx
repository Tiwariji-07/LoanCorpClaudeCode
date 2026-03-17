'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'

export interface Milestone {
  title: string
  description: string
  reward: string
  date: string
}

export interface MilestoneTimelineProps {
  milestones: Milestone[]
  onViewAll?: () => void
}

export default function MilestoneTimeline({ milestones, onViewAll }: MilestoneTimelineProps) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 5,
          pb: 4,
          px: 5,
        }}
      >
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
          Milestones with Loancorp
        </Typography>
        {onViewAll && (
          <Button
            variant="text"
            onClick={onViewAll}
            sx={{
              fontFamily: '"Roboto", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              color: 'primary.main',
              textTransform: 'none',
              borderRadius: '8px',
              height: 34,
            }}
          >
            View all milestones
          </Button>
        )}
      </Box>

      {/* Timeline line + milestone cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 6, pb: 5 }}>
        {/* Connector line */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            height: 70,
          }}
        >
          {/* Horizontal line */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 2,
              bgcolor: 'divider',
              transform: 'translateY(-50%)',
            }}
          />
          {/* Dots */}
          {milestones.map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: `${(i / (milestones.length - 1)) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: i <= milestones.length - 2 ? '#16A41D' : 'divider',
                border: '3px solid white',
                zIndex: 1,
              }}
            />
          ))}
        </Box>

        {/* Milestone items */}
        <Box sx={{ display: 'flex', gap: '144px', justifyContent: 'center' }}>
          {milestones.map((m) => (
            <Box
              key={m.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                flex: 1,
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
                  textAlign: 'center',
                }}
              >
                {m.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              >
                {m.description}
              </Typography>

              {/* Reward badge */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  mt: 2,
                }}
              >
                <EmojiEventsOutlinedIcon sx={{ fontSize: 20, color: '#FF6800' }} />
                <Typography
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  {m.reward}
                </Typography>
              </Box>

              {/* Date */}
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: 'text.primary',
                  textAlign: 'center',
                  mt: 4,
                }}
              >
                {m.date}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
