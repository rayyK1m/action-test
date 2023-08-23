import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';

import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';

import useSession from '@/query-hooks/useSession';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import { useGetCamp } from '@/query-hooks/useCamps';

import CampFunnel from '../CampFunnel';
import { getCampBreadcrumbs } from './CampContainer.utils';
import { checkIsFoundationPage } from '@/utils';

import styles from './CampContainer.module.scss';

function CampContainer() {
    const router = useRouter();
    const { id: programId, campId, institutionId } = router.query;

    const { data: userData } = useSession.GET();
    const { data: program } = useGetProgramAdmin(programId);
    const {
        data: { class: classNumber },
    } = useGetCamp(campId);

    const isFoundationPage = checkIsFoundationPage(router.pathname);

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <GridContainer colProps={{ xs: { size: 10, offset: 1 } }}>
                    <div className="d-flex flex-column">
                        <PageHeader className="mb-4">
                            <PageHeader.Title>
                                <PageHeader.Breadcrumb
                                    breadcrumbs={getCampBreadcrumbs({
                                        program,
                                        institutionId,
                                        role: userData.role,
                                    })}
                                />
                                <div className={styles.container}>
                                    <Button
                                        color="link"
                                        tag={Link}
                                        href={
                                            isFoundationPage
                                                ? `/foundation/admin/programs/${programId}/camps?division=${program.type.division}&institutionId=${institutionId}`
                                                : `/institution/admin/program/${programId}/camp?division=${program.type.division}`
                                        }
                                        className="d-flex justify-content-center mr-2"
                                        icon={<BackPageIcon />}
                                    />
                                    <div className={styles.contentWrapper}>
                                        <h3>
                                            ({classNumber}분반) {program.name}
                                        </h3>
                                        {isFoundationPage && (
                                            <div
                                                className={
                                                    styles.institutionWrapper
                                                }
                                            >
                                                <Image
                                                    src={
                                                        program.institution.logo
                                                            .url
                                                    }
                                                    alt="institution"
                                                    width={24}
                                                    height={24}
                                                    className={styles.logo}
                                                />
                                                {program.institution.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </PageHeader.Title>
                        </PageHeader>
                        <CampFunnel division={program.type.division} />
                    </div>
                </GridContainer>
            </Layout.Main>

            <Layout.ContributorBanner />
            <Layout.Footer />
        </Layout>
    );
}

export default CampContainer;
