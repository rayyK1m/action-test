import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { checkAuthSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { campTicketsApis, campTicketsKeys } from '@/query-hooks/uesCampTickets';
import { createServerAxios } from '@/utils';

import ApplyList from '@/view/applications/ApplyList/ApplyList';
import ApplyListLoading from '@/view/applications/ApplyList/ApplyList.loading';
import Layout from '@/components/Layout/Layout';
import SSRSuspense from '@/components/SSRSuspense';
import { ROLE } from '@/constants/db';

export default function ApplicationsPage() {
    const router = useRouter();
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <Layout.Header userData={userData} />

            <Layout.Main>
                <SSRSuspense
                    fallback={<ApplyListLoading />}
                    key={router.asPath}
                >
                    <ApplyList />
                </SSRSuspense>
            </Layout.Main>

            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.STUDENT, ROLE.TEACHER],
})(async (context) => {
    const queryClient = new QueryClient();
    const page = Number(context.query?.page || 1);
    const reviewStatus = context.query?.reviewStatus || 'ALL';

    const serverAxios = createServerAxios(context);

    await queryClient.prefetchQuery(
        campTicketsKeys.itemsDetail({ page, reviewStatus }),
        () =>
            campTicketsApis.getCampTickets(
                {
                    query: { page, reviewStatus },
                },
                serverAxios,
            ),
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
