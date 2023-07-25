import { useMemo, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import {
    DropdownInputItem,
    InputItem,
} from '@/view/components/ValidateFormItem';
import { FormInput, FormWrapper } from '@/components/FormItem';

import Divider from '@/components/Divider/Divider';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

import { Checkbox } from '@goorm-dev/gds-components';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import styles from '../CampForms.module.scss';

import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    SCHOOL,
    USER_KEYS,
} from '../CampForms.constants';
import { PROGRAM_OPERATION_LOCATIONS } from '@/constants/db';
import FormDatePicker from '@/components/FormItem/FormDatePicker/FormDatePicker';
import { formatNumberInput } from '@/utils';

import useToggle from '@/hooks/useToggle';
import useDebounce from '@/hooks/useDebounce';

import { useGetSchools } from '@/query-hooks/useSchool';
import SearchSchoolDropdown from '@/view/components/SearchSchoolDropdown/SearchSchoolDropdown';

// 방문형 프로그램 캠프 신청 폼

const ApplyTargetInput = ({ programTargetGroup }) => {
    const {
        control,
        setValue,
        watch,
        getValues,
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

    const handleChange =
        ({ schoolKey, value, idx }) =>
        (e) => {
            if (e.target.checked) {
                setValue(schoolKey, [value + 1, ...targetFields[idx]], {
                    shouldTouch: true,
                });
            } else {
                const values = getValues(schoolKey).filter(
                    (v) => v !== value + 1,
                );
                setValue(schoolKey, values, {
                    shouldTouch: true,
                });
            }
        };

    const targetSchool = Object.values(programTargetGroup);

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
                            {school.value.map((_, idx) => (
                                <Controller
                                    control={control}
                                    name={key}
                                    render={({ ref }) => {
                                        const disabled = !targetSchool[
                                            index
                                        ].includes(idx + 1);
                                        return (
                                            <Checkbox
                                                className={
                                                    disabled
                                                        ? styles.disabled
                                                        : ''
                                                }
                                                ref={ref}
                                                label={`${idx + 1}학년`}
                                                key={idx}
                                                disabled={disabled}
                                                onChange={handleChange({
                                                    schoolKey: key,
                                                    value: idx,
                                                    idx: index,
                                                })}
                                            />
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

const SearchSchoolInput = ({ userId, schoolKey }) => {
    const { schoolNameKey, schoolCodeKey } = schoolKey;
    const [isInputOpen, toggleInput] = useToggle();

    const {
        control,
        formState: { errors },
        setValue,
    } = useFormContext();

    const handleClick = (value) => {
        setValue(schoolCodeKey, value);
    };
    return (
        <FormWrapper isRequired label="소속 학교(교육 장소)">
            <Controller
                control={control}
                name={schoolNameKey}
                rules={{
                    required: '필수 항목을 입력해주세요.',
                }}
                render={({ field: { ref, value, onChange, onBlur } }) => {
                    const debouncedName = useDebounce(value, 500);
                    const { data = { items: [], total: 0 } } = useGetSchools({
                        userId,
                        name: debouncedName,
                    });

                    return (
                        <SearchSchoolDropdown
                            ref={ref}
                            schoolList={data.items}
                            isOpenDropdown={isInputOpen}
                            schoolName={value}
                            toggle={toggleInput}
                            onChangeSchoolName={onChange}
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

export const ProgramForm = () => {
    const { getValues } = useFormContext();
    const { institutionKey, typeKey, nameKey } = PROGRAM_KEYS;

    const { division, duration } = getValues(typeKey);

    return (
        <div className={styles.form}>
            <h5>프로그램 정보</h5>
            <FormInput
                label="운영 기관 명"
                value={getValues(institutionKey)}
                disabled
            />
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 유형"
                    value={`${division} / ${duration}`}
                    disabled
                />
                <FormInput
                    label="프로그램 명"
                    value={getValues(nameKey)}
                    disabled
                />
            </div>
        </div>
    );
};

export const ManagerForm = ({ userId }) => {
    const { getValues } = useFormContext();
    const {
        userNameKey,
        schoolNameKey,
        schoolCodeKey,
        operateLocationKey,
        schoolTypeKey,
    } = CAMP_APPLY_KEYS;

    const { emailKey, phoneNumberKey } = USER_KEYS;

    return (
        <div className={styles.form}>
            <h5>담당자 정보</h5>
            <div className={styles.divideRow}>
                <InputItem
                    isRequired
                    label="현장 담당자 명"
                    placeholder="예) 김구름"
                    inputKey={userNameKey}
                />
                <FormInput
                    label="담당자 연락처"
                    value={getValues(phoneNumberKey)}
                    disabled
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="담당자 이메일"
                    value={getValues(emailKey)}
                    disabled
                />
                <SearchSchoolInput
                    userId={userId}
                    schoolKey={{
                        schoolCodeKey,
                        schoolNameKey,
                    }}
                />
            </div>
            <div className={styles.divideRow}>
                <DropdownInputItem
                    label="신청 지역"
                    dropdownKey={operateLocationKey}
                    items={PROGRAM_OPERATION_LOCATIONS}
                    placeholder="지역 선택"
                />
                <InputItem
                    label="학교 유형"
                    placeholder="예) 늘봄 학교"
                    formText="미 입력시 일반 학교로 자동 등록됩니다."
                    inputKey={schoolTypeKey}
                />
            </div>
        </div>
    );
};

export const TeacherForm = () => {
    const { mainEducatorKey, subEducatorKey } = CAMP_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>강사 정보</h5>
            <div>
                <div className={styles.divideRow}>
                    <InputItem
                        label="강사 명"
                        placeholder="예) 김구름"
                        inputKey={mainEducatorKey}
                    />
                    <InputItem
                        label="보조 강사 명"
                        placeholder="예) 김구름"
                        inputKey={subEducatorKey}
                    />
                </div>
                <CustomAlert
                    leftIcon={NoticeCircleIcon}
                    className={styles.alert}
                >
                    강사 혹은 보조 강사를 기재하지 않을 경우, 운영 기관에서
                    배정할 수 있습니다.
                </CustomAlert>
            </div>
        </div>
    );
};

export const TargetForm = ({ programTargetGroup }) => {
    const { applicantCountKey } = CAMP_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>신청 대상 정보</h5>
            <ApplyTargetInput programTargetGroup={programTargetGroup} />
            <InputItem
                isRequired
                label="신청 인원"
                placeholder="예) 15"
                inputKey={applicantCountKey}
                onInput={formatNumberInput}
            />
        </div>
    );
};

export const LearningTimeForm = () => {
    const {
        getValues,
        formState: { errors },
    } = useFormContext();
    const { startDateKey, startTimeKey, endDateKey, endTimeKey } =
        CAMP_APPLY_KEYS;
    const { learningTimeKey } = PROGRAM_KEYS;

    const isDateError =
        !!errors[startDateKey] ||
        !!errors[startTimeKey] ||
        !!errors[endDateKey] ||
        !!errors[endTimeKey];

    return (
        <div className={styles.form}>
            <h5>교육 시간</h5>
            <FormInput
                label="총 교육 차시"
                value={getValues(learningTimeKey)}
                disabled
            />
            <div>
                <div className={styles.divideRow}>
                    <FormDatePicker
                        isRequired
                        label="교육 이수 시작일"
                        datePickerKey={startDateKey}
                        timePickerKey={startTimeKey}
                        formText={
                            !isDateError
                                ? '안내된 교육 기간 중 실제로 진행하실 기간을 선택해주세요.'
                                : ''
                        }
                    />
                    <FormDatePicker
                        isRequired
                        label="교육 이수 종료일"
                        datePickerKey={endDateKey}
                        timePickerKey={endTimeKey}
                    />
                </div>
            </div>
        </div>
    );
};
