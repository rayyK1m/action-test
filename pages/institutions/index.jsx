import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
    institutionsApis,
    institutionsKeys,
} from '@/query-hooks/useInstitutions';
import { withSessionSsr } from '@/server/utils/auth';
import { sessionKeys } from '@/query-hooks/useSession';

import Institutions from '@/view/institutions';

export const INSTITUTIONS_DEFAULT_QUERY = {
    limit: 16,
    page: 1,
    search: '',
    active: false,
};

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();

    /** 세션 데이터 조회 */
    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    /** 운영기관 리스트 조회 */
    await queryClient.prefetchQuery(
        institutionsKeys.itemsDetail({ ...INSTITUTIONS_DEFAULT_QUERY }),
        () =>
            institutionsApis.getInstitutions({ ...INSTITUTIONS_DEFAULT_QUERY }),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});

export default function Page() {
    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Institutions />
        </>
    );
}
