/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import React from 'react';

export default function input({ onSubmit, label, ...props }) {
  return (
    <Button variant="outlined" {...props}>
      {label}
    </Button>
  );
}
