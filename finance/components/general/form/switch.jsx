/* eslint-disable react/jsx-props-no-spreading */
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function input({ name: _name, registerProps, label, ...props }) {
  const {
    register,
    validate,
    formState: { errors },
  } = useFormContext();

  const { onChange, onBlur, name, ref } = register(_name, {
    ...validate,
    ...registerProps,
  });

  const switchComponent = () => (
    <Switch
      label={label}
      aria-label={label}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      error={!!errors[name]}
      fullWidth={false}
      variant="outlined"
      {...props}
    />
  );

  return (
    <FormGroup>
      <FormControlLabel control={switchComponent()} label={label} />
    </FormGroup>
  );
}
