import { Input } from '@goorm-dev/gds-components';
import FormContent from '../FormContent';

import { useContext } from 'react';
import { ConfirmModalContext } from '../ConfirmModal';

import styles from './Feedback.module.scss';

function Feedback() {
    const { formData, changeFormData } = useContext(ConfirmModalContext);

    const onChangeFeedback = (e) => {
        changeFormData({ feedback: e.target.value });
    };

    return (
        <FormContent.Box>
            <FormContent.Box.Title isRequired>거절 사유</FormContent.Box.Title>
            <Input
                type="textarea"
                size="lg"
                placeholder="필수 자료를 거절하는 사유와 수정 방향을 구제척으로 입력해 주세요. (최소 10자, 최대 500자)"
                minlength={10}
                maxlength={500}
                rows={4}
                value={formData.feedback}
                onChange={onChangeFeedback}
            />
        </FormContent.Box>
    );
}

export default Feedback;
