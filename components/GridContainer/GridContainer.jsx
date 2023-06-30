import cn from 'classnames';
import { Container, Row, Col } from '@goorm-dev/gds-components';

import styles from './GridContainer.module.scss';

function GridContainer({ className, children }) {
    return (
        <Container fluid="xxl" className={styles.container}>
            <Row>
                <Col className={className}>{children}</Col>
            </Row>
        </Container>
    );
}

export default GridContainer;
