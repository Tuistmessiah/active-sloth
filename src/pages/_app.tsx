import Head from 'next/head';
import { Fragment } from 'react';
import { Navbar } from '../containers/navbar/navbar.container';

import '../styles/globals.css';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
    // TODO: Add route authorization here
    return (
        <Fragment>
            <Head>
                <meta name="theme-color" content="#3c1742" />
            </Head>
            <Navbar />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;
