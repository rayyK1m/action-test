import { QueryClient, dehydrate } from '@tanstack/query-core';

import Layout from '@/components/Layout/Layout';
import ApplicantManageList from '@/view/institution/admin/program/[id]/applicant/ApplicantManageList';
import { checkAuthSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { campTicketsKeys, campTicketsApis } from '@/query-hooks/uesCampTickets';
import { ROLE } from '@/constants/db';
import { createServerAxios } from '@/utils';
import { programsApis, programsKeys } from '@/query-hooks/usePrograms';

export default function FoundationAdminApplicantPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <ApplicantManageList />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async (context) => {
    const queryClient = new QueryClient();
    const { id } = context.params;
    const page = Number(context.query?.page || 1);
    const limit = Number(context.query?.limit || 10);

    const serverAxios = createServerAxios(context);

    /**
     * 프로그램 별 신청자 정보 가져오기
     */
    await queryClient.prefetchQuery(
        campTicketsKeys.itemsAdminDetail({
            programId: id,
            page,
            limit,
        }),
        () =>
            campTicketsApis.getCampticketsAdmin(
                {
                    programId: id,
                    page,
                    limit,
                },
                serverAxios,
            ),
    );

    /**
     * 프로그램 정보 가져오기
     */
    await queryClient.prefetchQuery(programsKeys.itemAdminDetail(id), () =>
        programsApis.getProgramAdmin(id, serverAxios),
    );

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
