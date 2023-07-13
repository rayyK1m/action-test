import cn from 'classnames';

import { AvatarSkeleton, Skeleton } from '@goorm-dev/gds-components';
import styles from './InstitutionCard.module.scss';

function InstitutionCardLoading() {
    return (
        <div
            className={cn(
                'd-flex align-items-center rounded',
                styles.container,
            )}
        >
            <AvatarSkeleton size="xl" />

            <span className={styles.contents}>
                <Skeleton width="30%" height="1.1875rem" className="mb-1" />
                <Skeleton width="70%" height="1.3125rem" />
            </span>
        </div>
    );
}

export default InstitutionCardLoading;
