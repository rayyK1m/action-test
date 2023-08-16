import { createContext, useState } from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from '@goorm-dev/gds-components';

import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';

import RequireFiles from './RequireFiles';
import Feedback from './Feedback';

import styles from './ConfirmModal.module.scss';
import ButtonGroup from './ButtonGroup';
import Alert from './Alert';
import Badge from './Badge';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

/**
 * @type {ReturnType<typeof createContext<import('./ConfirmModal.type').ConfirmModalContextValue>>}
 */
export const ConfirmModalContext = createContext();

/**
 *
 * @param {import('./ConfirmModal.type').ConfirmModalProps} props
 * @returns
 */
function ConfirmModal({ isOpen, toggle, rowData }) {
    const { submitFileStatus } = rowData;
    const [requiredFeedback, setRequiredFeedback] = useState(false);
    const [formData, setFormData] = useState({ feedback: '' });

    const changeFormData = (newFormData = {}) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...newFormData,
        }));
    };

    if (!isOpen) return <></>;

    return (
        <ConfirmModalContext.Provider
            value={{
                isOpen,
                toggle,
                rowData,
                formData,
                changeFormData,
                requiredFeedback,
                setRequiredFeedback,
            }}
        >
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>
                    {!requiredFeedback && <span>필수 자료 제출 내역</span>}
                    {requiredFeedback &&
                        submitFileStatus ===
                            (REQUIRED_FILE_SUBMIT_STATUS.제출.key ||
                                REQUIRED_FILE_SUBMIT_STATUS.거절됨.key) && (
                            <span>거절 사유 작성하기</span>
                        )}
                    {requiredFeedback &&
                        submitFileStatus ===
                            REQUIRED_FILE_SUBMIT_STATUS.승인됨.key && (
                            <span>추가 자료 요청하기</span>
                        )}
                    <Badge />
                </ModalHeader>

                <ModalBody className={styles.modalBody}>
                    <Alert />
                    {requiredFeedback ? <Feedback /> : <RequireFiles />}
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup />
                </ModalFooter>
            </Modal>
        </ConfirmModalContext.Provider>
    );
}

export default ConfirmModal;
