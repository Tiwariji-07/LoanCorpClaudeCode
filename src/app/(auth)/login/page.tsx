'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { wmLogin } from '@/lib/api/auth'
import { useAuthStore } from '@/stores/auth.store'

export default function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password')
      return
    }

    setLoading(true)
    setError('')

    try {
      const userInfo = await wmLogin(username, password)
      const roleName = userInfo.userRoles?.[0] ?? 'CUSTOMER'

      setAuth(
        {
          id: userInfo.userId ?? userInfo.userName,
          name: userInfo.userName,
          email: userInfo.userId ?? userInfo.userName,
        },
        {
          id: roleName === 'APPROVER' ? 1 : 2,
          name: roleName,
          displayName: roleName === 'APPROVER' ? 'Approver' : 'Customer',
        },
      )

      // Route based on role
      if (roleName === 'APPROVER') {
        router.push('/officer/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (err: unknown) {
      const msg = (err as Error)?.message
      if (msg === 'Invalid credentials') {
        setError('Invalid username or password')
      } else {
        setError('Unable to connect to server. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <Box className="flex items-start" sx={{ minHeight: '100vh', width: '100%' }}>
      {/* ── Left panel: hero with background image ── */}
      <Box
        sx={{
          width: 886,
          height: '100vh',
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'center',
          px: '180px',
        }}
      >
        {/* Background image from Figma */}
        <Image
          src="/icons/login/hero-bg.png"
          alt=""
          fill
          style={{ objectFit: 'cover', pointerEvents: 'none' }}
          priority
        />

        {/* Smart Financing badge */}
        <Box
          className="flex items-center gap-[12px]"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Image src="/icons/login/smart-icon.png" alt="" width={42} height={42} />
          <Image src="/icons/login/smart-text.png" alt="Smart Financing" width={133} height={11} />
        </Box>

        {/* Headline */}
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '44px',
                color: '#1A1A1A',
                textTransform: 'capitalize',
              }}
            >
              Simplifying Smart Financing
            </Typography>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: '36px',
                lineHeight: '44px',
                color: '#1A1A1A',
                textTransform: 'capitalize',
              }}
            >
              For Every Need
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#4B4B4C',
              maxWidth: 503,
            }}
          >
            From personal loans to business needs, our range of financial solutions is designed to
            simplify borrowing.
          </Typography>
        </Box>
      </Box>

      {/* ── Right panel: login form ── */}
      <Box
        sx={{
          width: 554,
          flexShrink: 0,
          alignSelf: 'stretch',
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          justifyContent: 'center',
          px: '56px',
        }}
      >
        {/* Logo + title */}
        <Box className="flex flex-col gap-[12px] items-start" sx={{ width: '100%' }}>
          <Image src="/icons/login/logo-right.png" alt="Loan Corp" width={122} height={28} />
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '28px',
              color: '#1A1A1A',
            }}
          >
            Login
          </Typography>
        </Box>

        {/* Error alert */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError('')}
            sx={{ width: '100%', fontFamily: '"DM Sans", sans-serif' }}
          >
            {error}
          </Alert>
        )}

        {/* Form fields */}
        <Box className="flex flex-col gap-[24px] items-start" sx={{ width: '100%' }}>
          {/* Username */}
          <TextField
            fullWidth
            placeholder="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoComplete="username"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 56,
                borderRadius: '8px',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                '& fieldset': { borderColor: '#E5E5EC', borderWidth: 1 },
                '& input::placeholder': { color: '#7F879E', opacity: 1 },
              },
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            placeholder="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoComplete="current-password"
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 56,
                borderRadius: '8px',
                fontFamily: '"Inter", sans-serif',
                fontSize: '16px',
                '& fieldset': { borderColor: '#E5E5EC', borderWidth: 1 },
                '& input::placeholder': { color: '#7F879E', opacity: 1 },
              },
            }}
          />

          {/* Remember me + Forgot password row */}
          <Box className="flex items-center justify-between" sx={{ width: '100%' }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  sx={{
                    color: '#7F879E',
                    '&.Mui-checked': { color: '#474DDD' },
                    p: '4px',
                  }}
                />
              }
              label="Remember me"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#2E2C46',
                },
              }}
            />
            <Button
              variant="text"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: '#474DDD',
                textTransform: 'none',
                borderRadius: '12px',
                height: 32,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Forgot password?
            </Button>
          </Box>
        </Box>

        {/* CTA + sign up */}
        <Box className="flex flex-col gap-[12px] items-start" sx={{ width: '100%' }}>
          {/* Login button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : undefined}
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.1px',
              bgcolor: '#474DDD',
              color: 'white',
              textTransform: 'none',
              borderRadius: '12px',
              height: 48,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
            }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </Button>

          {/* Sign up link */}
          <Box className="flex items-center justify-center gap-[8px]" sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#2E2C46',
              }}
            >
              Dont have an account?
            </Typography>
            <Button
              component={Link}
              href="#"
              variant="text"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.1px',
                color: '#474DDD',
                textTransform: 'none',
                borderRadius: '12px',
                height: 32,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
