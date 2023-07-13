import { useState } from 'react';
import Head from 'next/head';

import { Button, SidePannel } from '@goorm-dev/gds-components';
import Layout from '@/components/Layout/Layout';

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };
    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <Layout>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <Layout.Header />
            <Layout.Banner />
            <Layout.Main className="p-5">
                <h1>SidePannel EXAMPLE</h1>

                <Button onClick={onOpen}>open !</Button>
                <SidePannel isOpen={isOpen} onClose={onClose}>
                    <SidePannel.Header />
                    <SidePannel.Body>
                        <h1>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book. It has survived not
                            only five centuries, but also the leap into
                            electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum. Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum has
                            been the standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </h1>
                    </SidePannel.Body>
                </SidePannel>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
