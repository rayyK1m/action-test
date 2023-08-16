import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';
import useToggle from '@/hooks/useToggle';

import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import InfoForm from '@/view/institution/admin/program/ProgramInfoForm';
import EditForm from '@/view/institution/admin/program/ProgramApplyForm';
import ApplyModal from '@/view/institution/admin/program/ApplyModal/ApplyModal';

import { Button, Form } from '@goorm-dev/gds-components';
import styles from '../program.module.scss';
import {
    useGetProgramAdmin,
    usePatchProgramAdmin,
} from '@/query-hooks/usePrograms';
import ProgramInfoHeader from '../ProgramInfoHeader/ProgramInfoHeader';
import {
    getDefaultValues,
    formatProgramData,
} from './ProgramInfoContainer.utils';

function ProgramInfoContainer({ programId, userData }) {
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, toggle] = useToggle();

    const { data: program } = useGetProgramAdmin(programId);
    const patchProgram = usePatchProgramAdmin();

    const methods = useForm({
        mode: 'all',
        defaultValues: getDefaultValues(program),
    });

    const onSubmit = () => {
        const data = methods.getValues();
        const formData = formatProgramData(data, program.type.division);
        patchProgram.mutate(
            {
                programId,
                formData,
            },
            {
                onSuccess: () => setIsEdit(false),
            },
        );
    };

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <GridContainer colProps={{ md: { size: 10, offset: 1 } }}>
                    <ProgramInfoHeader
                        program={program}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                    />
                    <FormProvider {...methods}>
                        <Form
                            className={styles.forms}
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            {isEdit ? (
                                <EditForm division={program.type.division} />
                            ) : (
                                <InfoForm division={program.type.division} />
                            )}
                        </Form>
                    </FormProvider>
                    {isEdit && (
                        <>
                            <hr width="100%" className="mt-4 mb-4" />
                            <div className="d-flex justify-content-end">
                                <Button
                                    color="primary"
                                    size="xl"
                                    onClick={toggle}
                                    disabled={
                                        !_isEmpty(methods.formState.errors) ||
                                        !methods.formState.isDirty
                                    }
                                >
                                    승인 요청하기
                                </Button>
                                <ApplyModal
                                    isOpen={isOpen}
                                    toggle={toggle}
                                    handleClick={() => {
                                        onSubmit();
                                        toggle();
                                    }}
                                />
                            </div>
                        </>
                    )}
                </GridContainer>
            </Layout.Main>
            <Layout.Footer />
        </Layout>
    );
}

export default ProgramInfoContainer;
