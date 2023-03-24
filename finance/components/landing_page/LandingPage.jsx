import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
import SEO from './components/seo';
import Layout from './components/layout';
import Banner from './sections/banner';
// import Faq from './sections/faq';
// import Testimonials from './sections/testimonials';
// import Security from './sections/security';
// import Addons from './sections/addons';
// import MobileApp from './sections/mobile-app';
// import Dashboard from './sections/dashboard';
// import UltimateFeatures from './sections/ultimate-features';

import 'rc-tabs/assets/index.css';
import 'rc-drawer/assets/index.css';
// import './assets/css/react-slick.css';
import 'react-modal-video/css/modal-video.min.css';

export function LandingPage() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    domLoaded && (
      <ThemeProvider theme={theme}>
        <Layout>
          <SEO
            title="Pennywise - Free portfolio tracking and management"
            description="Looking for a reliable tool to help manage your personal finances and investments? Our all-in-one finance tracker and investment advisor is here to help. With personalized insights and easy-to-use tools, you can take control of your financial future and make smart decisions that will help you succeed. Start tracking and investing today!"
          />
          <Banner />
          {/* <Testimonials /> */}
          {/* <Security />
          <Addons />
          <Dashboard />
          <UltimateFeatures />
          <MobileApp /> */}
          {/* <Faq /> */}
        </Layout>
      </ThemeProvider>
    )
  );
}
