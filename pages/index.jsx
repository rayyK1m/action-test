import Head from 'next/head';
import ProgramListContainer from '@/view/main/ProgramListContainer';
import { withReactQuerySsr } from '@/server/utils/auth';
import { dehydrate } from '@tanstack/react-query';
import useSession from '@/query-hooks/useSession';

export default function MainPage() {
    const { data: userData } = useSession.GET();
    console.log({ userData });

    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <h1>HOME</h1>
            <ProgramListContainer />
        </>
    );
}

export const getServerSideProps = withReactQuerySsr((context) => {
    return {
        props: {
            dehydratedState: dehydrate(context.req.queryClient),
        },
    };
});
