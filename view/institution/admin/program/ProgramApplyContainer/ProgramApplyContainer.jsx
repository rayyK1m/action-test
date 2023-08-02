import { useForm, FormProvider } from 'react-hook-form';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader';
import EditForm from '@/view/institution/admin/program/ProgramApplyForm';
import GridContainer from '@/components/GridContainer';

import { PROGRAM_APPLY_KEYS } from '@/view/institution/admin/program/program.contants';

import { Form, Button, Badge } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from '../program.module.scss';
import useSession from '@/query-hooks/useSession';
import { formatData } from './ProgramApplyContainer.utils';
import { useCreateProgram } from '@/query-hooks/usePrograms';

function ProgramApplyContainer({ division }) {
    const { data: userData } = useSession.GET();

    const createProgram = useCreateProgram();

    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
            [PROGRAM_APPLY_KEYS.typeKey]: { division, duration: '장기' },
            [PROGRAM_APPLY_KEYS.elementaryTargetKey]: [],
            [PROGRAM_APPLY_KEYS.middleTargetKey]: [],
            [PROGRAM_APPLY_KEYS.highTargetKey]: [],
        },
    });

    const onSubmit = (data) => {
        const formData = formatData(data);
        createProgram.mutate({
            userId: userData.id,
            institutionId: userData.institutionId,
            formData,
        });
    };
    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <GridContainer colProps={{ md: { size: 10, offset: 1 } }}>
                    <PageHeader useHrTag={true}>
                        <PageHeader.Title>
                            <PageHeader.Breadcrumb
                                breadcrumbs={[
                                    {
                                        children: '프로그램 관리',
                                        active: false,
                                        to: '/institution/admin',
                                    },
                                    {
                                        children: '새 프로그램 등록하기',
                                        active: true,
                                    },
                                ]}
                            />
                            <div className="d-flex align-items-center">
                                <Button
                                    icon={<BackPageIcon />}
                                    className="mr-2"
                                    color="link"
                                />
                                <div className="d-flex align-items-center">
                                    <h3 className="d-inline">
                                        새 프로그램 등록하기
                                    </h3>
                                    <Badge size="md" className="ml-1">
                                        {division}
                                    </Badge>
                                </div>
                            </div>
                        </PageHeader.Title>
                    </PageHeader>
                    <FormProvider {...methods}>
                        <Form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className={styles.forms}
                        >
                            <EditForm division={division} />
                            <Button
                                type="submit"
                                size="xl"
                                // NOTE: setError로 에러 처리한 fileInput, checkbox는 따로 valid 처리해줘야함
                                disabled={!methods.formState.isValid}
                            >
                                승인 요청하기
                            </Button>
                        </Form>
                    </FormProvider>
                </GridContainer>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
export default ProgramApplyContainer;
