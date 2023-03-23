import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { DASHBOARDS, DASHBOARD_TITLES } from './constants';

export function LeftNav({ navState, setNav }) {
  const navs = useMemo(
    () =>
      Object.values(DASHBOARDS).map((nav) => {
        const active = navState === nav;
        return (
          <Box
            key={nav}
            sx={{
              background: active ? 'rgba(0,0,0,0.1)' : 'transparent',
              padding: '0.25rem',
              cursor: 'pointer',
            }}
            onClick={() => setNav(nav)}
          >
            {DASHBOARD_TITLES[nav]}
          </Box>
        );
      }),
    [navState, setNav]
  );
  return <Box>{navs}</Box>;
}
