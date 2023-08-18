import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import Institution from '@/view/institutions/[institutionId]';

import { programsApis, programsKeys } from '@/query-hooks/usePrograms';
import { sessionKeys } from '@/query-hooks/useSession';
import { withSessionSsr } from '@/server/utils/auth';

import { PROGRAM_DIVISION } from '@/constants/db';

import {
    institutionsKeys,
    institutionsApis,
} from '@/query-hooks/useInstitutions';

export const INSTITUTION_DEFAULT_QUERY = {
    campType: PROGRAM_DIVISION.집합형,
    limit: 8,
    page: 1,
    category: '',
    operateLocation: '',
    search: '',
    active: false,
    sort: '-updatedAt',
};

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const { institutionId } = context.params;

    /** 세션 데이터 조회 */
    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    /** 프로그램 리스트 조회 */
    await queryClient.prefetchQuery(
        programsKeys.itemsDetail({
            ...INSTITUTION_DEFAULT_QUERY,
            institutionId,
        }),
        () =>
            programsApis.getPrograms({
                ...INSTITUTION_DEFAULT_QUERY,
                institutionId,
            }),
    );

    /** 운영기관 조회 */
    await queryClient.prefetchQuery(
        institutionsKeys.itemDetail(institutionId),
        () => institutionsApis.getInstitution(institutionId),
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
            <Institution />
        </>
    );
}
