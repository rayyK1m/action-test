import Head from 'next/head';

import Layout from '@/components/Layout/Layout';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { withSessionSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import FoundationAdminInstitutions from '@/view/foundation/admin/institutions';

export default function FoundationAdminInstitutionsPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <FoundationAdminInstitutions />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    // const { page, limit, search, sort } = context.query;

    // /** query 기본값 설정 */
    // if (!page || !limit || (!search && typeof search !== 'string')) {
    //     return {
    //         props: {
    //             dehydratedState: dehydrate(queryClient),
    //         },
    //         redirect: {
    //             destination: `${context.req.url.replace(
    //                 /\?.*/,
    //                 '',
    //             )}?${qs.stringify({
    //                 /** TODO: constant 값 수정 */
    //                 page: page || FOUNDATION_ADMIN_DEFAULT_QUERY.page,
    //                 limit: limit || FOUNDATION_ADMIN_DEFAULT_QUERY.limit,
    //                 search: search || '',
    //                 sort: null,
    //             })}`,
    //             permanent: false,
    //         },
    //     };
    // }

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
