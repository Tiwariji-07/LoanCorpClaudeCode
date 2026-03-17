'use client'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

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

export default function Step1PersonalDetails() {
  return (
    <Box className="flex flex-col gap-[44px]" sx={{ width: '100%' }}>
      {/* Row 1: First Name + Last Name */}
      <Box className="flex gap-[32px] items-center justify-center" sx={{ width: '100%' }}>
        <TextField fullWidth placeholder="First Name" variant="outlined" sx={{ flex: 1, ...fieldSx }} />
        <TextField fullWidth placeholder="Last Name" variant="outlined" sx={{ flex: 1, ...fieldSx }} />
      </Box>

      {/* Row 2: Date of birth + SSN */}
      <Box className="flex gap-[32px] items-start justify-center" sx={{ width: '100%' }}>
        <TextField
          fullWidth
          placeholder="Date of birth"
          type="date"
          variant="outlined"
          helperText="You must be 18 years or older"
          InputLabelProps={{ shrink: true }}
          sx={{
            flex: 1,
            ...fieldSx,
            '& .MuiFormHelperText-root': helperSx,
          }}
          inputProps={{ placeholder: 'Date of birth' }}
        />
        <TextField
          fullWidth
          placeholder="Social Security Number"
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
          variant="outlined"
          sx={{ flex: 1, ...fieldSx }}
        />
        <TextField
          fullWidth
          placeholder="Mobile number"
          type="tel"
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
          variant="outlined"
          sx={{ flex: 1, ...fieldSx }}
        />
        <Box className="flex gap-[20px] items-center" sx={{ width: 400, flexShrink: 0 }}>
          <TextField
            fullWidth
            placeholder="Area Code"
            variant="outlined"
            sx={{ flex: 1, ...fieldSx }}
          />
          <TextField
            fullWidth
            select
            defaultValue=""
            variant="outlined"
            sx={{
              flex: 1,
              ...fieldSx,
              '& .MuiSelect-select': {
                color: '#7F879E',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '16px',
              },
            }}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="" disabled>
              State
            </MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
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
