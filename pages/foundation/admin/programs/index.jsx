import Head from 'next/head';

import qs from 'qs';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import Layout from '@/components/Layout/Layout';
import { withSessionSsr } from '@/server/utils/auth';

import useSession, { sessionKeys } from '@/query-hooks/useSession';
import {
    getProgramsAdmin,
    programAdminKeys,
} from '@/query-hooks/useProgramsAdmin';

import FoundationAdminPrograms from '@/view/foundation/admin/programs';
import { FOUNDATION_ADMIN_DEFAULT_QUERY } from '@/view/foundation/admin/programs/ProgramTable/ProgramTable.constants';

export default function FoundationAdminProgramsPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <FoundationAdminPrograms />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const { page, limit, search, sort } = context.query;

    /** query 기본값 설정 */
    if (!page || !limit || (!search && typeof search !== 'string')) {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
            redirect: {
                destination: `/foundation/admin/programs?${qs.stringify({
                    page: page || FOUNDATION_ADMIN_DEFAULT_QUERY.page,
                    limit: limit || FOUNDATION_ADMIN_DEFAULT_QUERY.limit,
                    search: search || '',
                    sort: null,
                })}`,
                permanent: false,
            },
        };
    }

    const DEFAULT_QUERY = {
        page: Number(page),
        limit: Number(limit),
        search,
        sort,
    };

    await queryClient.prefetchQuery(
        programAdminKeys.detail({ ...DEFAULT_QUERY }),
        () => getProgramsAdmin({ ...DEFAULT_QUERY }),
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
