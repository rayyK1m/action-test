import { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import {
    DropdownInputItem,
    InputItem,
} from '@/view/components/ValidateFormItem';
import { FormInput, FormWrapper } from '@/components/FormItem';

import Divider from '@/components/Divider/Divider';

import { Radio } from '@goorm-dev/gds-components';
import styles from '../camp.module.scss';

import { PROGRAM_OPERATION_LOCATIONS } from '@/constants/db';
import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    SCHOOL,
    USER_KEYS,
} from '../camp.constants';

// 집합형 프로그램 캠프 신청 폼

const ApplyTargetInput = ({ programTargetGroup }) => {
    const {
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors, touchedFields },
    } = useFormContext();

    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        CAMP_APPLY_KEYS;

    const targetFields = watch([
        elementaryTargetKey,
        middleTargetKey,
        highTargetKey,
    ]);

    const isDirty = useMemo(
        () =>
            !!touchedFields[elementaryTargetKey] ||
            !!touchedFields[middleTargetKey] ||
            !!touchedFields[highTargetKey],
        [targetFields],
    );

    const isError = useMemo(
        () => _isEmpty(targetFields.flat()),
        [targetFields],
    );

    useEffect(() => {
        if (isError) {
            setError('targetGroup', {
                type: 'required',
                message: '필수 항목을 선택해주세요.',
            });
        } else {
            clearErrors('targetGroup');
        }
    }, [isError]);

    const targetSchool = Object.values(programTargetGroup);

    return (
        <FormWrapper
            label="신청 가능 대상"
            isRequired
            feedback={isDirty && errors.targetGroup?.message}
        >
            <div className={styles.checkForm}>
                {Object.entries(SCHOOL).map(([key, school], index) => (
                    <div className={styles.school} key={school.key}>
                        <div className={styles.schoolName}>{school.key}</div>
                        <Divider height="0.75rem" className={styles.divider} />
                        <div className={styles.schoolGrade}>
                            {school.value.map((_, idx) => (
                                <Radio
                                    label={`${idx + 1}학년`}
                                    key={idx}
                                    name={index}
                                    disabled={
                                        !targetSchool[index].includes(idx + 1)
                                    }
                                    defaultChecked={targetFields[
                                        index
                                    ]?.includes(idx + 1)}
                                    onChange={() =>
                                        setValue(key, [idx + 1], {
                                            shouldTouch: true,
                                        })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

export const StudentProgramForm = () => {
    const { getValues } = useFormContext();
    const { institutionKey, typeKey, nameKey, learningTimeKey } = PROGRAM_KEYS;

    return (
        <div className={styles.form}>
            <h5>프로그램 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    label="운영 기관 명"
                    value={getValues(institutionKey)}
                    disabled
                />
                <FormInput
                    label="프로그램 명"
                    value={getValues(nameKey)}
                    disabled
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 유형"
                    value={getValues(typeKey)}
                    disabled
                />
                <FormInput
                    label="총 교육 차시"
                    value={getValues(learningTimeKey)}
                    disabled
                />
            </div>
        </div>
    );
};

export const ApplyForm = ({ programTargetGroup }) => {
    const { getValues } = useFormContext();

    const { userNameKey, phoneNumberKey, operateLocationKey, schoolNameKey } =
        CAMP_APPLY_KEYS;

    const { emailKey } = USER_KEYS;

    return (
        <div className={styles.form}>
            <h5>신청인 정보</h5>
            <div className={styles.divideRow}>
                <InputItem
                    isRequired
                    label="이름"
                    placeholder="예) 김구름"
                    inputKey={userNameKey}
                />
                <InputItem
                    isRequired
                    label="연락처"
                    placeholder="예) 010-1234-5678"
                    inputKey={phoneNumberKey}
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="이메일"
                    value={getValues(emailKey)}
                    disabled
                />
                <DropdownInputItem
                    label="신청 지역"
                    placeholder="지역 선택"
                    dropdownKey={operateLocationKey}
                    items={PROGRAM_OPERATION_LOCATIONS}
                />
            </div>
            <InputItem
                isRequired
                label="소속 학교"
                placeholder="소속 학교"
                inputKey={schoolNameKey}
            />
            <ApplyTargetInput programTargetGroup={programTargetGroup} />
        </div>
    );
};
