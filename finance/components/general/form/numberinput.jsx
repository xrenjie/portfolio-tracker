/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function numberinput({
  name: _name,
  registerProps,
  step = '1',
  min,
  max,
  label,
  ...props
}) {
  const {
    register,
    validate,
    formState: { errors },
  } = useFormContext();

  const { onChange, onBlur, name, ref } = register(_name, {
    ...validate,
    valueAsNumber: true,
    ...registerProps,
  });

  return (
    <TextField
      label={label}
      aria-label={label}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      inputProps={{ step, min, max }}
      fullWidth
      {...props}
    />
  );
}
