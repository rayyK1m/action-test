import { useRouter } from 'next/router';
import Head from 'next/head';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Button } from '@goorm-dev/gds-components';

import CompleteView from '@/view/components/CompleteView/CompleteView';
import { checkAuthSsr } from '@/server/utils/auth';
import { sessionKeys } from '@/query-hooks/useSession';
import { ROLE } from '@/constants/db';

function Page() {
    const router = useRouter();

    return (
        <>
            <Head>SW CAMP</Head>
            <CompleteView
                title="신청이 완료되었습니다"
                description={
                    <>
                        <b>선정 결과는 메일</b>로 안내됩니다.
                        <br />
                        <b>신청 정보 수정</b>을 원하신다면, 운영 기관 측에
                        문의해주세요.
                    </>
                }
            >
                <div className="d-flex">
                    <Button
                        color="link"
                        size="xl"
                        onClick={() => router.push('/')}
                        className="mr-2"
                    >
                        서비스 홈 이동
                    </Button>
                    <Button
                        color="primary"
                        size="xl"
                        onClick={() => router.push('/applications')}
                    >
                        신청 내역 확인
                    </Button>
                </div>
            </CompleteView>
        </>
    );
}

export const getServerSideProps = checkAuthSsr({shouldLogin: true, roles: [ROLE.STUDENT, ROLE.TEACHER]})(async (context) => {
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
})

export default Page;
