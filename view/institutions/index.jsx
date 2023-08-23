import Layout from '@/components/Layout/Layout';
import useSession from '@/query-hooks/useSession';

import InstitutionsContainer from './InstitutionsContainer';

import { BANNER_IAMGE } from '@/constants/common';

function Institutions() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Banner imgSrc={BANNER_IAMGE} />
            <Layout.Main>
                <InstitutionsContainer />
            </Layout.Main>
            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export default Institutions;
