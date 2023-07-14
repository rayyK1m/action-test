import '@/styles/globals.css';

import React, { useState } from 'react';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

import { ToastContainer, Slide } from '@goorm-dev/gds-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/**
 * setting day.js
 */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

/** setting react-quill editor */
import 'react-quill/dist/quill.snow.css';

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
                    <ToastContainer
                        hideProgressBar
                        newestOnTop
                        autoClose={3000}
                        transition={Slide}
                    />
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}
