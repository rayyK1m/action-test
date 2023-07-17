import Layout from '@/components/Layout/Layout';
import useSession from '@/query-hooks/useSession';

import InstitutionsContainer from './InstitutionsContainer';

function Institutions() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Banner />
            <Layout.Main>
                <InstitutionsContainer />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export default Institutions;
