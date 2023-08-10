import { Button, Skeleton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import styles from './AnotherPrograms.module.scss';

import Content from '../Content';

function AnotherProgramsLoading() {
    return (
        <Content.Container gap="lg">
            <Content.Container.Title>
                심사중인 다른 프로그램
            </Content.Container.Title>
            <ul className={styles.list}>
                {Array.from({ length: 2 }, (_, index) => {
                    return (
                        <li key={`skeleton-${index}`} className={styles.item}>
                            <div className={styles.contents}>
                                <span className={styles.badges}>
                                    <Skeleton
                                        className={styles.badgeSkeleton}
                                        width="46.83px"
                                        height="24px"
                                    />
                                    <Skeleton
                                        className={styles.badgeSkeleton}
                                        width="36.56px"
                                        height="24px"
                                    />
                                </span>
                                <Skeleton height="24px" />
                            </div>
                            <Button
                                icon={<ChevronRightIcon />}
                                iconSide="right"
                                color="link"
                            >
                                확인하기
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </Content.Container>
    );
}

export default AnotherProgramsLoading;
