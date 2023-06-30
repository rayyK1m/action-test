import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import ProgramsContainer from '@/view/main/ProgramsContainer';
import Layout from '@/components/Layout/Layout';

import { getPrograms, PROGRAMS_KEYS } from '@/query-hooks/usePrograms';
import { CAMP_TYPE } from '@/constants/db';

export const DEFAULT_QUERY = {
    campType: CAMP_TYPE.방문형,
    limit: 8,
    page: 1,
    category: '',
    operateLocation: '',
    search: '',
};

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        PROGRAMS_KEYS.detail({ ...DEFAULT_QUERY }),
        () => getPrograms({ ...DEFAULT_QUERY }),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default function MainPage() {
    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header />
            <Layout.Banner />
            <Layout.Main>
                <ProgramsContainer />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
