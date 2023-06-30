import Head from 'next/head';

import Layout from '@/components/Layout/Layout';
import InstitutionsContainer from '@/view/institutions/InstitutionsContainer';

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
