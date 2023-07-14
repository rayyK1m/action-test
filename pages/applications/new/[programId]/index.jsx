import Head from 'next/head';
import CampApplyContainer from '@/view/applications/CampApplyContainer';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';
import SSRSuspense from '@/components/SSRSuspense';
import { useRouter } from 'next/router';
import { withSessionSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';

function Page() {
    const router = useRouter();
    const { programId } = router.query;

    const { data: userData } = useSession.GET();

    return (
        <>
            <Head>SW CAMP</Head>
            <SSRSuspense fallback={<p>loading...</p>} key={router.asPath}>
                <CampApplyContainer programId={programId} userData={userData} />
            </SSRSuspense>
        </>
    );
}

export default Page;

export const getServerSideProps = withSessionSsr(async (context) => {
    const queryClient = new QueryClient();
    const programId = context.params.programId;

    await queryClient.prefetchQuery(programsKeys.item(), () =>
        programsApis.getProgram({ id: programId }),
    );

    const session = context.req.session;

    if (session) {
        await queryClient.prefetchQuery(sessionKeys.all(), () => session);
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
