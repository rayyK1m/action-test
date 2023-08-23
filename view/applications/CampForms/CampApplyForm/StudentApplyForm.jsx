import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';
import cn from 'classnames';

import {
    DropdownInputItem,
    InputItem,
} from '@/view/components/ValidateFormItem';
import { FormInput, FormWrapper } from '@/components/FormItem';

import Divider from '@/components/Divider/Divider';

import { Radio } from '@goorm-dev/gds-components';
import styles from '../CampForms.module.scss';

import { PROGRAM_OPERATION_LOCATIONS } from '@/constants/db';
import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    SCHOOL,
    USER_KEYS,
} from '../CampForms.constants';
import { formatPhoneNumberInput, numberMaxLength } from '@/utils';
import useToggle from '@/hooks/useToggle';
import useDebounce from '@/hooks/useDebounce';

import { useGetSchools } from '@/query-hooks/useSchool';
import SearchSchoolDropdown from '@/view/components/SearchSchoolDropdown/SearchSchoolDropdown';

// 집합형 프로그램 캠프 신청 폼

const ApplyTargetInput = ({ programTargetGroup }) => {
    const {
        setValue,
        watch,
        formState: { touchedFields },
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

    const targetSchool = Object.values(programTargetGroup) || {};

    return (
        <FormWrapper
            label="신청 가능 대상"
            isRequired
            feedback={
                isDirty && isError ? '필수 항목을 선택해주세요.' : undefined
            }
        >
            <div className={styles.checkForm}>
                {Object.entries(SCHOOL).map(([key, school], index) => (
                    <div className={styles.school} key={school.key}>
                        <div className={styles.schoolName}>{school.key}</div>
                        <Divider height="0.75rem" className={styles.divider} />
                        <div className={styles.schoolGrade}>
                            {school.value.map((_, idx) => {
                                const disabled = !targetSchool[index].includes(
                                    idx + 1,
                                );
                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            'd-flex',
                                            disabled ? styles.disabled : '',
                                        )}
                                    >
                                        <Radio
                                            name={index}
                                            disabled={disabled}
                                            defaultChecked={targetFields[
                                                index
                                            ]?.includes(idx + 1)}
                                            onChange={() =>
                                                setValue(key, [idx + 1], {
                                                    shouldTouch: true,
                                                })
                                            }
                                        />
                                        <span>{`${idx + 1}학년`}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

const SearchSchoolInput = ({ userId, schoolKey }) => {
    const { schoolNameKey, schoolCodeKey } = schoolKey;
    const [isOpen, toggle] = useToggle(false);

    const {
        control,
        trigger,
        formState: { errors },
        setValue,
    } = useFormContext();

    const handleClick = (value) => {
        setValue(schoolCodeKey, value);
    };
    return (
        <FormWrapper isRequired label="소속 학교">
            <Controller
                control={control}
                name={schoolNameKey}
                rules={{
                    required: '필수 항목을 선택해주세요.',
                }}
                render={({ field: { value, onChange, onBlur } }) => {
                    const debouncedName = useDebounce(value, 500);
                    const { data = { items: [], total: 0 } } = useGetSchools({
                        userId,
                        name: debouncedName,
                    });

                    const handleChange = (value) => {
                        onChange(value);
                        trigger(schoolNameKey);
                    };

                    return (
                        <SearchSchoolDropdown
                            schoolList={data.items}
                            isOpenDropdown={isOpen}
                            schoolName={value}
                            toggle={toggle}
                            onChangeSchoolName={handleChange}
                            onClickDropdownItem={handleClick}
                            onBlur={onBlur}
                            errors={errors[schoolNameKey]}
                        />
                    );
                }}
            />
        </FormWrapper>
    );
};

export const StudentProgramForm = () => {
    const { getValues } = useFormContext();
    const { institutionKey, typeKey, nameKey, difficultyKey, learningTimeKey } =
        PROGRAM_KEYS;

    const { division, duration } = getValues(typeKey);

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
                    value={`${division} / ${duration}`}
                    disabled
                />
                <FormInput
                    label="프로그램 수준"
                    value={getValues(difficultyKey)}
                    disabled
                />
            </div>
            <FormInput
                label="총 교육 차시"
                value={getValues(learningTimeKey)}
                disabled
            />
        </div>
    );
};

export const ApplyForm = ({ programTargetGroup, userId }) => {
    const { getValues } = useFormContext();

    const {
        userNameKey,
        phoneNumberKey,
        operateLocationKey,
        schoolNameKey,
        schoolCodeKey,
    } = CAMP_APPLY_KEYS;

    const { emailKey } = USER_KEYS;
    const phoneNumberReg = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;

    return (
        <div className={styles.form}>
            <h5>신청인 정보</h5>
            <div className={styles.divideRow}>
                <InputItem
                    isRequired
                    label="이름"
                    placeholder="예) 김구름"
                    inputKey={userNameKey}
                    validate={{
                        minLength: {
                            value: 2,
                            message: '2글자 이상을 입력해주세요',
                        },
                    }}
                    maxLength={25}
                    onInput={numberMaxLength}
                />
                <InputItem
                    isRequired
                    label="연락처"
                    placeholder="예) 010-1234-5678"
                    inputKey={phoneNumberKey}
                    onInput={formatPhoneNumberInput}
                    validate={{
                        validate: {
                            validatePhoneNumber: (v) =>
                                phoneNumberReg.test(v) ||
                                '올바른 휴대 전화번호를 입력해주세요.',
                        },
                    }}
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
                    isRequired
                    placeholder="지역 선택"
                    dropdownKey={operateLocationKey}
                    items={PROGRAM_OPERATION_LOCATIONS}
                />
            </div>
            <SearchSchoolInput
                userId={userId}
                schoolKey={{
                    schoolNameKey,
                    schoolCodeKey,
                }}
            />
            <ApplyTargetInput programTargetGroup={programTargetGroup} />
        </div>
    );
};
