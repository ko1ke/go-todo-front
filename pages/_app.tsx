import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Auth from '../components/Auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Layout>
  );
}

export default MyApp;
