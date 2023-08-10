import { Button, Skeleton } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from './BackButton.module.scss';

function BackButtonLoading() {
    return (
        <div className={styles.container}>
            <Button
                size="md"
                color="link"
                icon={<BackPageIcon />}
                className={styles.button}
            />
            <div className={styles.contentWrapper}>
                <Skeleton width="560px" height="36px" />
                <div className={styles.institutionWrapper}>
                    <Skeleton
                        className={styles.logo}
                        width="24px"
                        height="24px"
                    />
                    <Skeleton width="108px" height="24px" />
                </div>
            </div>
        </div>
    );
}

export default BackButtonLoading;
