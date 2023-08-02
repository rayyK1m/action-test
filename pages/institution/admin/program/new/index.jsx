import { useRouter } from 'next/router';
import Head from 'next/head';
import ProgramApplyContainer from '@/view/institution/admin/program/ProgramApplyContainer';

import { checkAuthSsr, withSessionSsr } from '@/server/utils/auth';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { sessionKeys } from '@/query-hooks/useSession';
import { ROLE } from '@/constants/db';

function Page() {
    const router = useRouter();
    const { type } = router.query;

    return (
        <>
            <Head>SW CAMP</Head>
            <ProgramApplyContainer division={type} />
        </>
    );
}

export default Page;

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.INSTITUTION],
})(async (context) => {
    const queryClient = new QueryClient();

    const session = context.req.session;
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
