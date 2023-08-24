import React from 'react';

import { Skeleton, Button } from '@goorm-dev/gds-components';

import styles from './ListItem.module.scss';

function ListItemLoading() {
    return (
        <div className={styles.container}>
            <Skeleton
                width="20rem"
                height="11.25rem"
                className={styles.image}
            />

            <div className={styles.contents}>
                <Skeleton
                    width="23.375rem"
                    height="1.6875rem"
                    className="mb-3"
                />
                <Skeleton width="17.25rem" height="1.125rem" className="mb-2" />
                <Skeleton width="17.25rem" height="1.125rem" />
            </div>

            <div className={styles.buttons}>
                {' '}
                <Button
                    size="lg"
                    color="link"
                    theme="light"
                    className="mr-1"
                    disabled
                >
                    신청 정보 확인
                </Button>
                <Button size="lg" color="primary" disabled>
                    채널 이동
                </Button>
            </div>
        </div>
    );
}

export default ListItemLoading;
