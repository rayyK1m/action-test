import Head from 'next/head';
import { Suspense } from 'react';

import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { programKeys, getProgramDetail } from '@/query-hooks/useProgram';
import ProgramDetail from '@/view/programs/[id]';
import Layout from '@/components/Layout/Layout';

export default function ProgramDetailPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>SW CAMP PROGRAM DETAIL</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Banner />
            <Layout.Main>
                {/* TODO: loading 구현되면 교체 */}
                <Suspense fallback={<div>...loading</div>}>
                    <ProgramDetail />
                </Suspense>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
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
