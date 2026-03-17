'use client'

import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'

interface DocItem {
  label: string
  description?: string
  fileName?: string
}

const INITIAL_DOCS: DocItem[] = [
  { label: "Passport / Driver's license / SSN", fileName: 'Passport. jpeg' },
  { label: 'Bank statements', description: 'Last 3 months', fileName: 'Nov 25-Jan 26 Bank Statements.pdf' },
  { label: 'W2 forms', description: 'Last 1 year', fileName: 'W2 2025.pdf' },
  { label: 'Employment proof' },
  { label: 'Home purchase agreement', fileName: 'HPA.png' },
]

export default function Step2UploadDocument() {
  const [docs, setDocs] = useState<DocItem[]>(INITIAL_DOCS)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  const handleUploadClick = (index: number) => {
    setUploadingIndex(index)
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && uploadingIndex !== null) {
      setDocs((prev) =>
        prev.map((d, i) => (i === uploadingIndex ? { ...d, fileName: file.name } : d))
      )
    }
    setUploadingIndex(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleRemove = (index: number) => {
    setDocs((prev) =>
      prev.map((d, i) => (i === index ? { ...d, fileName: undefined } : d))
    )
  }

  return (
    <Box className="flex flex-col gap-[12px]" sx={{ width: '100%' }}>
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />

      <Typography
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '24px',
          letterSpacing: '0.15px',
          color: '#2E2C46',
        }}
      >
        Upload the following documents
      </Typography>

      <Box className="flex flex-col gap-[4px]" sx={{ width: '100%' }}>
        {docs.map((doc, i) => {
          const isUploaded = !!doc.fileName
          return (
            <Box
              key={doc.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: 56,
                px: '16px',
                border: '1px solid',
                borderColor: '#E5E5EC',
                borderRadius: '8px',
              }}
            >
              {/* Icon */}
              {isUploaded ? (
                <CheckCircleIcon sx={{ fontSize: 16, color: '#16A41D', flexShrink: 0 }} />
              ) : (
                <DescriptionOutlinedIcon
                  sx={{ fontSize: 16, color: '#7F879E', flexShrink: 0, opacity: 0.5 }}
                />
              )}

              {/* Label + description */}
              <Box className="flex items-center gap-[5px]" sx={{ flex: 1, minWidth: 0 }}>
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
                  {doc.label}
                </Typography>
                {doc.description && (
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#7F879E',
                    }}
                  >
                    {doc.description}
                  </Typography>
                )}
              </Box>

              {/* Right: filename or upload button */}
              {isUploaded ? (
                <>
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#7F879E',
                      textDecoration: 'underline',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {doc.fileName}
                  </Typography>
                  <IconButton onClick={() => handleRemove(i)} size="small" sx={{ flexShrink: 0 }}>
                    <CloseIcon sx={{ fontSize: 12, color: '#7F879E' }} />
                  </IconButton>
                </>
              ) : (
                <Button
                  onClick={() => handleUploadClick(i)}
                  variant="text"
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    letterSpacing: '0.1px',
                    color: '#474DDD',
                    bgcolor: 'rgba(79, 91, 146, 0.08)',
                    textTransform: 'none',
                    borderRadius: '8px',
                    height: 32,
                    minWidth: 73,
                    flexShrink: 0,
                    px: '24px',
                  }}
                >
                  Upload
                </Button>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
