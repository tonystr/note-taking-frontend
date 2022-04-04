import { ReactElement } from 'react';
import Document, { DocumentInitialProps, DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render(): ReactElement {
        return (
            <Html lang="en" className="h-full">
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    <title>atcampus notes</title>
                </Head>
                <body className="h-full bg-white antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
