/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export default function input({
  name: _name,
  choices,
  label,
  registerProps,
  ...props
}) {
  const {
    register,
    validate,
    formState: { errors },
  } = useFormContext();

  const { onChange, onBlur, name, ref } = register(_name, {
    ...validate,
    ...registerProps,
  });

  const selectChoices = useMemo(
    () =>
      choices.map((choice) => (
        <MenuItem key={choice.id} value={choice.id}>
          {choice.text}
        </MenuItem>
      )),
    [choices]
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        aria-label={label}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        fullWidth
        {...props}
      >
        {selectChoices}
      </Select>
    </FormControl>
  );
}
