import Head from 'next/head';
import { Suspense } from 'react';

import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { programKeys, getProgramDetail } from '@/query-hooks/useProgram';
import ProgramDetail from '@/view/programs/[id]';
import Layout from '@/components/Layout/Layout';
import { campTicketsApis, campTicketsKeys } from '@/query-hooks/uesCampTickets';
import { createServerAxios } from '@/utils';

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

    const serverAxios = createServerAxios(context);

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );

        /**
         * 유저라면 캠프 신청 정보를 받아와서 신청했는지 여부 판단
         */
        await queryClient.prefetchQuery(
            campTicketsKeys.historyDetail({ programId: context.query.id }),
            async () =>
                await campTicketsApis.getCampTicketHistory(
                    {
                        programId: context.query.id,
                    },
                    serverAxios,
                ),
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
