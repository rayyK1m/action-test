import Head from 'next/head';
import ProgramListContainer from '@/view/main/ProgramListContainer';
import { withReactQuerySsr } from '@/server/utils/auth';
import { dehydrate } from '@tanstack/react-query';
import useSession from '@/query-hooks/useSession';

import Layout from '@/components/Layout/Layout';

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
                <ProgramListContainer />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = withReactQuerySsr((context) => {
    return {
        props: {
            dehydratedState: dehydrate(context.req.queryClient),
        },
    };
});
