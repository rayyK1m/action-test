import { Input } from '@goorm-dev/gds-components';
import FormContent from '../FormContent';

import { useContext } from 'react';
import { ConfirmModalContext } from '../ConfirmModal';

import styles from './Feedback.module.scss';
import { FEEDBACK_INPUT_MAP } from './Feedback.constants';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

function Feedback() {
    const { rowData, formData, changeFormData } =
        useContext(ConfirmModalContext);

    const { submitFileStatus } = rowData;

    const onChangeFeedback = (e) => {
        changeFormData({ feedback: e.target.value });
    };

    switch (submitFileStatus) {
        case REQUIRED_FILE_SUBMIT_STATUS.거절.key:
        case REQUIRED_FILE_SUBMIT_STATUS.미제출.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key:
        case REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key:
            return <></>;
        case REQUIRED_FILE_SUBMIT_STATUS.승인.key:
        case REQUIRED_FILE_SUBMIT_STATUS.제출.key:
        default:
            return (
                <FormContent.Box>
                    <FormContent.Box.Title isRequired>
                        {FEEDBACK_INPUT_MAP[submitFileStatus].LABEL}
                    </FormContent.Box.Title>
                    <Input
                        type="textarea"
                        size="lg"
                        placeholder={
                            FEEDBACK_INPUT_MAP[submitFileStatus].PLACEHOLDER
                        }
                        minlength={10}
                        maxlength={500}
                        rows={4}
                        value={formData.feedback}
                        onChange={onChangeFeedback}
                    />
                </FormContent.Box>
            );
    }
}

export default Feedback;
