import { FormControlLabel, Radio } from '@mui/material';
import React from 'react';

function radio({ label, value }) {
  return <FormControlLabel value={value} control={<Radio />} label={label} />;
}

export default radio;
