import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
    Form,
    Button,
    Input,
    Label,
    FormGroup,
} from '@goorm-dev/gds-components';

import { useGetCamp, useSubmitCampReport } from '@/query-hooks/useCamps';
import useSession from '@/query-hooks/useSession';

import styles from './PostReport.module.scss';

import { CAMP_FILE_LIST, ROLE } from '@/constants/db';

function PostReport() {
    const {
        결과_보고: { children: POST_INPUTS },
    } = CAMP_FILE_LIST;

    const {
        query: { campId },
    } = useRouter();

    /** server state */
    const { mutate, isLoading: isSubmittingReport } = useSubmitCampReport();
    const {
        data: { postReport },
        isFetching: isGettingReport,
    } = useGetCamp(campId);
    const { data: userData } = useSession.GET();
    const postReportValues = postReport[0];

    /** 지역 state */
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (formData) => {
        mutate({
            campId,
            formData,
            reportType: CAMP_FILE_LIST.결과_보고.id,
        });
    };

    return (
        <div className="d-flex flex-column">
            <h5 className="mb-4 text-gray-700">결과 보고</h5>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroups}>
                    {Object.keys(POST_INPUTS).map((item) => (
                        <FormGroup key={POST_INPUTS[item].id} className="mb-0">
                            <Label for={POST_INPUTS[item].id}>
                                {POST_INPUTS[item].label}

                                {POST_INPUTS[item].isRequired && (
                                    <span className="ml-1 text-danger">*</span>
                                )}
                            </Label>

                            {userData.role === ROLE.FOUNDATION &&
                            !postReportValues?.[POST_INPUTS[item].id] ? (
                                <p className="text-gray-600">없음</p>
                            ) : (
                                <Input
                                    readOnly={userData.role === ROLE.FOUNDATION}
                                    defaultValue={
                                        userData.role === ROLE.INSTITUTION
                                            ? postReportValues?.[
                                                  POST_INPUTS[item].id
                                              ]
                                            : postReportValues?.[
                                                  POST_INPUTS[item].id
                                              ] || '0000'
                                    }
                                    type="number"
                                    min={0}
                                    max={1000}
                                    bsSize="lg"
                                    data-required={POST_INPUTS[item].isRequired}
                                    id={POST_INPUTS[item].id}
                                    placeholder={POST_INPUTS[item].placeholder}
                                    disabled={
                                        isSubmittingReport || isGettingReport
                                    }
                                    {...register(POST_INPUTS[item].id, {
                                        required: POST_INPUTS[item].isRequired,
                                        valueAsNumber: true,
                                    })}
                                />
                            )}
                        </FormGroup>
                    ))}
                </div>
                {userData.role === ROLE.INSTITUTION && (
                    <>
                        <hr className="w-100 my-4" />
                        <div className="d-flex justify-content-end">
                            <Button
                                size="xl"
                                color="primary"
                                disabled={
                                    !isValid ||
                                    isSubmittingReport ||
                                    isGettingReport
                                }
                                type="submit"
                            >
                                등록하기
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}

export default PostReport;
