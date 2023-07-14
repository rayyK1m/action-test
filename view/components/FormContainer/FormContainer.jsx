import { Container, Row, Col } from '@goorm-dev/gds-components';
import styles from './FormContainer.module.scss';

const FormContainer = ({ children }) => {
    return (
        <Container className={styles.container}>
            <Row>
                <Col md={{ size: 10, offset: 1 }}>{children}</Col>
            </Row>
        </Container>
    );
};

export default FormContainer;
