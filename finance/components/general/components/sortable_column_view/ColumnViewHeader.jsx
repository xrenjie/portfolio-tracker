import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useColumnViewContext } from './ColumnViewContext';

const headerStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem',
  borderSize: '1px',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
};

export function Header({ sortable, buttonConfig, title }) {
  const { user } = useUser();

  return (
    user && (
      <Box sx={headerStyle} className="tw-bg-gray-100">
        <Box
          display={{
            xs: 'none',
            sm: 'none',
            md: 'block',
          }}
        >
          {title}
        </Box>
        {sortable && <SortSelect />}
        {buttonConfig.length > 0 && (
          <HeaderButtons buttonConfig={buttonConfig} />
        )}
      </Box>
    )
  );
}

function HeaderButtons({ buttonConfig }) {
  const buttons = useButtons(buttonConfig);
  return buttons.map((b) => (
    <Button key={b.id} onClick={b.onClick} sx={b.sx} {...b}>
      {b.title}
    </Button>
  ));
}

const useButtons = (buttonConfig) => {
  const buttons = useMemo(() =>
    buttonConfig.map((button) => ({
      id: button.id,
      title: button.title,
      onClick: button.onClick,
      sx: button.sx,
      ...button,
    }))
  );

  return buttons;
};

function SortSelect() {
  const { sort, setSort, sortConfig } = useColumnViewContext();

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sort-select">Sort</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={sort}
        onChange={handleChange}
        label="Sort"
      >
        {sortConfig.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
