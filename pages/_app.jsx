import '@/styles/globals.css';

import React, { useState } from 'react';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

/**
 * setting day.js
 */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(customParseFormat);

export default function App({ Component, pageProps }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 0,
                        suspense: true,
                        useErrorBoundary: true,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <ErrorBoundary>
                        <Component {...pageProps}></Component>
                    </ErrorBoundary>
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}
