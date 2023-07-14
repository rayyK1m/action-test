import { useState, useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
    ProgramForm,
    ManagerForm,
    TeacherForm,
    TargetForm,
    LearningTimeForm,
} from './TeacherApplyForm';
import { StudentProgramForm, ApplyForm } from './StudentApplyForm';

import { Checkbox, TextButton } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import styles from '../camp.module.scss';

const TermsForm = () => {
    const { setError, clearErrors } = useFormContext();

    const [{ thirdPartyInfoTerm, personalInfoTerm }, setTerms] = useState({
        thirdPartyInfoTerm: false,
        personalInfoTerm: false,
    });

    const isError = useMemo(
        () => !thirdPartyInfoTerm || !personalInfoTerm,
        [thirdPartyInfoTerm, personalInfoTerm],
    );

    useEffect(() => {
        if (isError) {
            setError('terms', {
                type: 'required',
                message: '필수 항목을 선택해주세요.',
            });
        } else {
            clearErrors('terms');
        }
    }, [isError]);

    const handleChange = (target) => {
        if (target.checked) {
            if (target.name === 'all')
                setTerms({ thirdPartyInfoTerm: true, personalInfoTerm: true });
            setTerms((terms) => ({ ...terms, [target.name]: true }));
        } else {
            if (target.name === 'all')
                setTerms({
                    thirdPartyInfoTerm: false,
                    personalInfoTerm: false,
                });
            setTerms((terms) => ({ ...terms, [target.name]: false }));
        }
    };

    return (
        <div className={styles.form}>
            <h5>약관 동의</h5>
            <div className={styles.checkForm}>
                <Checkbox
                    label="전체 동의"
                    name="all"
                    checked={thirdPartyInfoTerm && personalInfoTerm}
                    onChange={(e) => handleChange(e.target)}
                />
                <div className="d-flex align-items-center">
                    <Checkbox
                        label="[필수] 개인정보 수집 및 이용"
                        className="mr-4"
                        name="personalInfoTerm"
                        checked={personalInfoTerm}
                        onChange={(e) => handleChange(e.target)}
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
                        name="thirdPartyInfoTerm"
                        checked={thirdPartyInfoTerm}
                        onChange={(e) => handleChange(e.target)}
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
    contents: ({ program }) => (
        <div className={styles.forms}>
            <ProgramForm />
            <ManagerForm />
            <TeacherForm />
            <TargetForm programTargetGroup={program.targetGroup} />
            <LearningTimeForm />
            <TermsForm />
        </div>
    ),
};

export const StudentTypeCamp = {
    title: '집합형(학생) 프로그램 신청하기',
    contents: ({ program }) => (
        <div className={styles.forms}>
            <StudentProgramForm />
            <ApplyForm programTargetGroup={program.targetGroup} />
            <TermsForm />
        </div>
    ),
};
