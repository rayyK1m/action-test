import { QueryClient, dehydrate } from '@tanstack/query-core';

import Layout from '@/components/Layout/Layout';
import ApplicantManageList from '@/view/institution/admin/program/[id]/applicant/ApplicantManageList';
import { withSessionSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import SSRSuspense from '@/components/SSRSuspense';
import { campTicketsKeys, campTicketsApis } from '@/query-hooks/uesCampTickets';

export default function InstitutionAdminApplicantPage({ programDivision }) {
    const { data: userData } = useSession.GET();

    return (
        <SSRSuspense fallback={<h2>서버 로딩중</h2>}>
            <Layout>
                <Layout.Header userData={userData} />
                <Layout.Main>
                    <ApplicantManageList division={programDivision} />
                </Layout.Main>
                <Layout.Footer />
            </Layout>
        </SSRSuspense>
    );
}

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const { id } = context.params;
    const page = Number(context.query?.page || 1);
    const limit = Number(context.query?.limit || 10);

    await queryClient.prefetchQuery(
        campTicketsKeys.itemsAdminDetail({
            programId: id,
            page,
            limit,
        }),
        () =>
            campTicketsApis.getCampticketsAdmin({
                page,
                limit,
            }),
    );
    const { programDivision } = queryClient.getQueryData();

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            programDivision,
        },
    };
});
