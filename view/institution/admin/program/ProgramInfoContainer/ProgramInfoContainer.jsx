import { useState, useMemo } from 'react';
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
import { PROGRAM_APPLY_KEYS } from '../program.contants';
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
        mode: 'onTouched',
        defaultValues: getDefaultValues(program),
    });

    const targetFields = methods.watch([
        PROGRAM_APPLY_KEYS.elementaryTargetKey,
        PROGRAM_APPLY_KEYS.middleTargetKey,
        PROGRAM_APPLY_KEYS.highTargetKey,
    ]);
    const isTargetError = useMemo(
        () => _isEmpty(targetFields.flat()),
        [targetFields],
    );

    const onSubmit = () => {
        const data = methods.getValues();
        const formData = formatProgramData(data);
        patchProgram.mutate({
            id: programId,
            formData,
        });

        setIsEdit(false);
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
                                <InfoForm />
                            )}
                        </Form>
                    </FormProvider>
                    {isEdit && (
                        <>
                            <hr width="100%" className="mt-4 mb-4" />
                            <div className="d-flex justify-content-end">
                                <Button color="link" size="xl" className="mr-3">
                                    임시 저장하기
                                </Button>
                                <Button
                                    size="xl"
                                    onClick={toggle}
                                    disabled={
                                        !methods.formState.isDirty ||
                                        !methods.formState.isValid ||
                                        isTargetError
                                    }
                                >
                                    승인 요청하기
                                </Button>
                                <ApplyModal
                                    isOpen={isOpen}
                                    toggle={toggle}
                                    handleClick={onSubmit}
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
