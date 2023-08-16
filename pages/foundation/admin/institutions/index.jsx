import Head from 'next/head';
import qs from 'query-string';

import Layout from '@/components/Layout/Layout';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { checkAuthSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import FoundationAdminInstitutions from '@/view/foundation/admin/institutions';
import { FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY } from '@/view/foundation/admin/institutions/InstitutionsTable/InstitutionsTable.constants';
import {
    institutionsApis,
    institutionsKeys,
} from '@/query-hooks/useInstitutions';
import { ROLE } from '@/constants/db';

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

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async (context) => {
    const queryClient = new QueryClient();

    /** session 세팅 */
    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    const { page, limit, search, sort } = context.query;
    const isNumber = (value) => {
        if (!value) return false;
        return !Number.isNaN(Number(value));
    };

    const getNumberQuery = (key) => {
        const query = context.query[key];
        return isNumber(query)
            ? query
            : FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY[key];
    };

    /** query 기본값 설정 */
    if (
        !isNumber(page) ||
        !isNumber(limit) ||
        (!search && typeof search !== 'string') ||
        sort === undefined
    ) {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
            redirect: {
                destination: `/foundation/admin/institutions?${qs.stringify({
                    page: getNumberQuery('page'),
                    limit: getNumberQuery('limit'),
                    search: search || '',
                    sort: sort || '',
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
        institutionsKeys.itemsFoundationDetail({ ...DEFAULT_QUERY }),
        () =>
            institutionsApis.getInstitutionsFoundation(
                { ...DEFAULT_QUERY },
                {
                    headers: {
                        Cookie: context.req.headers.cookie,
                    },
                },
            ),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
