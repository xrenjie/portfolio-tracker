/* eslint-disable react/jsx-props-no-spreading */
import { ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

export default function input({ name: _name, children, ...props }) {
  const { control } = useFormContext();

  const { field } = useController({
    name: _name,
    control,
  });

  return (
    <div className="tw-h-16">
      <ToggleButtonGroup exclusive color="primary" {...field} {...props}>
        {children}
      </ToggleButtonGroup>
    </div>
  );
}
