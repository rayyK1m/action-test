import { Button, Col, Container, Row } from '@goorm-dev/gds-components';

import styles from './ApplyButton.module.scss';

const ApplyButtonLoading = () => {
    return (
        <>
            <Container fluid="xxl" className={styles.container}>
                <Row>
                    <Col xs={{ size: 10, offset: 1 }}>
                        <Button size="xl" color="primary" block>
                            신청하기
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ApplyButtonLoading;
