'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

export interface HeroSearchProps {
  placeholder?: string
  onSubmit: (query: string) => void
}

export default function HeroSearch({
  placeholder = 'Ask me anything about loans...',
  onSubmit,
}: HeroSearchProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = () => {
    if (query.trim()) {
      onSubmit(query.trim())
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '2px solid',
        borderColor: '#D08CFF',
        borderRadius: '12px',
        bgcolor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        height: 56,
        px: 4,
        width: '100%',
        maxWidth: 600,
      }}
    >
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        sx={{
          flex: 1,
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '16px',
          color: 'white',
          '& ::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 },
        }}
      />
      <IconButton
        onClick={handleSubmit}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: '8px',
          width: 40,
          height: 40,
          '&:hover': { bgcolor: '#3B41C4' },
        }}
      >
        <SearchIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  )
}
