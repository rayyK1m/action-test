import Head from 'next/head';
import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useSession, { sessionKeys } from '@/query-hooks/useSession';

import ProgramsContainer from '@/view/main/ProgramsContainer';
import Layout from '@/components/Layout/Layout';

import { getPrograms, programsKeys } from '@/query-hooks/usePrograms';
import { CAMP_TYPE } from '@/constants/db';

export const DEFAULT_QUERY = {
    campType: CAMP_TYPE.방문형,
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
        programsKeys.detail({ ...DEFAULT_QUERY }),
        () => getPrograms({ ...DEFAULT_QUERY }),
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
                <ProgramsContainer />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
