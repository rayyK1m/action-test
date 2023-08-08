import Head from 'next/head';

import Layout from '@/components/Layout/Layout';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { withSessionSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';

export default function Page() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Main>프로그램 상세 페이지</Layout.Main>
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

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
