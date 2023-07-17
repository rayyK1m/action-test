import { Button, Skeleton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import styles from './InstitutionInfo.module.scss';

function InstitutionInfoLoading() {
    return (
        <div className={styles.container}>
            <div className={styles.image} />
            <div className={styles.content}>
                <h5>
                    <Skeleton height="27px" />
                </h5>
                <Button
                    outline
                    color="basic"
                    iconSide="right"
                    icon={<ChevronRightIcon />}
                    disabled
                >
                    프로그램 더보기
                </Button>
            </div>
        </div>
    );
}

export default InstitutionInfoLoading;
