import { AppProps } from 'next/app';
import Head from 'next/head';
import 'styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>atcampus notes</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
