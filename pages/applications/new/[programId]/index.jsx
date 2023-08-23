import Head from 'next/head';
import CampApplyContainer from '@/view/applications/CampApplyContainer';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';
import SSRSuspense from '@/components/SSRSuspense';
import { useRouter } from 'next/router';
import { checkAuthSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import { PROGRAM_DIVISION, ROLE } from '@/constants/db';
import CampApplyContainerLoading from '@/view/applications/CampApplyContainer/CampApplyContainer.loading';

function Page() {
    const router = useRouter();
    const { programId } = router.query;

    const { data: userData } = useSession.GET();

    return (
        <>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <SSRSuspense
                fallback={<CampApplyContainerLoading userData={userData} />}
                key={router.asPath}
            >
                <CampApplyContainer programId={programId} userData={userData} />
            </SSRSuspense>
        </>
    );
}

export default Page;

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.STUDENT, ROLE.TEACHER],
})(async (context) => {
    const queryClient = new QueryClient();
    const programId = context.params.programId;

    await queryClient.prefetchQuery(programsKeys.item(), () =>
        programsApis.getProgram({ id: programId }),
    );

    const session = context.req.session;

    if (session) {
        await queryClient.prefetchQuery(sessionKeys.all(), () => session);
    }

    const {
        item: {
            type: { division },
        },
    } = queryClient.getQueryData(programsKeys.item());

    /** 방문형 신청 페이지는 선생님만, 집합형 신청 페이지는 학생만 접근 가능 */
    if (
        (division === PROGRAM_DIVISION.방문형 && session.role === 'student') ||
        (division === PROGRAM_DIVISION.집합형 && session.role === 'teacher')
    ) {
        return {
            redirect: {
                destination: '/403',
                permanent: false,
            },
        };
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
