import Head from 'next/head';
import cn from 'classnames';

import { Button, DatePicker } from '@goorm-dev/gds-components';

import styles from './Home.module.scss';

export default function Home({ userData }) {
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

                <div>
                    <div>
                        {userData
                            ? `${userData.name}으로 로그인 됨`
                            : '로그인 안됨'}
                    </div>
                    <div>
                        {userData ? (
                            <a href="/logout">로그아웃</a>
                        ) : (
                            <a href="/login">로그인</a>
                        )}
                    </div>
                </div>

                <Button>버튼</Button>
                <DatePicker />
            </main>
        </>
    );
}
