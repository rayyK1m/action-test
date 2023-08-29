import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';

import useSession from '@/query-hooks/useSession';
import { useCreateProgram } from '@/query-hooks/usePrograms';

import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader';
import ApplyForm from '@/view/institution/admin/program/ProgramApplyForm';
import GridContainer from '@/components/GridContainer';

import { Form, Button, Badge } from '@goorm-dev/gds-components';
import { BackPageIcon } from '@goorm-dev/gds-icons';
import styles from '../program.module.scss';
import { formatData } from './ProgramApplyContainer.utils';

import { PROGRAM_DIVISION, PROGRAM_DURATION } from '@/constants/db';
import { PROGRAM_APPLY_KEYS } from '@/view/institution/admin/program/program.contants';
import { setDateWithHourAndMinute } from '@/utils';

function ProgramApplyContainer({ division }) {
    const router = useRouter();
    const { data: userData } = useSession.GET();
    const isStudent = division === PROGRAM_DIVISION.집합형;

    const createProgram = useCreateProgram();

    const methods = useForm({
        mode: 'all',
        defaultValues: {
            [PROGRAM_APPLY_KEYS.durationKey]: PROGRAM_DURATION.지속,
            [PROGRAM_APPLY_KEYS.elementaryTargetKey]: [],
            [PROGRAM_APPLY_KEYS.middleTargetKey]: [],
            [PROGRAM_APPLY_KEYS.highTargetKey]: [],
            [PROGRAM_APPLY_KEYS.educationStartTimeKey]:
                setDateWithHourAndMinute(new Date(), 0, 0),
            [PROGRAM_APPLY_KEYS.educationEndTimeKey]: setDateWithHourAndMinute(
                new Date(),
                23,
                55,
            ),
        },
    });

    const onSubmit = (data) => {
        const formData = formatData(data, division);
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
                                    onClick={() =>
                                        router.push('/institution/admin')
                                    }
                                />
                                <div className="d-flex align-items-center">
                                    <h3 className="d-inline">
                                        새 프로그램 등록하기
                                    </h3>
                                    <Badge
                                        size="md"
                                        className="ml-1"
                                        color={
                                            isStudent ? 'success' : 'primary'
                                        }
                                        pill
                                    >
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
                            <ApplyForm division={division} />
                            <Button
                                type="submit"
                                size="xl"
                                disabled={!methods.formState.isValid}
                                color="primary"
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
