import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';

import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import { CampInfoInputForm } from '../../CampForms/CampApplyForm/CampApplyForm';
import { Form } from '@goorm-dev/gds-components';

import { useCreateCampInfoContext } from '../CreateCampContainer/context';
import { getDefaultValues } from './InfoInputForm.utils';

function InfoInputForm() {
    const router = useRouter();
    const { id } = router.query;

    const { data: program } = useGetProgramAdmin(id);
    const { campInfo, updateCampInfo } = useCreateCampInfoContext();
    const methods = useForm({
        defaultValues: getDefaultValues(campInfo, program),
    });

    useEffect(() => {
        return () => {
            const data = methods.getValues();
            updateCampInfo(data);
        };
    }, []);

    return (
        <FormProvider {...methods}>
            <Form>
                <CampInfoInputForm programTargetGroup={program.targetGroup} />
            </Form>
        </FormProvider>
    );
}

export default InfoInputForm;
