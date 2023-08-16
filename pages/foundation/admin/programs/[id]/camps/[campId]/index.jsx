import Head from 'next/head';

import { CAMP_TABS } from '@/constants/navigations';

export const getServerSideProps = async (context) => {
    const {
        resolvedUrl,
        query: { institutionId },
    } = context;

    /**
     * [캠프 상세 페이지 Path 비즈니스 로직 1]
     *
     * - "/info" 로 redirect
     *
     * @see `./[campTabId]/index.jsx`
     */
    return {
        redirect: {
            destination: `${resolvedUrl}${CAMP_TABS.기본_정보.path}?institutionId=${institutionId}`,
            permanent: false,
        },
    };
};

export default function Page() {
    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
        </>
    );
}
