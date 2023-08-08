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
            <Skeleton height="36px" />
        </div>
    );
}

export default BackButtonLoading;
