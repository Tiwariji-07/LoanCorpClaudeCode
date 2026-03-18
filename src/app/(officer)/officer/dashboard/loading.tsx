'use client'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function OfficerDashboardLoading() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1304 }}>
      {/* Title skeleton */}
      <Box className="flex items-center justify-between" sx={{ mb: '24px' }}>
        <Skeleton variant="text" width={220} height={44} />
        <Skeleton variant="rounded" width={133} height={34} sx={{ borderRadius: '8px' }} />
      </Box>

      {/* Metrics row skeleton */}
      <Box className="flex gap-[5px]" sx={{ mb: '6px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            sx={{ flex: 1, height: 117, borderRadius: '8px' }}
          />
        ))}
      </Box>

      {/* Table skeleton */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '8px',
          border: '1px solid #F0F0F0',
          overflow: 'hidden',
        }}
      >
        {/* Search bar skeleton */}
        <Box className="flex items-center justify-between" sx={{ px: '30px', pt: '24px', pb: '11px' }}>
          <Skeleton variant="rounded" width={450} height={40} sx={{ borderRadius: '8px' }} />
          <Skeleton variant="rounded" width={138} height={40} sx={{ borderRadius: '8px' }} />
        </Box>

        {/* Header row */}
        <Box sx={{ px: '30px', py: '16px', borderBottom: '1px solid #E5E5EC' }}>
          <Box className="flex gap-[24px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} variant="text" width={100} height={16} sx={{ flex: 1 }} />
            ))}
          </Box>
        </Box>

        {/* 5 data rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            className="flex items-center gap-[24px]"
            sx={{ px: '30px', py: '10px', borderBottom: '1px solid #F0F0F0' }}
          >
            <Box className="flex items-center gap-[12px]" sx={{ flex: 1 }}>
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="text" width={80} height={20} />
            </Box>
            <Skeleton variant="text" width={80} height={20} sx={{ flex: 1 }} />
            <Skeleton variant="text" width={60} height={20} sx={{ flex: 1 }} />
            <Skeleton variant="text" width={70} height={20} sx={{ flex: 1 }} />
            <Skeleton variant="text" width={40} height={20} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" width={90} height={24} sx={{ flex: 1, borderRadius: '1000px' }} />
            <Skeleton variant="circular" width={20} height={20} />
          </Box>
        ))}

        {/* Pagination skeleton */}
        <Box className="flex items-center justify-between" sx={{ px: '50px', height: 40 }}>
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={180} height={16} />
        </Box>
      </Box>
    </Box>
  )
}
