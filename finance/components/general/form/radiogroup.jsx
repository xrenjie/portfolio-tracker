/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, RadioGroup } from '@mui/material';
import React from 'react';
import { useFormContext, useController } from 'react-hook-form';

export default function input({ name: _name, children, label }) {
  const { control } = useFormContext();
  const { field } = useController({
    name: _name,
    control,
  });

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...field}>{children}</RadioGroup>
    </FormControl>
  );
}
