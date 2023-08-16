import Head from 'next/head';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { checkAuthSsr } from '@/server/utils/auth';
import { sessionKeys } from '@/query-hooks/useSession';
import { createServerAxios } from '@/utils';
import { campsApis, campsKeys } from '@/query-hooks/useCamps';
import { programsKeys, programsApis } from '@/query-hooks/usePrograms';

import CampContainer from '@/view/institution/admin/program/[id]/camp/[campId]/CampContainer';

import { ROLE } from '@/constants/db';
import { CAMP_TABS } from '@/constants/navigations';

export const getServerSideProps = checkAuthSsr({
    shouldLogin: true,
    roles: [ROLE.FOUNDATION],
})(async (context) => {
    const queryClient = new QueryClient();
    const {
        query: { institutionId },
        params: { id: programId, campId, campTabId },
    } = context;
    const serverAxios = createServerAxios(context);

    /**
     * [캠프 상세 페이지 Path 비즈니스 로직 2]
     *
     * - 특정 sub path(CAMP_TABS)가 아닌 경우에는 404
     * @see 참고 `../index.jsx`
     */
    if (
        !institutionId ||
        !Object.values(CAMP_TABS)
            .map(({ path }) => path.slice(1))
            .some((i) => i === campTabId)
    ) {
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

    /** 캠프 개별 조회 */
    await queryClient.prefetchQuery(campsKeys.itemDetail(campId), () =>
        campsApis.getCamp({ campId, institutionId }, serverAxios),
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
            <CampContainer />
        </>
    );
}
