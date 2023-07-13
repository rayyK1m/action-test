import { useRouter } from 'next/router';
import Head from 'next/head';
import ProgramApplyContainer from '@/view/institution/admin/program/ProgramApplyContainer';

function Page() {
    const router = useRouter();
    const { type } = router.query;

    return (
        <>
            <Head>SW CAMP</Head>
            <ProgramApplyContainer type={type} />
        </>
    );
}

export default Page;
