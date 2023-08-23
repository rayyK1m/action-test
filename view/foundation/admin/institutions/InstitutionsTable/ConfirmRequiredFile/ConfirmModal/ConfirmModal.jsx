import { createContext, useState } from 'react';
import { Modal, ModalBody } from '@goorm-dev/gds-components';

import RequireFiles from './RequireFiles';
import Feedback from './Feedback';

import styles from './ConfirmModal.module.scss';
import Alert from './Alert';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

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
    const [requiredFeedback, setRequiredFeedback] = useState(false);
    const [formData, setFormData] = useState({ feedback: '' });

    const validate = {
        feedback:
            10 <= formData.feedback.length && formData.feedback.length <= 500,
    };

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
                validate,
                changeFormData,
                requiredFeedback,
                setRequiredFeedback,
            }}
        >
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader />

                <ModalBody className={styles.modalBody}>
                    <Alert />
                    {requiredFeedback ? <Feedback /> : <RequireFiles />}
                </ModalBody>

                <ModalFooter />
            </Modal>
        </ConfirmModalContext.Provider>
    );
}

export default ConfirmModal;
