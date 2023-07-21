import { QueryClient, dehydrate } from '@tanstack/react-query';

import { withSessionSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { campTicketsApis, campTicketsKeys } from '@/query-hooks/uesCampTickets';

import ApplyList from '@/view/applications/ApplyList/ApplyList';
import ApplyListLoading from '@/view/applications/ApplyList/ApplyList.loading';
import Layout from '@/components/Layout/Layout';
import SSRSuspense from '@/components/SSRSuspense';
import { useRouter } from 'next/router';

export default function ApplicationsPage() {
    const router = useRouter();
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Layout.Header userData={userData} />

            <Layout.Main>
                <SSRSuspense
                    fallback={<ApplyListLoading />}
                    key={router.asPath}
                >
                    <ApplyList />
                </SSRSuspense>
            </Layout.Main>

            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const page = Number(context.query?.page || 1);

    await queryClient.prefetchQuery(campTicketsKeys.itemsDetail({ page }), () =>
        campTicketsApis.getCampTickets({ page }),
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
