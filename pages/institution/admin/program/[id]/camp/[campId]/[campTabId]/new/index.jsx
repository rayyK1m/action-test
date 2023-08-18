import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { checkAuthSsr } from '@/server/utils/auth';
import { sessionKeys } from '@/query-hooks/useSession';
import { CAMP_REVIEW_STATUS, ROLE } from '@/constants/db';
import { createServerAxios } from '@/utils';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';

import AddCampParticipant from '@/view/institution/admin/program/[id]/camp/[campId]/[campTabId]/new/AddCampParticipant';
import { campTicketsKeys, campTicketsApis } from '@/query-hooks/uesCampTickets';

export default function Page() {
    return (
        <>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <AddCampParticipant />
        </>
    );
}

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.INSTITUTION],
})(async (context) => {
    const queryClient = new QueryClient();
    const { id: programId, campTabId } = context.params;
    const serverAxios = createServerAxios(context);

    /**
     * [캠프 상세 페이지 Path 비즈니스 로직 2 - 1]
     *
     * - 특정 sub path가 아닌 경우에는 404
     * - 특정 sub path: participants
     */
    if (campTabId !== 'participants') {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }

    const session = context.req.session;
    if (session) {
        /** session 정보 세팅 */
        await queryClient.prefetchQuery(sessionKeys.all(), () => session);
    }

    /** 프로그램 정보 조회 */
    await queryClient.prefetchQuery(
        programsKeys.itemAdminDetail(programId),
        () => programsApis.getProgramAdmin(programId, serverAxios),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
});
