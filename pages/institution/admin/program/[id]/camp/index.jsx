import Head from 'next/head';
import { withSessionSsr } from '@/server/utils/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import CampManageContainer from '@/view/institution/admin/program/[id]/camp/CampManageContainer';
import { sessionKeys } from '@/query-hooks/useSession';
import { campsKeys, campsApis } from '@/query-hooks/useCamps';
import { Suspense } from 'react';

export const CAMPS_DEFAULT_QUERY = {
    page: 1,
    limit: 5,
};

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const { id: programId } = context.params;

    // TODO: institutionId userData에서 가져오기
    const institutionId = 'institution-ZERO';

    await queryClient.prefetchQuery(
        campsKeys.itemsProgramDetail(programId, {
            institutionId,
            ...CAMPS_DEFAULT_QUERY,
        }),
        () =>
            campsApis.getCamps(programId, {
                institutionId,
                ...CAMPS_DEFAULT_QUERY,
            }),
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

function Page() {
    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Suspense fallback={<h1>loading..</h1>}>
                <CampManageContainer />
            </Suspense>
        </>
    );
}

export default Page;
