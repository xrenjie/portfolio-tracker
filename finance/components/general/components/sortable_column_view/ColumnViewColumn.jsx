import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useColumnViewContext } from './ColumnViewContext';
import { DefaultCard } from './DefaultCard';

const useSortRows = (rows, sortConfigMap, sort) => {
  const sortedRows = useMemo(() => {
    const sorted = [...rows];
    const sortFn = sortConfigMap[sort].sortFn || (() => 0);
    sorted.sort(sortFn);
    return sorted;
  }, [sort, rows, sortConfigMap]);

  return sortedRows;
};

const defaultView = (sortedRows) =>
  sortedRows.map(({ date, children }) => (
    <Box key={date} sx={{}}>
      <Box
        sx={{
          fontSize: '0.75rem',
          fontWeight: 'bold',
          padding: '0.25rem',
          borderBottom: '1px solid rgba(0,0,0,0.2)',
          boxShadow: '0px 0px 2px rgba(0,0,0,0.2)',
          background: 'rgba(0,0,0,0.1)',
        }}
      >
        {date}
      </Box>
      {children.map((expense) => (
        <DefaultCard key={expense.id} expense={expense} />
      ))}
    </Box>
  ));

export function Column({ rows, renderFn }) {
  const { sort, sortConfigMap, sortConfig } = useColumnViewContext();
  const sortedRows = useSortRows(rows, sortConfigMap, sort);

  const display = () => {
    if (renderFn) return renderFn({ rows: sortedRows, sort, sortConfig });
    return defaultView(sortedRows);
  };

  return (
    sortedRows && <Box sx={{ overflow: 'auto', flexGrow: 1 }}>{display()}</Box>
  );
}
