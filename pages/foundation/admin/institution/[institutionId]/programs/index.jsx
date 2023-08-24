import Head from 'next/head';

import qs from 'query-string';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import Layout from '@/components/Layout/Layout';
import { checkAuthSsr } from '@/server/utils/auth';

import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';

import FoundationAdminInstitutionPrograms from '@/view/foundation/admin/institution/[institutionId]/programs';
import { FOUNDATION_ADMIN_DEFAULT_QUERY } from '@/view/foundation/admin/components/ProgramTable/ProgramTable.constants';
import { createServerAxios } from '@/utils';
import { ROLE } from '@/constants/db';

export default function FoundationAdminInstitutionProgramsPage() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <FoundationAdminInstitutionPrograms />
            </Layout.Main>
            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async (context) => {
    const queryClient = new QueryClient();
    const { institutionId, page, limit, search, sort } = context.query;

    const isNumber = (value) => {
        if (!value) return false;
        return !Number.isNaN(Number(value));
    };

    const getNumberQuery = (key) => {
        const query = context.query[key];
        return isNumber(query) ? query : FOUNDATION_ADMIN_DEFAULT_QUERY[key];
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
                destination: `/foundation/admin/institution/${institutionId}/programs?${qs.stringify(
                    {
                        page: getNumberQuery('page'),
                        limit: getNumberQuery('limit'),
                        search: search || '',
                        sort: sort || '',
                    },
                )}`,
                permanent: false,
            },
        };
    }

    const DEFAULT_QUERY = {
        institutionId,
        page: Number(page),
        limit: Number(limit),
        search,
        sort,
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
