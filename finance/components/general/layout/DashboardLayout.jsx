import Grid from '@mui/material/Unstable_Grid2';

export function DashboardLayout({ left, middle, right }) {
  return (
    <Grid
      container
      spacing={4}
      width={{
        xs: '100%',
        sm: '100%',
        md: '900px',
        lg: '1200px',
      }}
      sx={{ flexGrow: 1, m: 0, height: 0.1 }}
    >
      <Grid
        xs={3}
        display={{
          xs: 'none',
          sm: 'none',
          md: 'block',
        }}
      >
        {left}
      </Grid>
      <Grid
        width={{
          sm: '100%',
          xs: '100%',
          md: 'calc(100% * 6 / var(--Grid-columns))',
        }}
        xs={6}
        sx={{ p: 0, m: 0, height: '100%' }}
      >
        {middle}
      </Grid>
      <Grid
        xs={3}
        display={{
          xs: 'none',
          sm: 'none',
          md: 'block',
        }}
      >
        {right}
      </Grid>
    </Grid>
  );
}
