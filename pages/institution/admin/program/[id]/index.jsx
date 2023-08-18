import { useRouter } from 'next/router';
import Head from 'next/head';
import ProgramInfoContainer from '@/view/institution/admin/program/ProgramInfoContainer';
import { checkAuthSsr } from '@/server/utils/auth';
import { ROLE } from '@/constants/db';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { sessionKeys } from '@/query-hooks/useSession';
import useSession from '@/query-hooks/useSession';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';
import { createServerAxios } from '@/utils';
import SSRSuspense from '@/components/SSRSuspense';
import ProgramInfoContainerLoading from '@/view/institution/admin/program/ProgramInfoContainer/ProgramInfoContainer.loading';

function Page() {
    const router = useRouter();

    const { id } = router.query;
    const { data: userData } = useSession.GET();

    return (
        <>
            <Head>
                <title>디지털새싹</title>
            </Head>
            {/* TODO: loading 구현되면 교체 */}
            <SSRSuspense
                fallback={<ProgramInfoContainerLoading />}
                key={router.asPath}
            >
                <ProgramInfoContainer programId={id} userData={userData} />
            </SSRSuspense>
        </>
    );
}

export default Page;

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    role: [ROLE.INSTITUTION],
})(async (context) => {
    const queryClient = new QueryClient();
    const id = context.params.id;

    const serverAxios = createServerAxios(context);

    await queryClient.prefetchQuery(programsKeys.itemAdminDetail(id), () =>
        programsApis.getProgramAdmin(id, serverAxios),
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
