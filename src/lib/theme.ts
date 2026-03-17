import { createTheme } from '@mui/material/styles'

// Design tokens extracted from Figma file: LoanCorp-WM-AI
// Based on Material Design 3 (M3) token system

const theme = createTheme({
  palette: {
    primary: {
      main: '#474DDD',         // Figma: --schemes/primary
      contrastText: '#FFFFFF', // Figma: --schemes/on-primary
    },
    secondary: {
      main: '#FF6800',         // Figma: --schemes/secondary (orange, used for progress stops)
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#BA1A1A',         // M3 default — no explicit error token found in designs
    },
    warning: {
      main: '#FF6800',         // Aligned with secondary/orange accent
    },
    success: {
      main: '#16A41D',         // Figma: --schemes/tertiary (green)
      light: '#D8F3E1',        // Figma: --schemes/tertiary-container
    },
    background: {
      default: '#FAFAFB',      // Figma: --schemes/background
      paper: '#FFFFFF',        // Figma: --schemes/surface / surface-container-lowest
    },
    text: {
      primary: '#2E2C46',      // Figma: --schemes/on-surface (dashboard/landing)
      secondary: '#7F879E',    // Figma: --schemes/on-surface-variant (labels, muted text)
    },
    divider: '#E5E5EC',        // Figma: --schemes/outline
    action: {
      hover: 'rgba(79, 91, 146, 0.16)', // Figma: --state-layers/primary/opacity-16
    },
  },

  // Custom palette extensions available via theme.palette
  // surface-container-highest: #F8F9FD (used for sidebar, card inner backgrounds)
  // outline-variant: #F0F0F0 (used for subtle borders)
  // inverse-primary: #D08CFF (used for accent borders like search box)
  // surface-tint: #6750A4 (used for badge backgrounds)
  // on-surface alt: #1A1A1A (used in login/submission screens)
  // on-surface-variant alt: #4B4B4C (used in login/submission screens)

  typography: {
    fontFamily: '"DM Sans", "Inter", sans-serif', // Figma: primary font DM Sans, secondary Inter

    // M3/display/large — hero headings (landing page)
    h1: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '3.75rem',    // 60px
      fontWeight: 700,
      lineHeight: 1.3,        // 78px / 60px
      letterSpacing: '-0.25px',
    },

    // M3/headline/large — page titles, section headings
    h2: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '2.25rem',    // 36px
      fontWeight: 700,
      lineHeight: 1.222,      // 44px / 36px
      letterSpacing: 0,
    },

    // M3/headline/small — large data values (e.g. "$98,720")
    h3: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '1.5rem',     // 24px
      fontWeight: 400,
      lineHeight: 1.333,      // 32px / 24px
      letterSpacing: '-0.5px',
    },

    // M3/title/large — form section titles (e.g. "Login")
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.375rem',   // 22px
      fontWeight: 700,
      lineHeight: 1.273,      // 28px / 22px
      letterSpacing: 0,
    },

    // M3/title/medium — card titles (e.g. "Active loans (2)")
    h5: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '1.125rem',   // 18px
      fontWeight: 700,
      lineHeight: 1.333,      // 24px / 18px
      letterSpacing: '0.15px',
    },

    // M3/title/small — inline emphasis labels
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.429,      // 20px / 14px
      letterSpacing: '0.1px',
    },

    // M3/body/large — main paragraph text
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1rem',       // 16px
      fontWeight: 400,
      lineHeight: 1.5,        // 24px / 16px
      letterSpacing: 0,
    },

    // M3/body/medium — secondary text, descriptions
    body2: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '0.875rem',   // 14px
      fontWeight: 300,
      lineHeight: 1.429,      // 20px / 14px
      letterSpacing: 0,
    },

    // M3/label/large — button text, nav labels
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.429,      // 20px / 14px
      letterSpacing: '0.1px',
    },

    // M3/label/medium-prominent — section labels ("ACCOUNT HEALTH")
    subtitle2: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '0.75rem',    // 12px
      fontWeight: 600,
      lineHeight: 1.333,      // 16px / 12px
      letterSpacing: 0,
    },

    // M3/body/small — small body text, stats
    caption: {
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '0.75rem',    // 12px
      fontWeight: 400,
      lineHeight: 1.5,        // 18px / 12px
      letterSpacing: 0,
    },

    // M3/label/large — button label text
    button: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.429,      // 20px / 14px
      letterSpacing: '0.1px',
      textTransform: 'none' as const,
    },
  },

  shape: {
    borderRadius: 8,           // Figma: --corner/small (default for most elements)
  },

  spacing: 4,                  // Figma: base 4px grid (--spacing/1 = 4px)

  shadows: [
    'none',
    '0px 12px 100px 0px rgba(0,0,0,0.04)',   // elevation 1 — dashboard stat cards
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // elevation 2 — loan option cards
    '-2px 0px 100px 0px rgba(0,0,0,0.06)',    // elevation 3 — modal/overlay panels
    '0px 12px 100px 0px rgba(0,0,0,0.04)',    // 4
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 5
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 6
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 7
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 8
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 9
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 10
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 11
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 12
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 13
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 14
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 15
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 16
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 17
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 18
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 19
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 20
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 21
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 22
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 23
    '0px 8px 35px 0px rgba(0,0,0,0.11)',      // 24
  ] as unknown as typeof createTheme extends (o: infer O) => unknown
    ? O extends { shadows?: infer S } ? S : never
    : never,

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 500,
          fontFamily: '"DM Sans", "Inter", sans-serif',
          borderRadius: 8,       // Figma: --corner/small for most buttons
          letterSpacing: '0.1px',
        },
        containedPrimary: {
          borderRadius: 12,      // Figma: --corner/medium for filled login button
        },
        outlinedPrimary: {
          borderColor: '#474DDD',
          borderRadius: 8,       // Figma: --corner/small for outlined buttons
        },
        textPrimary: {
          color: '#474DDD',
          borderRadius: 12,      // Figma: --corner/medium for text buttons
        },
        sizeMedium: {
          height: 40,
          padding: '8px 24px',
        },
        sizeSmall: {
          height: 34,
          padding: '6px 24px',
          fontSize: '0.75rem',   // 12px for small dashboard buttons
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,     // Figma: --corner/small
            height: 56,          // Figma: text field height
            '& fieldset': {
              borderColor: '#E5E5EC', // Figma: --schemes/outline
              borderWidth: 1,
            },
          },
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 1 },
      styleOverrides: {
        root: {
          borderRadius: 12,      // Figma: --corner/medium
          boxShadow: '0px 12px 100px 0px rgba(0,0,0,0.04)',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,      // Figma: --corner/medium
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 120,     // Figma: pill-shaped badges
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: '0.5rem',    // 8px
          letterSpacing: '0.5px',
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 12,
          borderRadius: 8,       // Figma: --corner/small
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E5E5EC', // Figma: --schemes/outline
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 1000,    // Figma: --corner/full
        },
      },
    },
  },
})

export default theme
