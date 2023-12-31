import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@goorm-dev/gds-components';
import styles from './PannelLoading.module.scss';
import ProgramInfoCard from '@/view/applications/ProgramInfoCard';

const LoadingSkeleton = () => (
    <div className={styles.skeleton}>
        <Skeleton width="7.5rem" height="1.25rem" />
        <Skeleton width="23rem" height="2.5rem" />
        <Skeleton width="23rem" height="2.5rem" />
    </div>
);

function PannelLoading() {
    return (
        <div>
            <PageHeader useHrTag={true}>
                <PageHeader.Title>
                    <Skeleton
                        width="7.5rem"
                        height="1.25rem"
                        className="mb-2"
                    />
                    <Skeleton width="20rem" height="1.25rem" />
                </PageHeader.Title>
            </PageHeader>
            <ProgramInfoCard.Loading className="mt-4" />
            <div className={styles.gridSkeleton}>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
        </div>
    );
}

export default PannelLoading;
