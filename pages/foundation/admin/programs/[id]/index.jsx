import Head from 'next/head';

import Layout from '@/components/Layout/Layout';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { checkAuthSsr } from '@/server/utils/auth';
import useSession, { sessionKeys } from '@/query-hooks/useSession';
import FoundationAdminProgram from '@/view/foundation/admin/programs/[id]';
import { programsApis, programsKeys } from '@/query-hooks/usePrograms';
import { createServerAxios } from '@/utils';
import { ANOTHER_PROGRAMS_QUERY } from '@/view/foundation/admin/programs/[id]/AnotherPrograms/AnotherPrograms.contants';

export default function Page() {
    const { data: userData } = useSession.GET();

    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <FoundationAdminProgram />
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: ['foundation'],
})(async (context) => {
    const queryClient = new QueryClient();
    const { id } = context.query;
    const serverAxios = createServerAxios(context);

    if (context.req?.session) {
        await queryClient.prefetchQuery(
            sessionKeys.all(),
            () => context.req.session,
        );

        await queryClient.prefetchQuery(programsKeys.itemAdminDetail(id), () =>
            programsApis.getProgramAdmin(id, serverAxios),
        );

        await queryClient.prefetchQuery(
            programsKeys.itemsAdminDetail({ ...ANOTHER_PROGRAMS_QUERY }),
            () =>
                programsApis.getProgramsAdmin(
                    { ...ANOTHER_PROGRAMS_QUERY },
                    serverAxios,
                ),
        );
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
