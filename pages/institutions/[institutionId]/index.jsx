import Head from 'next/head';
import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { sessionKeys } from '@/query-hooks/useSession';

import { getPrograms, programsKeys } from '@/query-hooks/usePrograms';

import { PROGRAM_DIVISION } from '@/constants/db';
import InstitutionContainer from '@/view/institution/InstitutionContainer';
import { institutionsKeys } from '@/query-hooks/useInstitutions';
import { getInstitution } from '@/query-hooks/useInstitutions/apis';

export const INSTITUTION_DEFAULT_QUERY = {
    campType: PROGRAM_DIVISION.방문형,
    limit: 8,
    page: 1,
    category: '',
    operateLocation: '',
    search: '',
};

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const { institutionId } = context.params;

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    /**
     * 프로그램 리스트 조회
     */
    await queryClient.prefetchQuery(
        programsKeys.detail({ ...INSTITUTION_DEFAULT_QUERY, institutionId }),
        () => getPrograms({ ...INSTITUTION_DEFAULT_QUERY, institutionId }),
    );

    /**
     * 운영기관 조회
     */
    await queryClient.prefetchQuery(
        institutionsKeys.itemDetail(institutionId),
        () => getInstitution(institutionId),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});

/**
 * NOTE: Page 컴포넌트 역할 재논의하기
 * - 컴포넌트 명은 그냥 "Page"로? (root path, dynamic route에서 컴포넌트 명이 애매함)
 *   - 우리가 직접 다른 곳에서 import 할 컴포넌트가 아니라서, 동일해도 괜찮을듯?
 * - Layout도 view로 빼기?
 * - 아래 3개로 역할 재정의?
 *   1. 라우팅 처리
 *   2. SEO 처리 -> <Head>
 *   3. getServersideProps, getStaticPropse.
 */
export default function Page() {
    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <InstitutionContainer />
        </>
    );
}
