'use client'

import { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LoanStatusBadge from '@/components/officer/LoanStatusBadge'

/* ─── Metric cards data ─── */

interface MetricCard {
  label: string
  value: string
  unit?: string
  trend: string
  trendColor: string
  icon: string
  trendIcon: string
}

const METRICS: MetricCard[] = [
  {
    label: 'PENDING APPLICATIONS',
    value: '34',
    trend: '3 since last month',
    trendColor: '#16A41D',
    icon: '/icons/officer/metric-pending.png',
    trendIcon: '/icons/officer/trend-up.png',
  },
  {
    label: 'PENDING APPLICATIONS VALUE',
    value: '$3.96',
    unit: 'million',
    trend: '3 since last month',
    trendColor: '#16A41D',
    icon: '/icons/officer/metric-value.png',
    trendIcon: '/icons/officer/trend-up-green.png',
  },
  {
    label: 'APPROVED',
    value: '123',
    unit: 'Applications',
    trend: '1.6 since last month',
    trendColor: '#16A41D',
    icon: '/icons/officer/metric-approved.png',
    trendIcon: '/icons/officer/trend-up.png',
  },
  {
    label: 'REJECTED',
    value: '2',
    unit: 'Applications',
    trend: '1.6 since last month',
    trendColor: '#16A41D',
    icon: '/icons/officer/metric-rejected.png',
    trendIcon: '/icons/officer/trend-up.png',
  },
  {
    label: 'AWAITING DECISION',
    value: '11',
    trend: '6 require your action',
    trendColor: '#FF6800',
    icon: '/icons/officer/metric-awaiting.png',
    trendIcon: '',
  },
]

/* ─── Mock table data ─── */

interface LoanApplication {
  id: number
  applicant: string
  avatar: string
  submittedOn: string
  loanType: string
  loanAmount: string
  creditScore: number
  stage: string
}

const MOCK_ROWS: LoanApplication[] = [
  { id: 1, applicant: 'John Doe',  avatar: '/icons/officer/avatar-1.png', submittedOn: '25/02/2026', loanType: 'Personal', loanAmount: '$24,000', creditScore: 712, stage: 'Pending' },
  { id: 2, applicant: 'J Draper',  avatar: '/icons/officer/avatar-2.png', submittedOn: '22/02/2026', loanType: 'Auto',     loanAmount: '$50,000', creditScore: 798, stage: 'Awaiting Decision' },
  { id: 3, applicant: 'John Doe',  avatar: '/icons/officer/avatar-1.png', submittedOn: '25/02/2026', loanType: 'Personal', loanAmount: '$24,000', creditScore: 712, stage: 'Approved' },
  { id: 4, applicant: 'J Draper',  avatar: '/icons/officer/avatar-2.png', submittedOn: '22/02/2026', loanType: 'Auto',     loanAmount: '$50,000', creditScore: 798, stage: 'Approved' },
  { id: 5, applicant: 'John Doe',  avatar: '/icons/officer/avatar-1.png', submittedOn: '25/02/2026', loanType: 'Personal', loanAmount: '$24,000', creditScore: 712, stage: 'Rejected' },
  { id: 6, applicant: 'J Draper',  avatar: '/icons/officer/avatar-2.png', submittedOn: '22/02/2026', loanType: 'Auto',     loanAmount: '$50,000', creditScore: 798, stage: 'Pending' },
  { id: 7, applicant: 'John Doe',  avatar: '/icons/officer/avatar-1.png', submittedOn: '25/02/2026', loanType: 'Personal', loanAmount: '$24,000', creditScore: 712, stage: 'Rejected' },
]

/* ─── Shared text styles ─── */

const headerCellSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  color: '#7F879E',
  borderBottom: '1px solid #E5E5EC',
  py: '20px',
}

const bodyCellSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#2E2C46',
  borderBottom: '1px solid #F0F0F0',
  py: '12px',
}

export default function OfficerDashboardPage() {
  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('All Stages')

  const filtered = MOCK_ROWS.filter((row) => {
    const matchSearch =
      !search ||
      row.applicant.toLowerCase().includes(search.toLowerCase()) ||
      row.loanType.toLowerCase().includes(search.toLowerCase()) ||
      row.stage.toLowerCase().includes(search.toLowerCase())
    const matchStage = stageFilter === 'All Stages' || row.stage === stageFilter
    return matchSearch && matchStage
  })

  return (
    <Box sx={{ width: '100%', maxWidth: 1304 }}>
      {/* Title row */}
      <Box className="flex items-center justify-between" sx={{ mb: '24px' }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '44px',
            color: '#2E2C46',
          }}
        >
          Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            letterSpacing: '0.1px',
            bgcolor: '#474DDD',
            color: 'white',
            textTransform: 'none',
            borderRadius: '8px',
            height: 34,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none', bgcolor: '#3B41C4' },
          }}
        >
          Ask Lex Anything
        </Button>
      </Box>

      {/* ─── Metrics Row ─── */}
      <Box className="flex gap-[5px]" sx={{ mb: '6px' }}>
        {METRICS.map((metric) => (
          <Box
            key={metric.label}
            sx={{
              flex: 1,
              height: 117,
              bgcolor: 'white',
              borderRadius: '8px',
              border: '1px solid #F0F0F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: '20px',
              py: '12px',
            }}
          >
            {/* Left: label + value + trend */}
            <Box className="flex flex-col" sx={{ gap: '13px' }}>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: '10px',
                  lineHeight: '16px',
                  color: '#7F879E',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {metric.label}
              </Typography>
              <Box className="flex flex-col" sx={{ gap: '12px' }}>
                <Box className="flex items-baseline gap-[4px]">
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: '28px',
                      lineHeight: '36px',
                      color: '#2E2C46',
                    }}
                  >
                    {metric.value}
                  </Typography>
                  {metric.unit && (
                    <Typography
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 500,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#7F879E',
                      }}
                    >
                      {metric.unit}
                    </Typography>
                  )}
                </Box>
                <Box className="flex items-center gap-[8px]">
                  {metric.trendIcon && (
                    <Image src={metric.trendIcon} alt="" width={16} height={16} />
                  )}
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: '10px',
                      lineHeight: '16px',
                      color: metric.trendColor,
                    }}
                  >
                    {metric.trend}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: icon */}
            <Image src={metric.icon} alt="" width={24} height={24} />
          </Box>
        ))}
      </Box>

      {/* ─── Table Section ─── */}
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '8px',
          border: '1px solid #F0F0F0',
          overflow: 'hidden',
        }}
      >
        {/* Search + Filter bar */}
        <Box className="flex items-center justify-between" sx={{ px: '30px', pt: '24px', pb: '11px' }}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, loan type, or stage"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: '#7F879E' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: 450,
              '& .MuiOutlinedInput-root': {
                height: 40,
                borderRadius: '8px',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '14px',
                '& fieldset': { borderColor: '#E5E5EC' },
                '& input::placeholder': { color: '#7F879E', opacity: 1 },
              },
            }}
          />
          <Select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            size="small"
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              width: 138,
              height: 40,
              borderRadius: '8px',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '14px',
              color: '#2E2C46',
              '& fieldset': { borderColor: '#E5E5EC' },
            }}
          >
            <MenuItem value="All Stages">All Stages</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Awaiting Decision">Awaiting Decision</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...headerCellSx, pl: '30px', width: 171 }}>Applicant</TableCell>
                <TableCell sx={headerCellSx}>Submitted on</TableCell>
                <TableCell sx={headerCellSx}>Loan type</TableCell>
                <TableCell sx={headerCellSx}>Loan amount</TableCell>
                <TableCell sx={headerCellSx}>Credit score</TableCell>
                <TableCell sx={headerCellSx}>Stage</TableCell>
                <TableCell sx={{ ...headerCellSx, pr: '30px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id} sx={{ '&:hover': { bgcolor: '#FAFAFB' } }}>
                  <TableCell sx={{ ...bodyCellSx, pl: '30px' }}>
                    <Box className="flex items-center gap-[12px]">
                      <Image
                        src={row.avatar}
                        alt={row.applicant}
                        width={36}
                        height={36}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <Typography
                        sx={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 500,
                          fontSize: '14px',
                          color: '#2E2C46',
                        }}
                      >
                        {row.applicant}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={bodyCellSx}>{row.submittedOn}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, fontWeight: 500 }}>{row.loanType}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, fontWeight: 600 }}>{row.loanAmount}</TableCell>
                  <TableCell sx={bodyCellSx}>{row.creditScore}</TableCell>
                  <TableCell sx={bodyCellSx}>
                    <LoanStatusBadge status={row.stage} />
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, pr: '30px' }}>
                    <IconButton size="small" sx={{ color: '#7F879E' }}>
                      <MoreVertIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          className="flex items-center justify-between"
          sx={{
            px: '50px',
            height: 40,
            borderTop: '1px solid #F0F0F0',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              color: '#7F879E',
            }}
          >
            1–{String(filtered.length).padStart(2, '0')} of 97
          </Typography>
          <Box className="flex items-center gap-[8px]">
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                color: '#7F879E',
              }}
            >
              Rows per page: {String(filtered.length).padStart(2, '0')}
            </Typography>
            <IconButton size="small" disabled sx={{ color: '#7F879E' }}>
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                color: '#2E2C46',
              }}
            >
              1/12
            </Typography>
            <IconButton size="small" sx={{ color: '#7F879E' }}>
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
