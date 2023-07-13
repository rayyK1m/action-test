import Head from 'next/head';
import ProgramInfoContainer from '@/view/institution/admin/program/ProgramInfoContainer';

function Page() {
    // Note: PrgormInfoContainer에서 program 전달해줘야 함
    return (
        <>
            <Head>SW CAMP</Head>
            <ProgramInfoContainer />
        </>
    );
}

export default Page;
