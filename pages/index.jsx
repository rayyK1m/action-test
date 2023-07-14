import Head from 'next/head';
import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useSession, { sessionKeys } from '@/query-hooks/useSession';

import ProgramsContainer from '@/view/components/ProgramsContainer';
import Layout from '@/components/Layout/Layout';

import { getPrograms, programsKeys } from '@/query-hooks/usePrograms';
import { PROGRAM_DIVISION } from '@/constants/db';
import SSRSuspense from '@/components/SSRSuspense';

export const PROGRAMS_DEFAULT_QUERY = {
    campType: PROGRAM_DIVISION.방문형,
    limit: 8,
    page: 1,
    category: '',
    operateLocation: '',
    search: '',
};

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    await queryClient.prefetchQuery(
        programsKeys.detail({ ...PROGRAMS_DEFAULT_QUERY }),
        () => getPrograms({ ...PROGRAMS_DEFAULT_QUERY }),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});

export default function MainPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Banner />
            <Layout.Main>
                <SSRSuspense>
                    <ProgramsContainer />
                </SSRSuspense>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
