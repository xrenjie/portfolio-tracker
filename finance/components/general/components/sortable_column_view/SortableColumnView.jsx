import { Box } from '@mui/material';
import React from 'react';
import { Column } from './ColumnViewColumn';
import { ColumnViewProvider } from './ColumnViewContext';
import { Header } from './ColumnViewHeader';

export function SortableColumnView({
  rows,
  sortConfig = {},
  buttonConfig = {},
  sortable = true,
  renderFn = () => {},
  title = '',
}) {
  return (
    <ColumnViewProvider rows={rows} sortConfig={sortConfig}>
      <Box
        sx={{
          borderLeft: '1px solid rgba(0,0,0,0.2)',
          borderRight: '1px solid rgba(0,0,0,0.2)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 0px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Header
          sortable={sortable}
          buttonConfig={buttonConfig}
          sortConfig={sortConfig}
          title={title}
        />
        <Column renderFn={renderFn} rows={rows} sortConfig={sortConfig} />
      </Box>
    </ColumnViewProvider>
  );
}
