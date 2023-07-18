import { useForm, FormProvider } from 'react-hook-form';

import {
    TeacherTypeCamp,
    StudentTypeCamp,
} from '@/view/applications/CampForms/CampApplyForm/CampApplyForm';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader';
import FormContainer from '@/view/components/FormContainer/FormContainer';
import ProgramInfoCard from '@/view/applications/ProgramInfoCard';

import { Button, Form } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';

import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    USER_KEYS,
} from '@/view/applications/CampForms/camp.constants';
import { useGetProgram } from '@/query-hooks/usePrograms';
import { useCreateCampTicket } from '@/query-hooks/uesCampTickets';
import useQueryParam from '@/hooks/useQueryParam';
import { PROGRAM_DIVISION } from '@/constants/db';

import { formatTeacherData } from './CampApplyContainer.utils';
import { useRouter } from 'next/router';

function CampApplyContainer({ userData, programId }) {
    const router = useRouter();

    const id = useQueryParam({
        key: 'programId',
        defaultValue: programId,
    });

    const {
        data: { item: program },
    } = useGetProgram({ id });
    const createTicket = useCreateCampTicket();

    {
        /* NOTE: 010-1234-1234는 캠프 신청을 위한 임시방편(핸드폰 번호가 형식에 맞지 않으면 캠프 신청이 안됨)
        테스트 유저에는 userCertification 정보가 없어서, 핸드폰 번호를 못 가져오므로 일단 임시로 추가해둠. 
        유저 데이터에 추가되도록 수정 예정 */
    }
    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
            [PROGRAM_KEYS.institutionKey]: program.institution.name,
            [PROGRAM_KEYS.typeKey]: program.type,
            [PROGRAM_KEYS.nameKey]: program.name,
            [PROGRAM_KEYS.learningTimeKey]: `${program.learningTime}시간`,
            [USER_KEYS.phoneNumberKey]:
                program.type.division === PROGRAM_DIVISION.방문형
                    ? userData?.phoneNumber || '010-1234-1234'
                    : '',
            [USER_KEYS.emailKey]: userData?.email,
            [CAMP_APPLY_KEYS.elementaryTargetKey]: [],
            [CAMP_APPLY_KEYS.middleTargetKey]: [],
            [CAMP_APPLY_KEYS.highTargetKey]: [],
        },
    });

    const onSubmit = (data) => {
        const {
            elementarySchool,
            middleSchool,
            highSchool,
            institution,
            programName,
            learningTime,
            type,
            ...rest
        } = data;

        const formatData = {
            targetGroup: { elementarySchool, middleSchool, highSchool },
            ...rest,
        };

        let formData = formatData;
        if (program.type.division === PROGRAM_DIVISION.방문형) {
            formData = formatTeacherData(formatData);
        }

        createTicket.mutate({
            role: userData.role,
            userId: userData.id,
            formData: {
                programId: program.id,
                institutionId: program.institution.id,
                ...formData,
            },
        });
        router.push('/applications/new/complete');
    };

    const disabled =
        !methods.formState.isValid ||
        !!methods.formState.errors.targetGroup ||
        !!methods.formState.errors.terms;

    const getCampForm = (campType) => {
        if (campType === PROGRAM_DIVISION.방문형) return TeacherTypeCamp;
        return StudentTypeCamp;
    };

    const { title, contents } = getCampForm(program.type.division);

    return (
        <Layout>
            <Layout.Header userData={userData} />
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
                        notice="프로그램은 최대 3개까지 신청 가능합니다."
                    />
                    <FormProvider {...methods}>
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            {contents({ program, userData })}
                            <div className="d-flex justify-content-end">
                                <Button size="xl" disabled={disabled}>
                                    신청하기
                                </Button>
                            </div>
                        </Form>
                    </FormProvider>
                </FormContainer>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export default CampApplyContainer;
