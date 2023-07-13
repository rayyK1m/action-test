import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import Layout from '@/components/Layout/Layout';
import InstitutionsContainer from '@/view/institutions/InstitutionsContainer';
import {
    getInstitutions,
    institutionsKeys,
} from '@/query-hooks/useInstitutions';

export const INSTITUTIONS_DEFAULT_QUERY = {
    limit: 16,
    page: 1,
    search: '',
    active: false,
};

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        institutionsKeys.detail({ ...INSTITUTIONS_DEFAULT_QUERY }),
        () => getInstitutions({ ...INSTITUTIONS_DEFAULT_QUERY }),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default function OrganizationList() {
    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header />
            <Layout.Banner />
            <Layout.Main>
                <InstitutionsContainer />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
