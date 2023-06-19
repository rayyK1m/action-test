import '@/styles/globals.css';

import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            suspense: true,
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App({ Component, pageProps }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ErrorBoundary>
                    <Component {...pageProps}></Component>
                </ErrorBoundary>
            </QueryClientProvider>
        </>
    );
}
