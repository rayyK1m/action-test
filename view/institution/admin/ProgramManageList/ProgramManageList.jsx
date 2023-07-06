import React from 'react';

import { Container, Col, Row } from '@goorm-dev/gds-components';

import SSRSuspense from '@/components/SSRSuspense';
import Header from '../Header/Header.jsx';
import ProgramTable from '../ProgramTable/ProgramTable.jsx';
import ProgramTableLoading from '../ProgramTable/ProgramTable.loading.jsx';

import styles from './ProgramManageList.module.scss';
import { useRouter } from 'next/router.js';

function ProgramManageList({ isSubmitted }) {
    const router = useRouter();
    return (
        <Container fluid="xxl">
            <Row>
                <Col>
                    <div className={styles.container}>
                        <Header isSubmitted={isSubmitted} />

                        <SSRSuspense
                            fallback={<ProgramTableLoading />}
                            key={router.asPath}
                        >
                            <ProgramTable />
                        </SSRSuspense>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProgramManageList;
