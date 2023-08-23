import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import ProgramInfoCardLoading from '../ProgramInfoCard/ProgramInfoCard.loading';

import { Skeleton, Button } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from './CampApplyContainer.module.scss';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

const SkeletonItem = () => (
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

function CampApplyContainerLoading({ userData }) {
    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <GridContainer colProps={{ md: { size: 10, offset: 1 } }}>
                    <PageHeader className={styles.pageHeader}>
                        <PageHeader.Title>
                            <div className="d-flex align-items-center">
                                <Button
                                    icon={<BackPageIcon />}
                                    className="mr-2"
                                    color="link"
                                />
                                <Skeleton width="12.5rem" height="1.25rem" />
                            </div>
                        </PageHeader.Title>
                    </PageHeader>
                    <ProgramInfoCardLoading />
                    <CustomAlert className="mt-2">
                        <Skeleton width="20rem" height="1.25rem" />
                    </CustomAlert>
                    <div className={styles.skeletons}>
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                    </div>
                </GridContainer>
            </Layout.Main>
        </Layout>
    );
}

export default CampApplyContainerLoading;
