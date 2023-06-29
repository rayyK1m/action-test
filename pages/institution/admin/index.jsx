import { Container, Col } from '@goorm-dev/gds-components';

import ProgramManageList from '@/view/institution/admin/ProgramManageList';

export const getServerSideProps = async () => {
    const { isSubmitted } = { isSubmitted: true }; // fetch

    return { props: { isSubmitted } };
};

export default function InstitutionAdminPage({ isSubmitted }) {
    return (
        <Container>
            <Col>
                <ProgramManageList isSubmitted={isSubmitted} />
            </Col>
        </Container>
    );
}
