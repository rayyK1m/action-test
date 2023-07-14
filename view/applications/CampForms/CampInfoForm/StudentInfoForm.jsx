import { useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import { FormDropdown, FormInput, FormWrapper } from '@/components/FormItem';

import Divider from '@/components/Divider/Divider';

import { Radio } from '@goorm-dev/gds-components';
import styles from '../camp.module.scss';

import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    SCHOOL,
    USER_KEYS,
} from '../camp.constants';

// 집합형 프로그램 캠프 신청 폼

const ApplyTargetInput = () => {
    const { watch } = useFormContext();

    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        CAMP_APPLY_KEYS;

    const targetFields = watch([
        elementaryTargetKey,
        middleTargetKey,
        highTargetKey,
    ]);

    return (
        <FormWrapper label="신청 가능 대상" isRequired>
            <div className={styles.checkForm}>
                {Object.entries(SCHOOL).map(([_, school], index) => (
                    <div className={styles.school} key={school.key}>
                        <div className={styles.schoolName}>{school.key}</div>
                        <Divider height="0.75rem" className={styles.divider} />
                        <div className={styles.schoolGrade}>
                            {school.value.map((_, idx) => (
                                <Radio
                                    label={`${idx + 1}학년`}
                                    key={idx}
                                    name={index}
                                    defaultChecked={targetFields[
                                        index
                                    ]?.includes(idx + 1)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

export const ReadOnlyStudentProgramForm = () => {
    const { getValues } = useFormContext();

    const { institutionKey, typeKey, nameKey, learningTimeKey } = PROGRAM_KEYS;

    return (
        <div className={styles.form}>
            <h5>프로그램 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    label="운영 기관 명"
                    value={getValues(institutionKey)}
                    readOnly
                />
                <FormInput
                    label="프로그램 명"
                    value={getValues(nameKey)}
                    readOnly
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 유형"
                    value={getValues(typeKey)}
                    readOnly
                />
                <FormInput
                    label="총 교육 차시"
                    value={getValues(learningTimeKey)}
                    readOnly
                />
            </div>
        </div>
    );
};

export const ReadOnlyApplyForm = () => {
    const { getValues } = useFormContext();
    const { userNameKey, phoneNumberKey, operateLocationKey, schoolNameKey } =
        CAMP_APPLY_KEYS;

    const { emailKey } = USER_KEYS;

    return (
        <div className={styles.form}>
            <h5>신청인 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    isRequired
                    label="이름"
                    value={getValues(userNameKey)}
                    readOnly
                />
                <FormInput
                    isRequired
                    label="연락처"
                    value={getValues(phoneNumberKey)}
                    readOnly
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="이메일"
                    value={getValues(emailKey)}
                    readOnly
                />
                <FormDropdown
                    label="신청 지역"
                    placeholder={getValues(operateLocationKey)}
                    readOnly
                />
            </div>
            <FormInput
                label="소속 학교"
                value={getValues(schoolNameKey)}
                readOnly
            />
            <ApplyTargetInput />
        </div>
    );
};
