import cn from 'classnames';

import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';

import styles from './CampManageContainer.module.scss';

function CampManageContainerLoading() {
    return (
        <Layout>
            <Layout.Header />
            <Layout.Main>
                <GridContainer>
                    <div className="d-flex flex-column">
                        <PageHeader useHrTag>
                            <PageHeader.Title className="d-flex justify-content-between">
                                <h3>캠프 관리</h3>
                            </PageHeader.Title>
                        </PageHeader>

                        <div
                            className={cn(
                                styles.subHeader,
                                'd-flex justify-content-between align-items-center',
                            )}
                        >
                            <h5>전체 캠프</h5>
                        </div>
                    </div>
                </GridContainer>
            </Layout.Main>

            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export default CampManageContainerLoading;
