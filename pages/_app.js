import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import LayoutWrapper from '@/components/layouts/LayoutWrapper';
import siteMetadata from '@/data/siteMetadata';
import '@/styles/index.css';
import '@/styles/prism.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>

      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
