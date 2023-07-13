import { useForm, FormProvider } from 'react-hook-form';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader';
import FormContainer from '@/view/components/FormContainer/FormContainer';
import EditForm from '@/view/institution/admin/program/ProgramApplyForm';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from '../program.module.scss';

import { PROGRAM_APPLY_KEYS } from '@/view/institution/admin/program/program.contants';

import { Form, Button, Badge } from '@goorm-dev/gds-components';

function ProgramApplyContainer({ type }) {
    const methods = useForm({
        mode: 'onTouched',
        defaultValues: {
            [PROGRAM_APPLY_KEYS.nameKey]: '',
            [PROGRAM_APPLY_KEYS.typeKey]: { camp: type, duration: '장기' },
            [PROGRAM_APPLY_KEYS.priceKey]: 0,
            [PROGRAM_APPLY_KEYS.elementaryTargetKey]: [],
            [PROGRAM_APPLY_KEYS.middleTargetKey]: [],
            [PROGRAM_APPLY_KEYS.highTargetKey]: [],
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        router.push('/institution/admin/program/new/complete');
    };
    return (
        <Layout>
            <Layout.Header />
            <Layout.Main>
                <FormContainer>
                    <PageHeader useHrTag={true}>
                        <PageHeader.Title>
                            <PageHeader.Breadcrumb
                                breadcrumbs={[
                                    {
                                        children: '프로그램 관리',
                                        active: false,
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
                                        {type}
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
                            <EditForm camp={type} />
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
                </FormContainer>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}
export default ProgramApplyContainer;
