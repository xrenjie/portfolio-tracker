/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { Provider } from 'react-redux';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { ReduxStore } from '../store';
import InitRedux from '../helper_components/InitRedux';
import '../styles/globals.css';
import { LandingPage, ModalToolkit, NavbarLayout } from '../components';

import 'rc-tabs/assets/index.css';
import 'rc-drawer/assets/index.css';
import '../components/landing_page/assets/css/react-slick.css';
import 'react-modal-video/css/modal-video.min.css';

export default function App(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <UserProvider>
      <Provider store={ReduxStore}>
        <ThemeProvider theme={theme}>
          <GlobalCssPriority>
            <LoginCheck {...props} />
          </GlobalCssPriority>
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
}

function LoginCheck({ Component, pageProps }) {
  const { user } = useUser();
  return user ? (
    <InitRedux>
      <ModalToolkit.ModalProvider>
        <NavbarLayout>
          <SnackbarProvider />
          <Component {...pageProps} />
        </NavbarLayout>
      </ModalToolkit.ModalProvider>
    </InitRedux>
  ) : (
    <LandingPage />
  );
}

function GlobalCssPriority({ children }) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
