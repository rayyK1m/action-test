import Head from 'next/head';
import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { sessionKeys } from '@/query-hooks/useSession';

import { programsApis, programsKeys } from '@/query-hooks/usePrograms';
import { PROGRAM_DIVISION } from '@/constants/db';
import Programs from '@/view/programs';

export const PROGRAMS_DEFAULT_QUERY = {
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

    /** 세션 데이터 조회 */
    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );
    }

    /** 프로그램 리스트 조회 */
    await queryClient.prefetchQuery(
        programsKeys.itemsDetail({ ...PROGRAMS_DEFAULT_QUERY }),
        () => programsApis.getPrograms({ ...PROGRAMS_DEFAULT_QUERY }),
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
                <title>디지털새싹</title>
            </Head>
            <Programs />
        </>
    );
}
