import cn from 'classnames';
import { Skeleton } from '@goorm-dev/gds-components';
import styles from './ProgramInfoCard.module.scss';

function ProgramInfoCardLoading({ className }) {
    return (
        <div className={cn(styles.info, className)}>
            <Skeleton width="20rem" height="1.25rem" className="mb-4" />
            <Skeleton width="12.5rem" height="1.25rem" className="mb-1" />
            <Skeleton width="12.5rem" height="1.25rem" className="mb-1" />
        </div>
    );
}

export default ProgramInfoCardLoading;
