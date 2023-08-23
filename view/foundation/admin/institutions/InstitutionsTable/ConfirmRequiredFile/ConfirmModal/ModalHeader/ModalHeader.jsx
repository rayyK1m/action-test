import { ModalHeader as GDSModalHeader } from '@goorm-dev/gds-components';
import { useContext } from 'react';
import { ConfirmModalContext } from '../ConfirmModal';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import Badge from './Badge';

import styles from './ModalHeader.module.scss';

function ModalHeader() {
    const { toggle, rowData, requiredFeedback } =
        useContext(ConfirmModalContext);

    const { submitFileStatus } = rowData;

    switch (true) {
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.제출.key &&
            requiredFeedback:
            return (
                <GDSModalHeader toggle={toggle}>
                    <span>거절 사유 작성하기</span>
                </GDSModalHeader>
            );
        case submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.승인.key &&
            requiredFeedback:
            return (
                <GDSModalHeader toggle={toggle}>
                    <span>추가 자료 요청하기</span>
                </GDSModalHeader>
            );
        default:
            return (
                <GDSModalHeader toggle={toggle}>
                    <div className={styles.modalHeader}>
                        <span>필수 자료 제출 내역</span>
                        <Badge />
                    </div>
                </GDSModalHeader>
            );
    }
}

export default ModalHeader;
