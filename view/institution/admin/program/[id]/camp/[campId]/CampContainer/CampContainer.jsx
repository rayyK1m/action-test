import Link from 'next/link';
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

import { ROLE } from '@/constants/db';

function CampContainer() {
    const router = useRouter();
    const { id: programId, campId, institutionId } = router.query;

    const { data: userData } = useSession.GET();
    const { data: program } = useGetProgramAdmin(programId);
    const {
        data: { class: classNumber },
    } = useGetCamp(campId);

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
                                <div className="d-flex align-items-center">
                                    <Button
                                        color="link"
                                        tag={Link}
                                        href={
                                            userData.role === ROLE.INSTITUTION
                                                ? `/institution/admin/program/${programId}/camp?division=${program.type.division}`
                                                : `/foundation/admin/programs/${programId}/camps?division=${program.type.division}&institutionId=${institutionId}`
                                        }
                                        className="d-flex justify-content-center mr-2"
                                        icon={<BackPageIcon />}
                                    />

                                    <h3>
                                        ({classNumber}분반) {program.name}
                                    </h3>
                                </div>
                            </PageHeader.Title>
                        </PageHeader>
                        <CampFunnel division={program.type.division} />
                    </div>
                </GridContainer>
            </Layout.Main>

            <Layout.Footer />
        </Layout>
    );
}

export default CampContainer;
