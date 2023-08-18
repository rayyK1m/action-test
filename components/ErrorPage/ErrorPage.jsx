import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';

import { Button, Card, CardBody } from '@goorm-dev/gds-components';

import styles from './ErrorPage.module.scss';

const DescriptionBox = ({ children }) => {
    return <div className={styles.description}>{children}</div>;
};

const BROWSER_CACHE_REF_URL =
    'https://support.google.com/accounts/answer/32050?hl=ko&co=GENIE.Platform%3DDesktop';
const SECRET_MODE_REF_URL =
    'https://support.google.com/chrome/answer/95464?hl=ko-KR&co=GENIE.Platform%3DDesktop';
const ERROR_CONTENTS = {
    403: {
        alt: '403 ERROR',
        imageSrc: 'https://statics.goorm.io/images/gds/error_403.svg',
        title: '현재 페이지에 대한 접근 권한이 없습니다.',
        description:
            '방문하시려는 페이지는 권한이 있는 회원만 사용할 수 있습니다.\n서비스 이용 및 사용 권한에 관련한 사항은 고객센터 이메일로 문의하여 주시기 바랍니다.',
        children: (
            <div>
                <p>∙ 고객센터 이메일 : newsac@goorm.io</p>
                <p>∙ 상담 시간 : 10:00 ~ 17:00</p>
            </div>
        ),
    },
    404: {
        alt: '404 ERROR',
        imageSrc: 'https://statics.goorm.io/images/gds/error_404.svg',
        title: '페이지를 찾을 수 없습니다.',
        description:
            '페이지의 주소가 잘못되었거나 변경되어 요청한 페이지를 찾을 수 없습니다.\n다음의 내용을 확인하시고, 해결되지 않을 시 고객센터 이메일로 연락해 주시기 바랍니다.',
        children: (
            <div>
                <p>
                    ∙ <b>올바른 URL</b>을 입력했는지 확인해 주세요.
                </p>
                <p>
                    ∙ 오류를 해결하기 위해{' '}
                    <a
                        href={BROWSER_CACHE_REF_URL}
                        target="_blank"
                        className={styles.aTag}
                    >
                        브라우저 캐시를 삭제
                    </a>
                    하거나{' '}
                    <a
                        href={SECRET_MODE_REF_URL}
                        target="_blank"
                        className={styles.aTag}
                    >
                        시크릿모드에서 실행
                    </a>
                    해 주세요.
                </p>
                <p>∙ 고객센터 이메일 : newsac@goorm.io</p>
                <p>∙ 상담 시간 : 10:00 ~ 17:00</p>
            </div>
        ),
    },
    500: {
        alt: '500 ERROR',
        imageSrc: 'https://statics.goorm.io/images/gds/error_500.svg',
        title: '현재 페이지를 이용할 수 없습니다.',
        description:
            '문의사항은 아래의 이메일 주소로 언제든지 연락주시길 바라며,\n저희가 개발한 서비스가 여러분들께 유용하게 쓰여지길 다시 한 번 소망합니다!',
        children: (
            <div>
                <p>
                    ∙ <b>페이지 새로고침</b>을 하거나 잠시 후 다시 시도해
                    주세요.
                </p>
                <p>∙ 고객센터 이메일 : newsac@goorm.io</p>
                <p>∙ 상담 시간 : 10:00 ~ 17:00</p>
            </div>
        ),
    },
};
function ErrorPage({ statusCode, message }) {
    const router = useRouter();

    // TODO: 추후 적절한 에러로깅 추가 필요
    console.error(message);
    return (
        <div className={styles.background}>
            <Card className={styles.card}>
                <CardBody className={styles.cardBody}>
                    <div className="d-flex flex-column align-items-center">
                        <Image
                            src={ERROR_CONTENTS[statusCode].imageSrc}
                            alt={ERROR_CONTENTS[statusCode].alt}
                            width={160}
                            height={120}
                        />
                        <div className={styles.text}>
                            <h5>{ERROR_CONTENTS[statusCode].title}</h5>
                            <p className="mt-1">
                                {ERROR_CONTENTS[statusCode].description}
                            </p>
                        </div>
                    </div>

                    <DescriptionBox>
                        {ERROR_CONTENTS[statusCode].children}
                    </DescriptionBox>

                    <div className="d-flex">
                        <Button
                            size="xl"
                            color="primary"
                            onClick={() => {
                                router.push('/');
                            }}
                        >
                            서비스 메인으로
                        </Button>
                        <Button
                            size="xl"
                            color="link"
                            className="ml-3"
                            onClick={() => {
                                router.back();
                            }}
                        >
                            이전 페이지로
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ErrorPage;
