import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                <meta name="description" content="SW CAMP" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="shortcut-icon" href="/favicon.ico" />
                <link
                    id="goormstrap-stylesheet"
                    rel="stylesheet"
                    href="https://statics.goorm.io/css/goormstrap/v4.31.0/goormstrap.v4.min.css"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
