import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import cn from 'classnames';

import { Form, Button, Label } from '@goorm-dev/gds-components';

import DownloadButton from '@/components/DownloadButton/DownloadButton';
import { FileInputItem } from '@/view/components/ValidateFormItem';
import { useGetCamp, useSubmitCampReport } from '@/query-hooks/useCamps';
import useSession from '@/query-hooks/useSession';

import styles from './PostFileReport.module.scss';

import { CAMP_FILE_LIST, ROLE } from '@/constants/db';

function PostFileReport() {
    const {
        종료_제출: { children: POST_FILE_INPUTS },
    } = CAMP_FILE_LIST;

    const {
        query: { campId },
    } = useRouter();

    /** server state */
    const { mutate } = useSubmitCampReport();
    const { data: postFileReport } = useGetCamp(campId);
    const {
        data: { role },
    } = useSession.GET();
    const postFileReportValues = postFileReport[0];

    /** 지역 state */
    const forms = useForm({
        values: {
            [POST_FILE_INPUTS.결과_보고서.id]: postFileReportValues
                ? [POST_FILE_INPUTS.결과_보고서.id]
                : undefined,
            [POST_FILE_INPUTS.기타.id]: postFileReportValues
                ? [POST_FILE_INPUTS.기타.id]
                : undefined,
        },
    });
    const { watch, getValues } = forms;
    const formValues = getValues();
    const isRequiredFieldsFilled = !Object.values(POST_FILE_INPUTS)
        .filter(({ isRequired }) => isRequired)
        .every(({ id }) => watch(id));

    const handleButtonClick = async () => {
        mutate({
            campId,
            formData: formValues,
            reportType: CAMP_FILE_LIST.종료_제출.id,
        });
    };

    return (
        <div className="d-flex flex-column">
            <h5 className="mb-4 text-gray-700">종료 제출</h5>
            <FormProvider {...forms}>
                <Form>
                    <div className={styles.formItems}>
                        {role === ROLE.INSTITUTION ? (
                            <>
                                {
                                    /**
                                     * [운영 기관 Adimn] 파일 업로드 및 수정이 가능한 FileInput 노출
                                     */
                                    Object.keys(POST_FILE_INPUTS).map(
                                        (item) => (
                                            <FileInputItem
                                                key={POST_FILE_INPUTS[item].id}
                                                fileKey={
                                                    POST_FILE_INPUTS[item].id
                                                }
                                                label={
                                                    POST_FILE_INPUTS[item].label
                                                }
                                                maxFileSize={
                                                    POST_FILE_INPUTS[item]
                                                        .maxFileSize
                                                }
                                                isRequired={
                                                    POST_FILE_INPUTS[item]
                                                        .isRequired
                                                }
                                                pathType="camp"
                                            />
                                        ),
                                    )
                                }
                            </>
                        ) : (
                            <>
                                {
                                    /**
                                     * [재단 Admin] 파일 다운로드가 가능한 Button 노출
                                     */
                                    Object.keys(formValues).map((key) => {
                                        const { filename, url } =
                                            formValues[key] || {};
                                        const { label } = POST_FILE_INPUTS[key];

                                        return (
                                            <div
                                                key={key}
                                                className={cn(
                                                    'd-flex flex-column',
                                                    styles.formItem,
                                                )}
                                            >
                                                <Label>{label}</Label>

                                                {filename ? (
                                                    <DownloadButton
                                                        key={filename}
                                                        size="md"
                                                        href={url}
                                                        filename={filename}
                                                    >
                                                        {filename}
                                                    </DownloadButton>
                                                ) : (
                                                    <p className="subtitle-1 text-gray-600">
                                                        없음
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })
                                }
                            </>
                        )}
                    </div>

                    {role === ROLE.INSTITUTION && (
                        <>
                            <hr className="w-100 my-4" />
                            <div className="d-flex justify-content-end">
                                <Button
                                    size="xl"
                                    color="primary"
                                    disabled={isRequiredFieldsFilled}
                                    onClick={handleButtonClick}
                                >
                                    등록하기
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </FormProvider>
        </div>
    );
}

export default PostFileReport;
