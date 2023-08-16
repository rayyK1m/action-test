import Head from 'next/head';

import qs from 'query-string';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import Layout from '@/components/Layout/Layout';
import { checkAuthSsr } from '@/server/utils/auth';

import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';

import FoundationAdminPrograms from '@/view/foundation/admin/programs';
import { FOUNDATION_ADMIN_DEFAULT_QUERY } from '@/view/foundation/admin/components/ProgramTable/ProgramTable.constants';
import { createServerAxios } from '@/utils';
import { PROGRAM_REVIEW_STATUS, ROLE } from '@/constants/db';

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

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async (context) => {
    const queryClient = new QueryClient();
    const { page, limit, search, sort, reviewStatus } = context.query;

    const isNumber = (value) => {
        if (!value) return false;
        return !Number.isNaN(Number(value));
    };

    const getNumberQuery = (key) => {
        const query = context.query[key];
        return isNumber(query) ? query : FOUNDATION_ADMIN_DEFAULT_QUERY[key];
    };

    const validPattern = new RegExp(
        `(${PROGRAM_REVIEW_STATUS.심사중.key})|(${PROGRAM_REVIEW_STATUS.승인.key})|(${PROGRAM_REVIEW_STATUS.거절.key})`,
    );
    const validReviewStatus = validPattern.test(reviewStatus);

    /** query 기본값 설정 */
    if (
        !isNumber(page) ||
        !isNumber(limit) ||
        (!search && typeof search !== 'string') ||
        sort === undefined ||
        (!reviewStatus && typeof reviewStatus !== 'string') ||
        (reviewStatus && !validReviewStatus)
    ) {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
            redirect: {
                destination: `/foundation/admin/programs?${qs.stringify({
                    page: getNumberQuery('page'),
                    limit: getNumberQuery('limit'),
                    search: search || '',
                    sort: sort || '',
                    reviewStatus: validReviewStatus ? reviewStatus : '',
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
        reviewStatus,
    };

    const serverAxios = createServerAxios(context);

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );

        await queryClient.prefetchQuery(
            programsKeys.itemsAdminDetail({ ...DEFAULT_QUERY }),
            () =>
                programsApis.getProgramsAdmin(
                    { ...DEFAULT_QUERY },
                    serverAxios,
                ),
        );
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
