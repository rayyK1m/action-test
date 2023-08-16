import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import SSRSuspense from '@/components/SSRSuspense';
import CampManageContainer from '@/view/institution/admin/program/[id]/camp/CampManageContainer';
import CampManageContainerLoading from '@/view/institution/admin/program/[id]/camp/CampManageContainer/CampManageContainer.loading';

import { createServerAxios, queryStringify } from '@/utils';
import { checkAuthSsr } from '@/server/utils/auth';
import { sessionKeys } from '@/query-hooks/useSession';
import { campsKeys, campsApis } from '@/query-hooks/useCamps';
import { programsApis, programsKeys } from '@/query-hooks/usePrograms';

import { PROGRAM_DIVISION, ROLE, CAMPS_DEFAULT_QUERY } from '@/constants/db';

/**
 * 운영기관 Admin 캠프관리 페이지와 맞추기
 *
 * @see `pages/institution/admin/program/[id]/camp/index.jsx`
 */
export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async (context) => {
    const { params, query, req, resolvedUrl } = context;
    const { id: programId } = params;
    const { division, page, limit, sort, institutionId } = query;

    if (
        !(
            division === PROGRAM_DIVISION.방문형 ||
            division === PROGRAM_DIVISION.집합형
        ) ||
        !institutionId
    ) {
        /**
         * 필수 query 가 없을 경우, 404로 redirect
         */
        return {
            redirect: {
                destination: `/404`,
                permanent: false,
            },
        };
    }
    if (!page || !limit || !sort) {
        /**
         * 옵션 query가 없을 경우, 기본 query로 redirect
         */
        const queryString = queryStringify({
            /** 옵션 query */
            page: page || CAMPS_DEFAULT_QUERY.page,
            limit: limit || CAMPS_DEFAULT_QUERY.limit,
            sort: sort || CAMPS_DEFAULT_QUERY.sort,

            /** 필수 query */
            division: encodeURIComponent(division),
            institutionId,
        });
        const basePath = resolvedUrl.substring(0, resolvedUrl.lastIndexOf('?'));

        return {
            redirect: {
                destination: `${basePath}?${queryString}`,
                permanent: false,
            },
        };
    }

    const queryClient = new QueryClient();
    const serverAxios = createServerAxios(context);

    /** 프로그램 조회 (어드민 용) */
    await queryClient.prefetchQuery(
        programsKeys.itemAdminDetail(programId),
        () => programsApis.getProgramAdmin(programId, serverAxios),
    );

    /** 프로그램 별 캠프 목록 조회 */
    await queryClient.prefetchQuery(
        campsKeys.itemsProgramDetail(programId, {
            institutionId,
            page,
            limit,
            sort,
            division,
        }),
        () =>
            campsApis.getCamps(
                programId,
                {
                    institutionId,
                    page,
                    limit,
                    sort,
                    division,
                },
                serverAxios,
            ),
    );

    const session = req.session;
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

function Page() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <SSRSuspense
                key={router.asPath}
                fallback={<CampManageContainerLoading />}
            >
                <CampManageContainer />
            </SSRSuspense>
        </>
    );
}

export default Page;
