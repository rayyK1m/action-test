import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BackPageIcon } from '@goorm-dev/gds-icons';
import { Button } from '@goorm-dev/gds-components';
import { PROGRAM_DIVISION } from '@/constants/db';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import SSRSuspense from '@/components/SSRSuspense';

import ApplicantTableLoading from '../ApplicantTable/ApplicantTable.loading';
import ApplicantTable from '../ApplicantTable';
import { getBreadcrumbs } from './ApplicantManageList.utils';

function ApplicantManageList() {
    const router = useRouter();
    const { id } = router.query;
    const { data: program } = useGetProgramAdmin(id);

    return (
        <GridContainer fluid="xxl">
            <PageHeader useHrTag={true}>
                <PageHeader.Title>
                    <PageHeader.Breadcrumb
                        breadcrumbs={getBreadcrumbs(program)}
                    />
                    <div className="d-flex align-items-center">
                        <Button
                            color="link"
                            tag={Link}
                            href={'/institution/admin'}
                            className="d-flex justify-content-center mr-2"
                            icon={<BackPageIcon />}
                        />
                        <h3>신청자 관리</h3>
                    </div>
                </PageHeader.Title>
                {program.type.division === PROGRAM_DIVISION.방문형 && (
                    <PageHeader.Description>
                        방문형의 경우, 신청자 승인을 하면 캠프가 바로
                        생성됩니다.
                    </PageHeader.Description>
                )}
            </PageHeader>

            <SSRSuspense
                key={router.asPath}
                fallback={
                    <ApplicantTableLoading division={program.type.division} />
                }
            >
                <ApplicantTable />
            </SSRSuspense>
        </GridContainer>
    );
}

export default ApplicantManageList;
