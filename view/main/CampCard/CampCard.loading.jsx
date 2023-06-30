import cn from 'classnames';
import { Skeleton } from '@goorm-dev/gds-components';
import styles from './CampCard.module.scss';

export default function CampCardLoading() {
    return (
        <div className={styles.container}>
            <div
                className={cn(
                    styles.imageContainer,
                    'position-relative bg-gray-300 rounded mb-2',
                )}
            >
                <Skeleton width={'100%'} height={'100%'} />
            </div>

            <h6 className={cn('mb-2', styles.title)}>
                <Skeleton width={'100%'} />
            </h6>
            <span className="d-flex mb-1">
                <Skeleton width={'80%'} />
            </span>
            <span className="d-flex">
                <Skeleton width={'80%'} />
            </span>
        </div>
    );
}
