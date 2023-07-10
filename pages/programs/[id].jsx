import Head from 'next/head';
import { Suspense } from 'react';

import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { sessionKeys } from '@/query-hooks/useSession';
import { programKeys, getProgramDetail } from '@/query-hooks/useProgram';
import ProgramDetail from '@/view/programs/[id]';

export default function ProgramDetailPage() {
    return (
        <Suspense fallback={<div>...loading</div>}>
            <Head>
                <title>SW CAMP PROGRAM DETAIL</title>
            </Head>
            <ProgramDetail />
        </Suspense>
    );
}

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    await queryClient.prefetchQuery(
        programKeys.detail({ id: context.query.id }),
        async () => await getProgramDetail({ id: context.query.id }),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
