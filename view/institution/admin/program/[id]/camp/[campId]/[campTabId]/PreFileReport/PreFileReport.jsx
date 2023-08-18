import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import cn from 'classnames';

import { Form, Button } from '@goorm-dev/gds-components';

import DownloadButton from '@/components/DownloadButton/DownloadButton';
import { FileInputItem } from '@/view/components/ValidateFormItem';
import { useGetCamp, useSubmitCampReport } from '@/query-hooks/useCamps';

import styles from './PreFileReport.module.scss';

import { CAMP_FILE_LIST, ROLE } from '@/constants/db';
import useSession from '@/query-hooks/useSession';
import { Label } from '@goorm-dev/gds-components/dist/cjs';

function PreFileReport() {
    const {
        사전_제출: { children: PRE_FILE_INPUTS },
    } = CAMP_FILE_LIST;

    const {
        query: { campId },
    } = useRouter();

    /** server state */
    const { mutate } = useSubmitCampReport();
    const {
        data: { preFileReport },
    } = useGetCamp(campId);
    const {
        data: { role },
    } = useSession.GET();
    const preFileReportValues = preFileReport[0];
    console.log(preFileReportValues);

    /** 지역 state */
    const forms = useForm({
        values: {
            [PRE_FILE_INPUTS.안전_관리_체크리스트.id]: preFileReportValues
                ? preFileReportValues[PRE_FILE_INPUTS.안전_관리_체크리스트.id]
                : undefined,
            [PRE_FILE_INPUTS.안전_관리_서약서.id]: preFileReportValues
                ? preFileReportValues[PRE_FILE_INPUTS.안전_관리_서약서.id]
                : undefined,
            [PRE_FILE_INPUTS.성범죄조회_동의서.id]: preFileReportValues
                ? preFileReportValues[PRE_FILE_INPUTS.성범죄조회_동의서.id]
                : undefined,
            [PRE_FILE_INPUTS.기타.id]: preFileReportValues
                ? preFileReportValues[PRE_FILE_INPUTS.기타.id]
                : undefined,
        },
    });
    const { watch, getValues } = forms;
    const formValues = getValues();
    const isRequiredFieldsFilled = !Object.values(PRE_FILE_INPUTS)
        .filter(({ isRequired }) => isRequired)
        .every(({ id }) => watch(id));

    const handleButtonClick = async () => {
        mutate({
            campId,
            formData: formValues,
            reportType: CAMP_FILE_LIST.사전_제출.id,
        });
    };

    return (
        <div className="d-flex flex-column">
            <h5 className="mb-4 text-gray-700">사전 제출</h5>
            <FormProvider {...forms}>
                <Form>
                    <div className={styles.formItems}>
                        {role === ROLE.INSTITUTION ? (
                            <>
                                {
                                    /**
                                     * [운영 기관 Adimn] 파일 업로드 및 수정이 가능한 FileInput 노출
                                     */
                                    Object.keys(PRE_FILE_INPUTS).map((item) => (
                                        <FileInputItem
                                            key={PRE_FILE_INPUTS[item].id}
                                            fileKey={PRE_FILE_INPUTS[item].id}
                                            label={PRE_FILE_INPUTS[item].label}
                                            maxFileSize={
                                                PRE_FILE_INPUTS[item]
                                                    .maxFileSize
                                            }
                                            isRequired={
                                                PRE_FILE_INPUTS[item].isRequired
                                            }
                                            pathType="camp"
                                        />
                                    ))
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
                                        const { label } = PRE_FILE_INPUTS[key];

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

export default PreFileReport;
