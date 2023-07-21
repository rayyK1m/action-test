import { dehydrate, QueryClient } from '@tanstack/react-query';

import { withSessionSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import {
    getProgramsAdmin,
    programAdminKeys,
} from '@/query-hooks/useProgramsAdmin';
import ProgramManageList from '@/view/institution/admin/ProgramManageList';
import Layout from '@/components/Layout/Layout';

export default function InstitutionAdminPage({ isSubmitted }) {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />

            <Layout.Main>
                <ProgramManageList isSubmitted={isSubmitted} />
            </Layout.Main>

            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const page = Number(context.query?.page || 1);
    const limit = Number(context.query?.limit || 5);

    await queryClient.prefetchQuery(
        programAdminKeys.detail({
            page,
            limit,
        }),
        () =>
            getProgramsAdmin({
                page,
                limit,
            }),
    );

    const session = context.req.session;
    if (session) {
        /** session 정보 세팅 */
        await queryClient.prefetchQuery(sessionKeys.all(), () => session);
    }

    const { isSubmitted } = { isSubmitted: true }; // TODO: BFF 코드 작성 시에 해당 값 함께 가져올 수 있도록 추가 작업 필요
    return {
        props: {
            isSubmitted,
            dehydratedState: dehydrate(queryClient),
        },
    };
});
