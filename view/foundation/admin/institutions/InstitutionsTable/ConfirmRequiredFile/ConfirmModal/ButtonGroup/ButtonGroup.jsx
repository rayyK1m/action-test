import { useContext } from 'react';

import styles from './ButtonGroup.module.scss';

import { ConfirmModalContext } from '../ConfirmModal';
import { Button } from '@goorm-dev/gds-components';
import { CheckCircleIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { useSubmitReportReview } from '@/query-hooks/useInstitutions';
import { toast } from '@goorm-dev/gds-toastify';

function ButtonGroup() {
    const {
        isOpen,
        toggle,
        rowData,
        formData,
        validate,
        requiredFeedback,
        setRequiredFeedback,
    } = useContext(ConfirmModalContext);
    const submitReportReview = useSubmitReportReview();

    const { id: institutionId, submitFileStatus } = rowData;

    const showFeedback = () => {
        setRequiredFeedback(true);
    };
    const hideFeedback = () => {
        setRequiredFeedback(false);
    };

    const requireExtraReport = async () => {
        await submitReportReview.mutateAsync({
            institutionId,
            feedback: formData.feedback,
            reviewStatus: REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key,
        });

        toast('추가 자료를 요청했습니다.', {
            type: toast.TYPE.SUCCESS,
        });
        toggle();
    };

    const approve = async () => {
        await submitReportReview.mutateAsync({
            institutionId,
            reviewStatus: REQUIRED_FILE_SUBMIT_STATUS.승인.key,
        });
        toast('필수 자료를 승인했습니다.', {
            type: toast.TYPE.SUCCESS,
        });
        toggle();
    };

    const reject = async () => {
        if (!validate.feedback) return;

        await submitReportReview.mutateAsync({
            institutionId,
            feedback: formData.feedback,
            reviewStatus: REQUIRED_FILE_SUBMIT_STATUS.거절.key,
        });
        toast('필수 자료 수정 요청이 완료되었습니다.', {
            type: toast.TYPE.SUCCESS,
        });
        toggle();
    };

    switch (true) {
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.제출.key &&
            !requiredFeedback:
            return (
                <>
                    <Button
                        size="lg"
                        color="danger"
                        type="button"
                        onClick={showFeedback}
                    >
                        거절 사유 작성하기
                    </Button>
                    <Button
                        size="lg"
                        icon={<CheckCircleIcon />}
                        color="success"
                        type="button"
                        onClick={approve}
                    >
                        승인하기
                    </Button>
                </>
            );
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.제출.key &&
            requiredFeedback:
            return (
                <div className={styles.feedbackWrapper}>
                    <Button
                        size="lg"
                        color="link"
                        type="button"
                        onClick={hideFeedback}
                    >
                        이전
                    </Button>
                    <Button
                        size="lg"
                        color="primary"
                        type="button"
                        disabled={requiredFeedback && !validate.feedback}
                        onClick={reject}
                    >
                        수정 요청하기
                    </Button>
                </div>
            );
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.승인.key &&
            requiredFeedback:
            return (
                <div className={styles.feedbackWrapper}>
                    <Button
                        size="lg"
                        color="link"
                        type="button"
                        onClick={hideFeedback}
                    >
                        이전
                    </Button>
                    <Button
                        size="lg"
                        color="primary"
                        type="button"
                        disabled={requiredFeedback && !validate.feedback}
                        onClick={requireExtraReport}
                    >
                        추가 자료 요청하기
                    </Button>
                </div>
            );
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.거절.key:
        case submitFileStatus ===
            REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
        case submitFileStatus ===
            REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key:
            return (
                <Button
                    size="lg"
                    icon={<CheckCircleIcon />}
                    color="success"
                    type="button"
                    onClick={approve}
                >
                    승인하기
                </Button>
            );
        default:
            return <></>;
    }
}

export default ButtonGroup;
