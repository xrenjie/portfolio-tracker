import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head';
import React, { useCallback, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const drawerWidth = 240;

export function NavbarLayout({ children }) {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getNavItems = useCallback(() => {
    const navItems = [
      {
        key: 'home',
        text: 'Home',
        link: '/',
      },
      {
        key: 'login',
        text: user ? 'Logout' : 'Login',
        link: user ? '/api/auth/logout' : '/api/auth/login',
      },
    ];

    if (user) {
      navItems.splice(1, 0, {
        key: 'me',
        text: 'My Account',
        link: '/users/me',
      });
      navItems.splice(2, 0, {
        key: 'stats',
        text: 'Statistics',
        link: '/stats/netWorth',
      });
    }

    return navItems;
  }, [user]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = () => (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', height: '100%' }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        {process.env.NEXT_PUBLIC_APPNAME}
      </Typography>
      <Divider />
      <List>
        {getNavItems().map(({ key, text, link }) => (
          <Link key={key} href={link} className="tw-no-underline tw-text-black">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box display="flex" width="100%" height="100%" justifyContent="center">
      <Box>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APPNAME}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {process.env.NEXT_PUBLIC_APPNAME}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {getNavItems().map(({ key, text, link }) => (
                <Link href={link} key={key} className="tw-no-underline">
                  <Button key={key} sx={{ color: '#fff' }}>
                    {text}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer()}
        </Drawer>
      </Box>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        minHeight="100%"
        height="100%"
        width="100%"
        alignItems="center"
      >
        <Toolbar variant="dense" />
        {children}
      </Box>
    </Box>
  );
}
