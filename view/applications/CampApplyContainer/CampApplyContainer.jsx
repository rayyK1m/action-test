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

function CampApplyContainer({ userData, programId }) {
    const id = useQueryParam({
        key: 'programId',
        defaultValue: programId,
    });

    const {
        data: { item: program },
    } = useGetProgram({ id });
    const createTicket = useCreateCampTicket();

    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
            [PROGRAM_KEYS.institutionKey]: program.institution.name,
            [PROGRAM_KEYS.typeKey]: `${program.type.division}/${program.type.duration}`,
            [PROGRAM_KEYS.nameKey]: program.name,
            [PROGRAM_KEYS.learningTimeKey]: `${program.learningTime}시간`,
            [USER_KEYS.phoneNumberKey]:
                (program.type.division === '방문형' && userData?.phoneNumber) ||
                '',
            [USER_KEYS.emailKey]: userData?.email,
            [CAMP_APPLY_KEYS.elementaryTargetKey]: [],
            [CAMP_APPLY_KEYS.middleTargetKey]: [],
            [CAMP_APPLY_KEYS.highTargetKey]: [],
        },
    });
    const onSubmit = (data) =>
        createTicket.mutate({
            type: program.type.division,
            formData: data,
        });

    const disabled =
        !methods.formState.isValid ||
        !!methods.formState.errors.targetGroup ||
        !!methods.formState.errors.terms;

    const getCampForm = (campType) => {
        if (campType === '방문형') return TeacherTypeCamp;
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
