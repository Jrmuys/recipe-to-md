import type { AppProps } from 'next/app';
import '@picocss/pico';
import '../styles/styles.scss';

export default function App({ Component, pageProps }: AppProps) {
   return <Component {...pageProps} />;
}
