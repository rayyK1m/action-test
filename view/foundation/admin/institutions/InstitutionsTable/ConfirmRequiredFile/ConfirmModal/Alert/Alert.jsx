import styles from './Alert.module.scss';
import { NoticeCircleIcon, SendIcon } from '@goorm-dev/gds-icons';
import { useContext } from 'react';
import { ConfirmModalContext } from '../ConfirmModal';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { Button } from '@goorm-dev/gds-components';

function Alert() {
    const { rowData, requiredFeedback, validate, setRequiredFeedback } =
        useContext(ConfirmModalContext);
    const { submitFileStatus } = rowData;

    const showFeedback = () => {
        setRequiredFeedback(true);
    };

    switch (submitFileStatus) {
        case REQUIRED_FILE_SUBMIT_STATUS.제출.key:
            return (
                <div className={styles.alert}>
                    <NoticeCircleIcon className={styles.alertIcon} />
                    {requiredFeedback
                        ? '필수 자료 거절 사유를 작성하여 운영 기관에 자료 수정을 요청해 주세요.'
                        : '운영 기관이 제출한 문서를 확인 후 승인하거나, 거절 사유를 작성하여 수정 요청해 주세요.'}
                </div>
            );
        case REQUIRED_FILE_SUBMIT_STATUS.승인.key:
            return (
                <div className={styles.alert}>
                    <NoticeCircleIcon className={styles.alertIcon} />
                    <div className={styles.alertBox}>
                        {requiredFeedback ? (
                            <div>
                                승인한 필수 자료에 추가되어야 하는 사항을
                                작성하여 운영 기관에 요청해 주세요.
                            </div>
                        ) : (
                            <>
                                <div>
                                    운영 기관의 필수 자료를 승인한 상태입니다.
                                </div>
                                <div>
                                    추가 자료가 필요한 경우 하단의 ‘추가 자료
                                    요청하기’ 버튼을 클릭해 주세요.
                                </div>
                                <Button
                                    size="md"
                                    color="basic"
                                    outline
                                    type="button"
                                    disabled={
                                        requiredFeedback && !validate.feedback
                                    }
                                    onClick={showFeedback}
                                    icon={<SendIcon />}
                                    className="mt-2"
                                    block
                                >
                                    추가 자료 요청하기
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            );
        case REQUIRED_FILE_SUBMIT_STATUS.거절.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key:
        default:
            return <></>;
    }
}

export default Alert;
