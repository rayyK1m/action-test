import { Button, Container, Col, Row, Form } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';

import ProgramInfoCard from '@/view/applications/ProgramInfoCard';
import {
    TeacherApplyInfo,
    StudentApplyInfo,
} from '@/view/applications/CampApplyForm';

import styles from '../applications.module.scss';
import { FormProvider, useForm } from 'react-hook-form';

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
        price: 0,
        notice: '신청 정보 수정을 원하신다면, 운영 기관 측에 문의해주세요.',
        targetGroup: {
            elementarySchool: [1, 2, 3, 4, 5, 6],
        },
    },
    // NOTE : 방문형 캠프 임시 데이터 (스키마 확정 후 변경 예정)
    camp_teacher: {
        // campType: '방문형',
        manager: {
            name: '김구름',
            phoneNumber: '010-1234-5678',
            email: 'goormee@goorm.io',
            school: {
                name: '구름초등학교',
                type: '일반학교',
                location: '서울특별시',
            },
        },
        educator: {
            mainEducator: '주강사',
            coEducator: '보조강사',
        },
        target: {
            targetGroup: { elementarySchool: [1, 2, 3] },
            headCount: 15,
            class: '3분반',
        },
        educationData: {
            start: new Date('2023-06-10 12:00'),
            end: new Date('2023-06-15 20:00'),
        },
        learningTime: 10,
    },
    // NOTE : 집합형 캠프 임시 데이터 (스키마 확정 후 변경 예정)
    camp_student: {
        // campType: '집합형',
        name: '김구름',
        phoneNumber: '010-1234-5678',
        email: 'goormee@goorm.io',
        location: '서울특별시',
        school: '구름초등학교',
        targetGroup: {
            elementarySchool: [1],
        },
    },
    user: {
        email: 'goormee@goorm.io',
        phoneNumber: '010-1234-5678',
    },
};

function CampInfoPage({
    program = mockData.program,
    user = mockData.user,
    // NOTE : 방문형 확인을 위해서는 mockData.camp_teacher로 변경
    camp = mockData.camp_student,
}) {
    const methods = useForm();

    const getCampForm = (campType) => {
        if (campType === '방문형') return TeacherApplyInfo;
        return StudentApplyInfo;
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
                        <Form>{contents({ program, user, camp })}</Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container>
    );
}

export default CampInfoPage;
