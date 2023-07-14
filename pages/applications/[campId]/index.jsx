import { FormProvider, useForm } from 'react-hook-form';

import {
    TeacherInfoForm,
    StudentInfoForm,
} from '@/view/applications/CampForms/CampInfoForm/CampInfoForm';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader';
import FormContainer from '@/view/components/FormContainer/FormContainer';
import ProgramInfoCard from '@/view/applications/ProgramInfoCard';

import { Button, Form } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';

import { PROGRAM_KEYS } from '@/view/applications/CampForms/camp.constants';

const mockData = {
    program: {
        institution: '구름',
        type: { division: '방문형', duration: '장기' },
        name: '제주교대(신화월드) 상반기 새싹캠프 인공지능 올림픽',
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
            middleSchool: [],
            highSchool: [],
        },
    },
    // NOTE : 방문형 캠프 임시 데이터
    camp_teacher: {
        userName: '김구름',
        schoolName: '구름초등학교',
        schoolType: '일반학교',
        operateLocation: '서울특별시',
        mainEducator: '주강사',
        subEducator: '보조강사',
        // targetGroup: { elementarySchool, middleSchool, highSchool }
        elementarySchool: [1, 2, 3],
        middleSchool: [],
        highSchool: [],
        educationDate: {
            start: new Date('2023-06-10 12:00'),
            end: new Date('2023-06-15 20:00'),
        },
        learningTime: 10,
        expectedUserCount: 15,
    },
    // NOTE : 집합형 캠프 임시 데이터
    camp_student: {
        userName: '김구름',
        phoneNumber: '010-1234-5678',
        operateLocation: '서울특별시',
        schoolName: '구름초등학교',
        // targetGroup: { elementarySchool, middleSchool, highSchool }
        elementarySchool: [1],
        middleSchool: [],
        highSchool: [],
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
    camp = mockData.camp_teacher,
}) {
    const methods = useForm({
        defaultValues: {
            ...camp,
            ...user,
            [PROGRAM_KEYS.institutionKey]: program.institution,
            [PROGRAM_KEYS.nameKey]: program.title,
            [PROGRAM_KEYS.typeKey]: `${program.type.camp}/${program.type.duration}`,
            [PROGRAM_KEYS.learningTimeKey]: `${program.learningTime}시간`,
        },
    });

    const getCampForm = (campType) => {
        if (campType === '방문형') return TeacherInfoForm;
        return StudentInfoForm;
    };

    const { title, contents } = getCampForm(program.type.camp);

    return (
        <Layout>
            <Layout.Header />
            <Layout.Main>
                <FormContainer>
                    <PageHeader>
                        <PageHeader.Title>
                            <div className="d-flex align-items-center">
                                <Button
                                    icon={<BackPageIcon />}
                                    className="mr-2"
                                    color="link"
                                />
                                <h3>{title}</h3>
                            </div>
                        </PageHeader.Title>
                    </PageHeader>
                    <ProgramInfoCard
                        program={program}
                        notice="신청 정보 수정을 원하신다면, 운영 기관 측에 문의해주세요."
                    />
                    <FormProvider {...methods}>
                        <Form>{contents({ program, user, camp })}</Form>
                    </FormProvider>
                </FormContainer>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export default CampInfoPage;
