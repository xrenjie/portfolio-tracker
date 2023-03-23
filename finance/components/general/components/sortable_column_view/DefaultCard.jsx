import { Box } from '@mui/material';
import React from 'react';

export function DefaultCard({ row }) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        flex: 1,
        flexDirection: 'column',
        padding: '0.25rem',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box>{JSON.stringify(row)}</Box>
      </Box>
    </Box>
  );
}
