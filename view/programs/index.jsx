import useSession from '@/query-hooks/useSession';

import Layout from '@/components/Layout/Layout';
import SSRSuspense from '@/components/SSRSuspense';

import ProgramsContainer from '../components/ProgramsContainer';

import { BANNER_IAMGE } from '@/constants/common';

export default function Programs() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Banner imgSrc={BANNER_IAMGE} />
            <Layout.Main>
                <SSRSuspense>
                    <ProgramsContainer />
                </SSRSuspense>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
