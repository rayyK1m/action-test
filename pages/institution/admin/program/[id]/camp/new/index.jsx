import { dehydrate, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';

import { checkAuthSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';

import Layout from '@/components/Layout/Layout';
import { ROLE } from '@/constants/db';
import { createServerAxios } from '@/utils';
import { programsApis, programsKeys } from '@/query-hooks/usePrograms';

import CreateCampContainer from '@/view/institution/admin/program/[id]/camp/new/CreateCampContainer';
import CreateCampContextProvider from '@/view/institution/admin/program/[id]/camp/new/CreateCampContainer/context';

export default function InstitutionAdminCampNewPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <Layout.Header userData={userData} />

            <Layout.Main>
                <CreateCampContextProvider>
                    <CreateCampContainer />
                </CreateCampContextProvider>
            </Layout.Main>

            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.INSTITUTION],
})(async (context) => {
    const { id } = context.params;
    const queryClient = new QueryClient();
    const serverAxios = createServerAxios(context);

    /**
     * 프로그램 정보 가져오기
     */
    await queryClient.prefetchQuery(programsKeys.itemAdminDetail(id), () =>
        programsApis.getProgramAdmin(id, serverAxios),
    );

    const session = context.req.session;
    if (session) {
        /** session 정보 세팅 */
        await queryClient.prefetchQuery(sessionKeys.all(), () => session);
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
