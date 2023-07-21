import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BackPageIcon } from '@goorm-dev/gds-icons';
import { Row, Col, Button } from '@goorm-dev/gds-components';

import ApplicantTable from '../ApplicantTable';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import SSRSuspense from '@/components/SSRSuspense';
import { PROGRAM_DIVISION } from '@/constants/db';
import ApplicantTableLoading from '../ApplicantTable/ApplicantTable.loading';
// import styles from './ApplicantManageList.module.scss';

const breadcrumbs = [
    {
        children: '프로그램 관리',
        to: '/institution/admin/',
    },
    {
        children: <span>프로그램 명</span>,
        to: '/institution/admin/program/[id]',
    },
    {
        children: '신청자 관리',
        to: '/institution/admin/program/[id]/applicant',
        active: true,
    },
];
function ApplicantManageList({ division }) {
    const router = useRouter();

    return (
        <GridContainer fluid="xxl">
            <Row>
                <Col>
                    <PageHeader useHrTag={true}>
                        <PageHeader.Title>
                            <PageHeader.Breadcrumb breadcrumbs={breadcrumbs} />
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
                        {division === PROGRAM_DIVISION.방문형 && (
                            <PageHeader.Description>
                                방문형의 경우, 신청자 승인을 하면 캠프가 바로
                                생성됩니다.
                            </PageHeader.Description>
                        )}
                    </PageHeader>

                    <SSRSuspense
                        key={router.asPath}
                        fallback={<ApplicantTableLoading division={division} />}
                    >
                        <ApplicantTable />
                    </SSRSuspense>
                </Col>
            </Row>
        </GridContainer>
    );
}

export default ApplicantManageList;
