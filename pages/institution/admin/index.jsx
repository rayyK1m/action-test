import { dehydrate, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';

import Layout from '@/components/Layout/Layout';
import ProgramManageList from '@/view/institution/admin/program/ProgramManageList';

import { createServerAxios } from '@/utils';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';
import { checkAuthSsr } from '@/server/utils/auth';

import { ROLE } from '@/constants/db';
import {
    institutionsApis,
    institutionsKeys,
} from '@/query-hooks/useInstitutions';

export default function InstitutionAdminPage({ isSubmitted }) {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <Layout.Header userData={userData} />

            <Layout.Main>
                <ProgramManageList isSubmitted={isSubmitted} />
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
    const queryClient = new QueryClient();
    const serverAxios = createServerAxios(context);
    const page = Number(context.query?.page || 1);
    const limit = Number(context.query?.limit || 10);

    await queryClient.prefetchQuery(
        programsKeys.itemsAdminDetail({
            page,
            limit,
        }),
        () =>
            programsApis.getProgramsAdmin(
                {
                    page,
                    limit,
                },
                serverAxios,
            ),
    );

    const session = context.req.session;
    if (session) {
        /** session 정보 세팅 */
        await queryClient.prefetchQuery(sessionKeys.all(), () => session);
    }

    if (session?.institutionId) {
        await queryClient.prefetchQuery(
            institutionsKeys.itemAdminDetail(session.institutionId),
            () =>
                institutionsApis.getInstitutionAdmin(
                    session.institutionId,
                    serverAxios,
                ),
        );
    }

    const { isSubmitted } = { isSubmitted: true }; // TODO: BFF 코드 작성 시에 해당 값 함께 가져올 수 있도록 추가 작업 필요
    return {
        props: {
            isSubmitted,
            dehydratedState: dehydrate(queryClient),
        },
    };
});
