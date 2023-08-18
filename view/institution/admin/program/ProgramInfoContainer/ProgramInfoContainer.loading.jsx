import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import ProgramInfoHeaderLoading from '../ProgramInfoHeader/ProgramInfoHeader.loading';
import { Skeleton } from '@goorm-dev/gds-components';
import styles from '../program.module.scss';

const LoadingSkeleton = () => (
    <div className={styles.skeleton}>
        <Skeleton width="7.5rem" height="1.25rem" />
        <div className={styles.divideRow}>
            <Skeleton width="100%" height="2.5rem" />
            <Skeleton width="100%" height="2.5rem" />
        </div>
        <div className={styles.divideRow}>
            <Skeleton width="100%" height="2.5rem" />
            <Skeleton width="100%" height="2.5rem" />
        </div>
    </div>
);

function ProgramInfoContainerLoading() {
    return (
        <Layout>
            <Layout.Header />
            <Layout.Main>
                <GridContainer colProps={{ md: { size: 10, offset: 1 } }}>
                    <ProgramInfoHeaderLoading />
                    <div className={styles.skeletonContainer}>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                    </div>
                </GridContainer>
            </Layout.Main>
        </Layout>
    );
}

export default ProgramInfoContainerLoading;
