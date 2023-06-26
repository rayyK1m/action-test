import { Checkbox, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import {
    ProgramForm,
    ManagerForm,
    TeacherForm,
    TargetForm,
    LearningTimeForm,
} from './TeacherApplyForm';
import { StudentProgramForm, ApplyForm } from './StudentApplyForm';

import styles from './CampApplyForm.module.scss';

const TermsForm = ({ checked }) => {
    return (
        <div className={styles.form}>
            <h5>약관 동의</h5>
            <div className={styles.checkForm}>
                <Checkbox label="전체 동의" checked={checked} />
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 개인정보 수집 및 이용"
                        className="mr-4"
                        checked={checked}
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
                        checked={checked}
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

export const TeacherTypeCamp = {
    title: '방문형(선생님) 프로그램 신청하기',
    contents: ({ program, user }) => (
        <div className={styles.forms}>
            <ProgramForm program={program} />
            <ManagerForm user={user} />
            <TeacherForm />
            <TargetForm />
            <LearningTimeForm />
            <TermsForm />
        </div>
    ),
};

export const StudentTypeCamp = {
    title: '집합형(학생) 프로그램 신청하기',
    contents: ({ program, user }) => (
        <div className={styles.forms}>
            <StudentProgramForm program={program} />
            <ApplyForm user={user} />
            <TermsForm />
        </div>
    ),
};

export const TeacherApplyInfo = {
    title: '신청 정보',
    contents: ({ program, user, camp }) => (
        <div className={styles.forms}>
            <ProgramForm program={program} isInfoPage />
            <ManagerForm user={user} manager={camp.manager} isInfoPage />
            <TeacherForm educator={camp.educator} />
            <TargetForm target={camp.target} />
            <LearningTimeForm learningTime={camp.learningTime} />
            <TermsForm checked />
        </div>
    ),
};

export const StudentApplyInfo = {
    title: '신청 정보',
    contents: ({ program, user, camp }) => (
        <div className={styles.forms}>
            <StudentProgramForm program={program} isInfoPage />
            <ApplyForm user={user} camp={camp} isInfoPage />
            <TermsForm checked />
        </div>
    ),
};
