import { Suspense } from 'react';

import Layout from '@/components/Layout/Layout';
import ProgramsContainer from '@/view/components/ProgramsContainer';
import useSession from '@/query-hooks/useSession';

import InstitutionInfo from './InstitutionInfo';
import InstitutionInfoLoading from './InstitutionInfo/InstitutionInfo.loading';

function Institution() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Banner useBrandBox />
            <Layout.Main>
                <Suspense fallback={<InstitutionInfoLoading />}>
                    <InstitutionInfo />
                </Suspense>
                <ProgramsContainer />
            </Layout.Main>
            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export default Institution;
