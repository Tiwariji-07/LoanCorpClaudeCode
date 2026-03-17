import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function ApplyLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '60vh',
      }}
    >
      <CircularProgress sx={{ color: '#474DDD' }} />
    </Box>
  )
}
