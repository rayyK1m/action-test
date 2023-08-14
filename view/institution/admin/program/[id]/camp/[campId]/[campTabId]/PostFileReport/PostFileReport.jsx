import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import { Form, Button } from '@goorm-dev/gds-components';

import { FileInputItem } from '@/view/components/ValidateFormItem';
import { useGetCamp, useSubmitCampReport } from '@/query-hooks/useCamps';

import styles from './PostFileReport.module.scss';

import { CAMP_FILE_LIST } from '@/constants/db';

function PostFileReport() {
    const {
        종료_제출: { children: postFileInputs },
    } = CAMP_FILE_LIST;

    const {
        query: { campId },
    } = useRouter();

    /** server state */
    const { mutate } = useSubmitCampReport();
    const { data } = useGetCamp(campId);
    const postFileReportValues = data.postFileReport[0];

    /** 지역 state */
    const postFileFormObject = useForm({
        values: {
            [postFileInputs.결과_보고서.id]: postFileReportValues
                ? [postFileInputs.결과_보고서.id]
                : undefined,
            [postFileInputs.기타.id]: postFileReportValues
                ? [postFileInputs.기타.id]
                : undefined,
        },
    });

    // TODO: postFileFormObject.watch(['결과_보고서', '기타', .. ]) 안먹는 문제 해결하기
    const { 기타, ...requiredFileInputs } = postFileFormObject.watch();
    const isDisabledSaveButton = Object.values(requiredFileInputs).some(
        (i) => i === undefined,
    );

    const handleButtonClick = async () => {
        const formData = postFileFormObject.getValues();
        mutate({ campId, formData, reportType: CAMP_FILE_LIST.종료_제출.id });
    };

    return (
        <div className="d-flex flex-column">
            <h5 className="mb-4">종료 제출</h5>
            <FormProvider {...postFileFormObject}>
                <Form>
                    <div className={styles.formItems}>
                        {Object.keys(postFileInputs).map((item) => (
                            <FileInputItem
                                key={postFileInputs[item].id}
                                fileKey={postFileInputs[item].id}
                                label={postFileInputs[item].label}
                                maxFileSize={postFileInputs[item].maxFileSize}
                                isRequired={
                                    postFileInputs[item].id !==
                                    postFileInputs.기타.id
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

export default PostFileReport;
