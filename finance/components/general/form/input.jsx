/* eslint-disable react/jsx-props-no-spreading */
import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function input({
  name: _name,
  label,
  registerProps,
  watchNames = [],
  ...props
}) {
  const {
    register,
    validate,
    formState: { errors },
    watch,
    unregister,
  } = useFormContext();

  const { onChange, onBlur, name, ref } = register(_name, {
    ...validate,
    ...registerProps,
  });

  const watchedValues = watch(watchNames);

  useEffect(() => {
    if (!watchedValues) {
      unregister(name);
    } else {
      register(name);
    }
  }, [watchedValues, register, unregister]);

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
      fullWidth
      {...props}
    />
  );
}
