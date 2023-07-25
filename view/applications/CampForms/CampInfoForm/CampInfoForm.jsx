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

export const TeacherInfoForm = ({ programTarget }) => (
    <div className={styles.forms}>
        <ReadOnlyProgramForm />
        <ReadOnlyManagerForm />
        <ReadOnlyTeacherForm />
        <ReadOnlyTargetForm programTarget={programTarget} />
        <ReadOnlyLearningTimeForm />
        <ReadOnlyTermsForm />
    </div>
);

export const StudentInfoForm = ({ programTarget }) => (
    <div className={styles.forms}>
        <ReadOnlyStudentProgramForm />
        <ReadOnlyApplyForm programTarget={programTarget} />
        <ReadOnlyTermsForm />
    </div>
);
