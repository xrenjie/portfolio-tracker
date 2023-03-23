/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function input({ onSubmit, label, ...props }) {
  const { handleSubmit } = useFormContext();

  return (
    <Button onClick={handleSubmit(onSubmit)} {...props}>
      {label}
    </Button>
  );
}
