import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoginLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <CircularProgress sx={{ color: '#474DDD' }} />
    </Box>
  )
}
