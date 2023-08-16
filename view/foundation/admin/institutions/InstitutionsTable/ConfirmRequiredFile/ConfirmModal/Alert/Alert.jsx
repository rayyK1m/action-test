import CustomAlert from '@/components/CustomAlert/CustomAlert';

import styles from './Alert.module.scss';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import { useContext } from 'react';
import { ConfirmModalContext } from '../ConfirmModal';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

function Alert() {
    const { rowData, requiredFeedback } = useContext(ConfirmModalContext);
    const { submitFileStatus } = rowData;

    switch (submitFileStatus) {
        case REQUIRED_FILE_SUBMIT_STATUS.제출.key:
        case REQUIRED_FILE_SUBMIT_STATUS.거절.key:
            return (
                <CustomAlert
                    leftIcon={NoticeCircleIcon}
                    className={styles.alert}
                >
                    {requiredFeedback
                        ? '필수 자료 거절 사유를 작성하여 운영 기관에 자료 수정을 요청해 주세요.'
                        : '운영 기관이 제출한 문서를 확인 후 승인하거나, 거절 사유를 작성하여 수정 요청해 주세요.'}
                </CustomAlert>
            );
        case REQUIRED_FILE_SUBMIT_STATUS.승인.key:
            return (
                <CustomAlert
                    leftIcon={NoticeCircleIcon}
                    className={styles.alert}
                >
                    {requiredFeedback ? (
                        '승인한 필수 자료에 추가되어야 하는 사항을 작성하여 운영 기관에 요청해 주세요.'
                    ) : (
                        <>
                            <div>
                                운영 기관의 필수 자료를 승인한 상태입니다.
                            </div>
                            <div>
                                추가 자료가 필요한 경우 하단의 ‘추가 자료
                                요청하기’ 버튼을 클릭해 주세요.
                            </div>
                        </>
                    )}
                </CustomAlert>
            );
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key:
        default:
            return <></>;
    }
}

export default Alert;
