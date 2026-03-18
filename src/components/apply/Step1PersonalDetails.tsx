'use client'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import { usePersonControllerFindPersons } from '@/lib/api/generated/person-controller/person-controller'
import { useAuthStore } from '@/stores/auth.store'
import type { Person } from '@/types/api/person'

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    height: 56,
    borderRadius: '8px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '16px',
    '& fieldset': { borderColor: '#E5E5EC', borderWidth: 1 },
    '& input::placeholder, & .MuiSelect-select': {
      color: '#7F879E',
      opacity: 1,
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '16px',
    },
  },
}

const helperSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: '#7F879E',
}

function parseAddress(address?: string) {
  if (!address) return { street: '', areaCode: '', state: '' }
  // Try to extract parts from comma-separated address
  const parts = address.split(',').map((p) => p.trim())
  if (parts.length >= 3) {
    return { street: parts.slice(0, -2).join(', '), areaCode: parts[parts.length - 2], state: parts[parts.length - 1] }
  }
  if (parts.length === 2) {
    return { street: parts[0], areaCode: '', state: parts[1] }
  }
  return { street: address, areaCode: '', state: '' }
}

export default function Step1PersonalDetails() {
  const userEmail = useAuthStore((s) => s.user?.email)

  const { data: personPage, isLoading } = usePersonControllerFindPersons(
    { q: `email='${userEmail}'`, page: 1, size: 1 },
    { query: { enabled: !!userEmail } }
  ) as { data: { content?: Person[] } | undefined; isLoading: boolean }

  const person: Person | undefined = (personPage as { content?: Person[] })?.content?.[0]
  const addr = parseAddress(person?.address)

  if (isLoading) {
    return (
      <Box className="flex flex-col gap-[44px]" sx={{ width: '100%' }}>
        {[1, 2, 3, 4].map((r) => (
          <Box key={r} className="flex gap-[32px]" sx={{ width: '100%' }}>
            <Skeleton variant="rounded" height={56} sx={{ flex: 1, borderRadius: '8px' }} />
            <Skeleton variant="rounded" height={56} sx={{ flex: 1, borderRadius: '8px' }} />
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Box className="flex flex-col gap-[44px]" sx={{ width: '100%' }}>
      {/* Row 1: First Name + Last Name */}
      <Box className="flex gap-[32px] items-center justify-center" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="First Name"
          defaultValue={person?.firstName ?? ''}
          variant="outlined"
          sx={{ flex: 1, ...fieldSx }}
        />
        <TextField
          fullWidth
          placeholder="Last Name"
          defaultValue={person?.lastName ?? ''}
          variant="outlined"
          sx={{ flex: 1, ...fieldSx }}
        />
      </Box>

      {/* Row 2: Date of birth + SSN */}
      <Box className="flex gap-[32px] items-start justify-center" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="Date of birth"
          type="date"
          defaultValue={person?.dob ?? ''}
          variant="outlined"
          helperText="You must be 18 years or older"
          InputLabelProps={{ shrink: true }}
          sx={{
            flex: 1,
            ...fieldSx,
            '& .MuiFormHelperText-root': helperSx,
          }}
        />
        <TextField
          fullWidth
          placeholder="Social Security Number"
          defaultValue={person?.socialSecurityNumber ?? ''}
          variant="outlined"
          sx={{ flex: 1, ...fieldSx }}
        />
      </Box>

      {/* Row 3: Email + Mobile */}
      <Box className="flex gap-[32px] items-start justify-center" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="Email address"
          type="email"
          defaultValue={person?.email ?? ''}
          variant="outlined"
          InputProps={{ readOnly: !!person?.email }}
          sx={{ flex: 1, ...fieldSx }}
        />
        <TextField
          fullWidth
          placeholder="Mobile number"
          type="tel"
          defaultValue={person?.phoneNumber ?? ''}
          variant="outlined"
          helperText="We will use this to contact you"
          sx={{
            flex: 1,
            ...fieldSx,
            '& .MuiFormHelperText-root': helperSx,
          }}
        />
      </Box>

      {/* Row 4: Address + Area Code + State */}
      <Box className="flex gap-[32px] items-center justify-center" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="Address"
          defaultValue={addr.street}
          variant="outlined"
          sx={{ flex: 1, ...fieldSx }}
        />
        <Box className="flex gap-[20px] items-center" sx={{ width: 400, flexShrink: 0 }}>
          <TextField
            fullWidth
            placeholder="Area Code"
            defaultValue={addr.areaCode}
            variant="outlined"
            sx={{ flex: 1, ...fieldSx }}
          />
          <TextField
            fullWidth
            select
            defaultValue={addr.state || ''}
            variant="outlined"
            sx={{
              flex: 1,
              ...fieldSx,
              '& .MuiSelect-select': {
                color: addr.state ? '#2E2C46' : '#7F879E',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '16px',
              },
            }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="" disabled>
              State
            </MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
            <MenuItem value="Ohio">Ohio</MenuItem>
            <MenuItem value="New York">New York</MenuItem>
            <MenuItem value="California">California</MenuItem>
            <MenuItem value="Texas">Texas</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* Map placeholder */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '832 / 295',
          bgcolor: '#E8E8EE',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95688.21!2d-81.76!3d41.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830ef2ee3686b2d%3A0xed04cb55f7621842!2sCleveland%2C%20OH!5e0!3m2!1sen!2sus"
          sx={{
            width: '100%',
            height: '100%',
            border: 0,
            borderRadius: '8px',
          }}
          loading="lazy"
          title="Address map"
        />
      </Box>
    </Box>
  )
}
