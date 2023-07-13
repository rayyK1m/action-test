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
                title="승인 요청 완료"
                description={`프로그램 등록 요청이 완료되었습니다.\n재단의 승인이 완료되면 신청자가 프로그램 정보를 확인할 수 있습니다.`}
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
