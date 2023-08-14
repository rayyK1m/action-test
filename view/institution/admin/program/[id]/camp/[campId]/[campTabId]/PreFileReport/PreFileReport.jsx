import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { Form, Button } from '@goorm-dev/gds-components';

import { FileInputItem } from '@/view/components/ValidateFormItem';
import { useGetCamp, useSubmitCampReport } from '@/query-hooks/useCamps';

import styles from './PreFileReport.module.scss';

import { CAMP_FILE_LIST } from '@/constants/db';

function PreFileReport() {
    const {
        사전_제출: { children: preFileInputs },
    } = CAMP_FILE_LIST;

    const {
        query: { campId },
    } = useRouter();

    /** server state */
    const { mutate } = useSubmitCampReport();
    const { data } = useGetCamp(campId);
    const preFileReportValues = data.preFileReport[0];

    /** 지역 state */
    const preFileFormObject = useForm({
        values: {
            [preFileInputs.안전_관리_체크리스트.id]: preFileReportValues
                ? preFileReportValues[preFileInputs.안전_관리_체크리스트.id]
                : undefined,
            [preFileInputs.안전_관리_서약서.id]: preFileReportValues
                ? preFileReportValues[preFileInputs.안전_관리_서약서.id]
                : undefined,
            [preFileInputs.성범죄조회_동의서.id]: preFileReportValues
                ? preFileReportValues[preFileInputs.성범죄조회_동의서.id]
                : undefined,
            [preFileInputs.기타.id]: preFileReportValues
                ? preFileReportValues[preFileInputs.기타.id]
                : undefined,
        },
    });

    // TODO: preFileFormObject.watch(['안전_관리_체크리스트', '안전_관리_서약서', .. ]) 안먹는 문제 해결하기
    const { 기타, ...requiredFileInputs } = preFileFormObject.watch();
    const isDisabledSaveButton = Object.values(requiredFileInputs).some(
        (i) => i === undefined,
    );

    const handleButtonClick = async () => {
        const formData = preFileFormObject.getValues();
        mutate({ campId, formData, reportType: CAMP_FILE_LIST.사전_제출.id });
    };

    return (
        <div className="d-flex flex-column">
            <h5 className="mb-4">사전 제출</h5>
            <FormProvider {...preFileFormObject}>
                <Form>
                    <div className={styles.formItems}>
                        {Object.keys(preFileInputs).map((item) => (
                            <FileInputItem
                                key={preFileInputs[item].id}
                                fileKey={preFileInputs[item].id}
                                label={preFileInputs[item].label}
                                maxFileSize={preFileInputs[item].maxFileSize}
                                isRequired={
                                    preFileInputs[item].id !==
                                    preFileInputs.기타.id
                                }
                                pathType="camp"
                            />
                        ))}
                    </div>

                    <hr className="w-100 my-4" />
                    <div className="d-flex justify-content-end">
                        <Button
                            size="xl"
                            color="primary"
                            disabled={isDisabledSaveButton}
                            onClick={handleButtonClick}
                        >
                            등록하기
                        </Button>
                    </div>
                </Form>
            </FormProvider>
        </div>
    );
}

export default PreFileReport;
