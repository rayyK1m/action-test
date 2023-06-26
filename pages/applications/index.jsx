import { Container, Col } from '@goorm-dev/gds-components';
import ApplyList from '@/view/applications/ApplyList/ApplyList.jsx';

export default function ApplyPage() {
    return (
        <Container>
            <h2>헤더</h2>
            <Col md={{ size: 10, offset: 1 }}>
                <ApplyList />
            </Col>

            <h2>푸터</h2>
        </Container>
    );
}
