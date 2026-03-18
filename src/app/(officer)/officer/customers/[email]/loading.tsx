'use client'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function CustomerDetailLoading() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1304 }}>
      {/* Title */}
      <Box className="flex items-center justify-between" sx={{ mb: '24px' }}>
        <Skeleton variant="text" width={260} height={44} />
        <Skeleton variant="rounded" width={133} height={34} sx={{ borderRadius: '8px' }} />
      </Box>

      <Box className="flex gap-[5px]">
        {/* Left panel */}
        <Box className="flex flex-col" sx={{ width: 840, gap: '5px' }}>
          <Skeleton variant="rounded" width="100%" height={80} sx={{ borderRadius: '8px' }} />
          <Skeleton variant="rounded" width="100%" height={180} sx={{ borderRadius: '8px' }} />
          <Box className="flex gap-[5px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" sx={{ flex: 1, height: 117, borderRadius: '8px' }} />
            ))}
          </Box>
          <Skeleton variant="rounded" width="100%" height={260} sx={{ borderRadius: '8px' }} />
        </Box>

        {/* Right panel */}
        <Skeleton variant="rounded" width={467} height={640} sx={{ borderRadius: '8px' }} />
      </Box>
    </Box>
  )
}
