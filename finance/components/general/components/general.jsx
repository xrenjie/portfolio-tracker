/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button } from '@mui/material';

export function MainButton({ children, ...props }) {
  return (
    <Button variant="contained" {...props}>
      {children}
    </Button>
  );
}
