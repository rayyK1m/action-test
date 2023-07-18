import {
    ReadOnlyProgramForm,
    ReadOnlyManagerForm,
    ReadOnlyTeacherForm,
    ReadOnlyTargetForm,
    ReadOnlyLearningTimeForm,
} from './TeacherInfoForm';
import {
    ReadOnlyStudentProgramForm,
    ReadOnlyApplyForm,
} from './StudentInfoForm';

import { Checkbox, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import styles from '../camp.module.scss';

const ReadOnlyTermsForm = () => {
    return (
        <div className={styles.form}>
            <h5>약관 동의</h5>
            <div className={styles.checkForm}>
                <Checkbox label="전체 동의" checked readOnly />
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 개인정보 수집 및 이용"
                        className="mr-4"
                        checked
                        readOnly
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                    >
                        더보기
                    </TextButton>
                </div>
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 제 3자 정보 제공 동의"
                        className="mr-4"
                        checked
                        readOnly
                    />
                    <TextButton
                        color="link"
                        size="sm"
                        icon={ChevronRightIcon}
                        iconSide="right"
                    >
                        더보기
                    </TextButton>
                </div>
            </div>
        </div>
    );
};
export const TeacherInfoForm = (
    <div className={styles.forms}>
        <ReadOnlyProgramForm />
        <ReadOnlyManagerForm />
        <ReadOnlyTeacherForm />
        <ReadOnlyTargetForm />
        <ReadOnlyLearningTimeForm />
        <ReadOnlyTermsForm />
    </div>
);

export const StudentInfoForm = (
    <div className={styles.forms}>
        <ReadOnlyStudentProgramForm />
        <ReadOnlyApplyForm />
        <ReadOnlyTermsForm />
    </div>
);
