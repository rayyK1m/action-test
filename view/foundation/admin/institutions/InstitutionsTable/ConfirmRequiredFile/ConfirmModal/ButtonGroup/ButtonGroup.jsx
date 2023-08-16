import { useContext } from 'react';

import styles from './ButtonGroup.module.scss';

import { ConfirmModalContext } from '../ConfirmModal';
import { Button } from '@goorm-dev/gds-components';
import { CheckCircleIcon, ErrorCircleIcon } from '@goorm-dev/gds-icons';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { useSubmitReportReview } from '@/query-hooks/useInstitutions';

function ButtonGroup() {
    const {
        isOpen,
        toggle,
        rowData,
        formData,
        requiredFeedback,
        setRequiredFeedback,
    } = useContext(ConfirmModalContext);
    const submitReportReview = useSubmitReportReview();

    const { id: institutionId, submitFileStatus } = rowData;

    const showFeedback = () => {
        setRequiredFeedback(true);
    };

    const requireExtraReport = async () => {
        await submitReportReview.mutateAsync({
            institutionId,
            feedback: formData.feedback,
            reviewStatus: REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key,
        });
        toggle();
    };

    const approve = async () => {
        await submitReportReview.mutateAsync({
            institutionId,
            reviewStatus: REQUIRED_FILE_SUBMIT_STATUS.승인.key,
        });
        toggle();
    };

    const reject = async () => {
        await submitReportReview.mutateAsync({
            institutionId,
            feedback: formData.feedback,
            reviewStatus: REQUIRED_FILE_SUBMIT_STATUS.거절.key,
        });
        toggle();
    };

    switch (submitFileStatus) {
        case REQUIRED_FILE_SUBMIT_STATUS.제출.key:
        case REQUIRED_FILE_SUBMIT_STATUS.거절.key:
            return requiredFeedback ? (
                <Button
                    size="lg"
                    color="primary"
                    type="button"
                    onClick={reject}
                >
                    수정 요청하기
                </Button>
            ) : (
                <>
                    <Button
                        size="lg"
                        icon={<ErrorCircleIcon />}
                        color="danger"
                        type="button"
                        onClick={showFeedback}
                    >
                        거절하기
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
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key:
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
        case REQUIRED_FILE_SUBMIT_STATUS.승인.key:
            return (
                <Button
                    size="lg"
                    color="primary"
                    type="button"
                    onClick={
                        requiredFeedback ? requireExtraReport : showFeedback
                    }
                >
                    추가 자료 요청하기
                </Button>
            );
        default:
            return <></>;
    }
}

export default ButtonGroup;
