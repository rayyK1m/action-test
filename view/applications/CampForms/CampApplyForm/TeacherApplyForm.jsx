import { useMemo } from 'react';
import cn from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import {
    DropdownInputItem,
    InputItem,
} from '@/view/components/ValidateFormItem';
import { FormInput, FormWrapper } from '@/components/FormItem';

import Divider from '@/components/Divider/Divider';

import { Input } from '@goorm-dev/gds-components';
import styles from '../CampForms.module.scss';

import {
    CAMP_APPLY_KEYS,
    PROGRAM_KEYS,
    SCHOOL,
    USER_KEYS,
} from '../CampForms.constants';
import {
    PROGRAM_OPERATION_LOCATIONS,
    PROGRAM_SCHOOL_TYPE,
} from '@/constants/db';
import FormDatePicker from '@/components/FormItem/FormDatePicker/FormDatePicker';
import { formatNumberInput, formatPhoneNumber, setDateWithTime } from '@/utils';

import useToggle from '@/hooks/useToggle';
import useDebounce from '@/hooks/useDebounce';

import { useGetSchools } from '@/query-hooks/useSchool';
import SearchSchoolDropdown from '@/view/components/SearchSchoolDropdown/SearchSchoolDropdown';
import dayjs from 'dayjs';
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
                            {school.value.map((_, idx) => (
                                <Controller
                                    key={idx}
                                    control={control}
                                    name={key}
                                    render={({ ref }) => {
                                        const disabled = !targetSchool[
                                            index
                                        ].includes(idx + 1);
                                        return (
                                            <div
                                                className={cn(
                                                    'd-flex',
                                                    disabled
                                                        ? styles.disabled
                                                        : '',
                                                )}
                                            >
                                                <Input
                                                    type="checkbox"
                                                    ref={ref}
                                                    id={`${key}-${idx}`}
                                                    disabled={disabled}
                                                    onClick={handleChange({
                                                        schoolKey: key,
                                                        value: idx,
                                                        idx: index,
                                                    })}
                                                />
                                                <label for={`${key}-${idx}`}>
                                                    {idx + 1}학년
                                                </label>
                                            </div>
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
        trigger,
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
                    required: '필수 항목을 선택해주세요.',
                }}
                render={({ field: { value, onChange, onBlur } }) => {
                    const debouncedName = useDebounce(value, 500);
                    const { data = { items: [], total: 0 } } = useGetSchools({
                        name: debouncedName,
                    });

                    const handleChange = (value) => {
                        onChange(value);
                        trigger(schoolNameKey);
                    };

                    return (
                        <SearchSchoolDropdown
                            schoolList={data.items}
                            isOpenDropdown={isInputOpen}
                            schoolName={value}
                            toggle={toggleInput}
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

export const ProgramForm = () => {
    const { getValues } = useFormContext();
    const { institutionKey, typeKey, nameKey, difficultyKey } = PROGRAM_KEYS;

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
                    disabled
                />
                <FormInput
                    label="담당자 연락처"
                    value={formatPhoneNumber(getValues(phoneNumberKey))}
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
                    isRequired
                    dropdownKey={operateLocationKey}
                    items={PROGRAM_OPERATION_LOCATIONS}
                    placeholder="지역 선택"
                />
                <DropdownInputItem
                    label="학교 유형"
                    isRequired
                    dropdownKey={schoolTypeKey}
                    items={PROGRAM_SCHOOL_TYPE}
                    placeholder="학교 유형 선택"
                />
            </div>
        </div>
    );
};

export const TargetForm = ({ programTargetGroup }) => {
    const { applicantCountKey } = CAMP_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">신청 대상 정보</h5>
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

export const LearningTimeForm = ({ educationDate }) => {
    const {
        getValues,
        formState: { errors },
        watch,
    } = useFormContext();
    const { startDateKey, startTimeKey, endDateKey, endTimeKey } =
        CAMP_APPLY_KEYS;
    const { learningTimeKey } = PROGRAM_KEYS;

    const isDateError =
        !!errors[startDateKey] ||
        !!errors[startTimeKey] ||
        !!errors[endDateKey] ||
        !!errors[endTimeKey];
    const [startDate, startTime, endDate, endTime] = watch([
        startDateKey,
        startTimeKey,
        endDateKey,
        endTimeKey,
    ]);

    const validDate = startDate || startTime || endDate || endTime;
    const isBeforeStartDate =
        startDate &&
        startTime &&
        dayjs(setDateWithTime(startDate, startTime)).isBefore(
            educationDate.start,
        );
    const isAfterEndDate =
        endDate &&
        endTime &&
        dayjs(setDateWithTime(endDate, endTime)).isAfter(educationDate.end);

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
                        calendarProps={{
                            minDate: new Date(educationDate.start),
                            ...(!!endDate
                                ? {
                                      maxDate: new Date(endDate),
                                  }
                                : { maxDate: new Date(educationDate.end) }),
                        }}
                        formText={
                            !isDateError && !validDate
                                ? '안내된 교육 기간 중 실제로 진행하실 기간을 선택해주세요.'
                                : ''
                        }
                        feedback={
                            isBeforeStartDate && '교육 기간 내에 입력해주세요.'
                        }
                    />
                    <FormDatePicker
                        isRequired
                        label="교육 이수 종료일"
                        calendarProps={{
                            ...(!!startDate
                                ? {
                                      minDate: new Date(startDate),
                                  }
                                : { minDate: new Date(educationDate.start) }),
                            maxDate: new Date(educationDate.end),
                        }}
                        datePickerKey={endDateKey}
                        timePickerKey={endTimeKey}
                        feedback={isAfterEndDate && '교육 기간 내 입력해주세요'}
                    />
                </div>
            </div>
        </div>
    );
};
