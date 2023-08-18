import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import { useGetCamp, usePatchCamp } from '@/query-hooks/useCamps';

import {
    checkIsInfoTemporary,
    getDefaultValues,
    parseData,
} from './Info.utils';

import { CampInfoForm } from '../../../CampForms/CampInfoForm/CampInfoForm';
import { CampEditForm } from '../../../CampForms/CampApplyForm/CampApplyForm';
import { Form, Button } from '@goorm-dev/gds-components';
import styles from './Info.module.scss';
import { PROGRAM_DIVISION } from '@/constants/db';
import { checkIsFoundationPage } from '@/utils';

function Info({ onChangeTabs }) {
    const router = useRouter();
    const { id, campId } = router.query;
    const [isEdit, setIsEdit] = useState(false);
    const isFoundationPage = useMemo(
        () => checkIsFoundationPage(router.pathname),
        [router.pathname],
    );

    const { data: program } = useGetProgramAdmin(id);
    const { data: camp } = useGetCamp(campId);
    const patchCamp = usePatchCamp();

    const methods = useForm({
        values: getDefaultValues({
            isEdit,
            data: { camp, program },
        }),
    });

    useEffect(() => {
        methods.reset(
            getDefaultValues({
                isEdit,
                data: { camp, program },
            }),
        );
    }, [isEdit]);

    const handlePatchCamp = async () => {
        const data = methods.getValues();
        const formData = parseData({
            fields: methods.formState.dirtyFields,
            getValues: methods.getValues,
        });
        const isDraft =
            program.type.division === PROGRAM_DIVISION.방문형
                ? false
                : checkIsInfoTemporary(data);

        await patchCamp.mutateAsync({
            campId,
            formData: { isDraft, ...formData },
        });

        setIsEdit(false);
    };

    return (
        <FormProvider {...methods}>
            <Form>
                {isEdit ? (
                    <>
                        <CampEditForm program={program} />
                        <hr width="100%" className="mt-4 mb-4" />
                        <div className={styles.buttons}>
                            <Button
                                size="xl"
                                color="link"
                                onClick={() => setIsEdit(false)}
                            >
                                취소
                            </Button>
                            <Button
                                size="xl"
                                color="primary"
                                onClick={handlePatchCamp}
                            >
                                저장하기
                            </Button>
                        </div>
                    </>
                ) : (
                    <CampInfoForm
                        program={program}
                        onClickEdit={() => setIsEdit(true)}
                        isFoundationPage={isFoundationPage}
                    />
                )}
            </Form>
        </FormProvider>
    );
}

export default Info;
