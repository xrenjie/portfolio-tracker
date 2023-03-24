/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'theme-ui';
import { SnackbarProvider } from 'notistack';
import { ReduxStore } from '../store';
import InitRedux from '../helper_components/InitRedux';
import '../styles/globals.css';
import { LandingPage, ModalToolkit, NavbarLayout } from '../components';

// import 'rc-tabs/assets/index.css';
// import 'rc-drawer/assets/index.css';
import '../components/landing_page/assets/css/react-slick.css';
import theme from '../components/landing_page/theme';
// import 'react-modal-video/css/modal-video.min.css';

export default function App(props) {
  return (
    <UserProvider>
      <Provider store={ReduxStore}>
        {/* <ThemeProvider theme={theme}> */}
        <LoginCheck {...props} />
        {/* </ThemeProvider> */}
      </Provider>
    </UserProvider>
  );
}

function LoginCheck({ Component, pageProps }) {
  const { user } = useUser();
  return user ? (
    // <GlobalCssPriority>
    <InitRedux>
      <ModalToolkit.ModalProvider>
        <NavbarLayout>
          <SnackbarProvider />
          <Component {...pageProps} />
        </NavbarLayout>
      </ModalToolkit.ModalProvider>
    </InitRedux>
  ) : (
    // </GlobalCssPriority>
    <LandingPage />
  );
}

function GlobalCssPriority({ children }) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
