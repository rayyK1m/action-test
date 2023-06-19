import Head from 'next/head';
import cn from 'classnames';

import { Button, DatePicker } from '@goorm-dev/gds-components';

import styles from './Home.module.scss';

export default function Home() {
    return (
        <>
            <Head>
                <title>SW CAMP HOME</title>
            </Head>
            <main
                className={cn(
                    styles.container,
                    'd-flex flex-column bg-gray-300',
                )}
            >
                <h1>GDS 테스트</h1>

                <Button>버튼</Button>
                <DatePicker />
            </main>
        </>
    );
}
