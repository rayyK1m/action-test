import { useRouter } from 'next/router';
import Head from 'next/head';

import CompleteView from '@/view/components/CompleteView/CompleteView';

import { Button } from '@goorm-dev/gds-components';

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

export default Page;
