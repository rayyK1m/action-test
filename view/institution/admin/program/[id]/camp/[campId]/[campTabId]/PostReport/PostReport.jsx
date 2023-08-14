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

import styles from './PostReport.module.scss';

import { CAMP_FILE_LIST } from '@/constants/db';

function PostReport() {
    const {
        결과_보고: { children: postReport },
    } = CAMP_FILE_LIST;

    const {
        query: { campId },
    } = useRouter();

    /** server state */
    const { mutate, isLoading: isSubmittingReport } = useSubmitCampReport();
    const { data, isFetching: isGettingReport } = useGetCamp(campId);
    const postReportValues = data.postReport[0];

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
            <h5 className="mb-4">종료 제출</h5>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroups}>
                    {Object.keys(postReport).map((item) => (
                        <FormGroup key={postReport[item].id} className="mb-0">
                            <Label for={postReport[item].id}>
                                {postReport[item].label}

                                {postReport[item].isRequired && (
                                    <span className="ml-1 text-danger">*</span>
                                )}
                            </Label>
                            <Input
                                defaultValue={
                                    postReportValues
                                        ? postReportValues[postReport[item].id]
                                        : undefined
                                }
                                type="number"
                                min={0}
                                bsSize="lg"
                                data-required={postReport[item].isRequired}
                                id={postReport[item].id}
                                placeholder={postReport[item].placeholder}
                                disabled={isSubmittingReport || isGettingReport}
                                {...register(postReport[item].id, {
                                    required: postReport[item].isRequired,
                                    valueAsNumber: true,
                                })}
                            />
                        </FormGroup>
                    ))}
                </div>
                <hr className="w-100 my-4" />
                <div className="d-flex justify-content-end">
                    <Button
                        size="xl"
                        color="primary"
                        disabled={
                            !isValid || isSubmittingReport || isGettingReport
                        }
                        type="submit"
                    >
                        등록하기
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default PostReport;
