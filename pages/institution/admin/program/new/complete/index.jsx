import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { sessionKeys } from '@/query-hooks/useSession';

import { checkAuthSsr } from '@/server/utils/auth';
import CompleteView from '@/view/components/CompleteView/CompleteView';

import { Button } from '@goorm-dev/gds-components';
import { ROLE } from '@/constants/db';

function Page() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>디지털새싹</title>
            </Head>
            <CompleteView
                title="승인 요청 완료"
                description={`프로그램 승인 요청이 완료되었습니다.\n재단의 승인이 완료되면 신청자가 프로그램 정보를 확인할 수 있습니다.`}
            >
                <Button
                    color="link"
                    size="xl"
                    onClick={() => router.push('/institution/admin')}
                >
                    프로그램 목록으로
                </Button>
            </CompleteView>
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
