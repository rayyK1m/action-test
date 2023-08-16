import { useContext } from 'react';
import styles from './Badge.module.scss';

import { Badge as GDSBadge } from '@goorm-dev/gds-components';
import { ConfirmModalContext } from '../ConfirmModal';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { CheckCircleIcon } from '@goorm-dev/gds-icons';

function Badge() {
    const { rowData } = useContext(ConfirmModalContext);

    const { submitFileStatus } = rowData;

    switch (submitFileStatus) {
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key:
            return (
                <GDSBadge className="ml-2" size="md" color="warning">
                    수정 요청됨
                </GDSBadge>
            );
        case REQUIRED_FILE_SUBMIT_STATUS.승인.key:
            return (
                <GDSBadge
                    className="ml-2"
                    size="md"
                    color="success"
                    leftIcon={CheckCircleIcon}
                >
                    {REQUIRED_FILE_SUBMIT_STATUS.승인.text}
                </GDSBadge>
            );
        case REQUIRED_FILE_SUBMIT_STATUS.제출.key:
        case REQUIRED_FILE_SUBMIT_STATUS.거절.key:
        default:
            return <></>;
    }
}

export default Badge;
