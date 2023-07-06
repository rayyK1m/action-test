import { Container, Row, Col } from '@goorm-dev/gds-components';

import styles from './GridContainer.module.scss';

function GridContainer({ className, colProps, children }) {
    return (
        <Container fluid="xxl" className={styles.container}>
            <Row>
                <Col className={className} {...colProps}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default GridContainer;
