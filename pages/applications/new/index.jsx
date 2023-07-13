import { useForm, FormProvider } from 'react-hook-form';
import { Button, Form, Container, Row, Col } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';

import ProgramInfoCard from '@/view/applications/ProgramInfoCard';
import {
    TeacherTypeCamp,
    StudentTypeCamp,
} from '@/view/applications/CampApplyForm';

import styles from '../applications.module.scss';

const mockData = {
    program: {
        institution: '구름',
        type: { camp: '집합형', duration: '장기' },
        title: '제주교대(신화월드) 상반기 새싹캠프 인공지능 올림픽',
        applyDate: {
            start: new Date('2023-06-08 11:30'),
            end: new Date('2023-06-18 20:00'),
        },
        educationDate: {
            start: new Date('2023-06-08 11:30'),
            end: new Date('2023-06-18 20:00'),
        },
        learningTime: '18',
        educationLocation: '인천 연수중학교',
        cost: 0,
        notice: '신청 정보 수정을 원하신다면, 운영 기관 측에 문의해주세요.',
    },
    user: {
        email: 'goormee@goorm.io',
        phoneNumber: '010-1234-5678',
    },
};

function CampApplicationPage({
    program = mockData.program,
    user = mockData.user,
}) {
    const methods = useForm();
    const onSubmit = (data) => console.log(data);

    const getCampForm = (campType) => {
        if (campType === '방문형') return TeacherTypeCamp;
        return StudentTypeCamp;
    };

    const { title, contents } = getCampForm(program.type.camp);

    return (
        <Container className={styles.container}>
            <Row>
                <Col md={{ size: 8, offset: 2 }}>
                    <div className="d-flex align-items-center">
                        <Button
                            icon={<BackPageIcon />}
                            className="mr-2"
                            color="link"
                        />
                        <h3 className="d-inline mb-0">{title}</h3>
                    </div>
                    <ProgramInfoCard program={program} />
                    <FormProvider {...methods}>
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            {contents({ program, user })}
                        </Form>
                        <div className="d-flex justify-content-end">
                            <Button size="xl">신청하기</Button>
                        </div>
                    </FormProvider>
                </Col>
            </Row>
        </Container>
    );
}

export default CampApplicationPage;
