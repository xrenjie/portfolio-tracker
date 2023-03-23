/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
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
import { ModalToolkit, NavbarLayout } from '../components';

export default function App({ Component, pageProps }) {
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
            <InitRedux>
              <ModalToolkit.ModalProvider>
                <NavbarLayout>
                  <SnackbarProvider />
                  <Component {...pageProps} />
                </NavbarLayout>
              </ModalToolkit.ModalProvider>
            </InitRedux>
          </GlobalCssPriority>
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
}

function GlobalCssPriority({ children }) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
