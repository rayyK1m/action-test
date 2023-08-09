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
import { ReadOnlyTermsForm } from '../TermForm/TermForm';

import styles from '../CampForms.module.scss';

export const TeacherInfoForm = ({
    programTarget,
    isAdmin = false,
    isFoundationPage,
}) => (
    <div className={styles.forms}>
        <ReadOnlyProgramForm />
        <ReadOnlyManagerForm isFoundationPage={isFoundationPage} />
        <ReadOnlyTeacherForm isFoundationPage={isFoundationPage} />
        <ReadOnlyTargetForm programTarget={programTarget} />
        <ReadOnlyLearningTimeForm />
        {!isAdmin && <ReadOnlyTermsForm />}
    </div>
);

export const StudentInfoForm = ({ programTarget, isAdmin = false }) => (
    <div className={styles.forms}>
        <ReadOnlyStudentProgramForm />
        <ReadOnlyApplyForm programTarget={programTarget} />
        {!isAdmin && <ReadOnlyTermsForm />}
    </div>
);
