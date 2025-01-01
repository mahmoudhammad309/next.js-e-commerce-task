'use client';

import React from 'react';
import { Stack, TextField, Typography, useTheme } from '@mui/material';

interface InputWithLabelProps {
    name: 'email' | 'password' | 'name' | 'confirmPassword';
    label: string;
  type?: string;
  data: { name: string; email: string; password: string; confirmPassword: string };
  setData: React.Dispatch<React.SetStateAction<{ name: string; email: string; password: string; confirmPassword: string }>>;
  placeholder?: string;
  error?: string;
  labelColor?: string;
  variant?: 
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'; 
  borderColor?: string;
  sx?: object;
  rows?: number; // Add rows for multiline inputs
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  name,
  type = 'text',
  data,
  setData,
  label,
  error,
  labelColor = 'text.primary',
  placeholder,
  variant = 'body1',
  borderColor,
  sx = {},
  rows,
}) => {
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,  // 'name' is now restricted to 'email' or 'password'
    }));
  };

  return (
    <Stack 
      position="relative" 
      gap="5px" 
      width="100%" 
      sx={{ marginBottom: error ? '25px' : 0, ...sx }}
    >
      {/* Label */}
      <Typography
        component="label"
        variant={variant}
        color={labelColor}
        sx={{ fontWeight: 400, mb: variant ? '10px' : '0' }}
        htmlFor={name}
      >
        {label}
      </Typography>

      {/* Input */}
      <TextField
        id={name}
        placeholder={placeholder || label}
        onChange={handleChange}
        value={data[name]}  // TypeScript now knows that name is either 'email' or 'password'
        type={type}
        sx={{
          width: '100%',
          borderRadius: '9px',
          '& .MuiInputBase-input': {
            padding: '12.5px 14px !important',
          },
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor || theme.palette.grey[300],
          },
          ...sx,
        }}
        multiline={type === 'textarea'}
        rows={type === 'textarea' && rows ? rows : undefined}
      />

      {/* Error Message */}
      {error && (
        <Typography
          component="span"
          variant="caption"
          sx={{
            fontWeight: 400,
            textAlign: 'end',
            color: '#E12C2C',
            textTransform: 'capitalize',
            position: 'absolute',
            bottom: '-25px',
            right: '0',
          }}
        >
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default InputWithLabel;
