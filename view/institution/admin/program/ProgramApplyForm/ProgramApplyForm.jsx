import { useEffect, useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import useToggle from '@/hooks/useToggle';

import {
    InputItem,
    DropdownInputItem,
    EditorInputItem,
    FileInputItem,
    ImageFileInputItem,
} from '@/view/components/ValidateFormItem';
import { FormWrapper, FormDatePicker } from '@/components/FormItem';

import {
    PROGRAM_CATEGORIES,
    PROGRAM_DIVISION,
    PROGRAM_OPERATION_LOCATIONS,
} from '@/constants/db';
import { PROGRAM_APPLY_KEYS, SCHOOL } from '../program.contants.js';

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Checkbox,
} from '@goorm-dev/gds-components';
import { ChevronDownIcon } from '@goorm-dev/gds-icons';
import Divider from '@/components/Divider';
import styles from '../program.module.scss';
import { formatNumberInput } from '@/utils/index.js';

const ProgramTypeInput = ({ division, typeKey }) => {
    const { setValue, watch } = useFormContext();

    const items = ['장기', '단기'];
    const [isOpen, toggle] = useToggle(false);

    useEffect(() => {
        setValue(typeKey, {
            division,
            duration: '장기',
        });
    }, []);

    const { duration } = watch(typeKey);

    return (
        <FormWrapper label="프로그램 유형" isRequired>
            <div className={styles.divideRow}>
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size="lg"
                    className={styles.typeButton}
                    disabled
                >
                    {division}
                </Button>
                <UncontrolledDropdown
                    isOpen={isOpen}
                    toggle={toggle}
                    className={styles.dropdown}
                >
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="div"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Button
                            icon={<ChevronDownIcon />}
                            color="select"
                            iconSide="right"
                            size="lg"
                            className={styles.button}
                        >
                            {duration}
                        </Button>
                    </DropdownToggle>
                    <DropdownMenu>
                        {items.map((item) => (
                            <DropdownItem
                                key={item}
                                onClick={() =>
                                    setValue(typeKey, {
                                        division,
                                        duration: item,
                                    })
                                }
                            >
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </FormWrapper>
    );
};

const ApplyTargetInput = () => {
    const {
        setValue,
        watch,
        setError,
        getValues,
        clearErrors,
        formState: { errors, touchedFields },
    } = useFormContext();
    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        PROGRAM_APPLY_KEYS;

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
        () => isDirty && _isEmpty(targetFields.flat()),
        [targetFields],
    );

    useEffect(() => {
        if (isError) {
            setError('targetGroup', {
                type: 'required',
                message: '필수 항목을 입력해주세요.',
            });
        } else {
            clearErrors('targetGroup');
        }
    }, [isError]);

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

    return (
        <FormWrapper
            label="신청 가능 대상"
            isRequired
            feedback={errors.targetGroup?.message}
        >
            <div className={styles.checkForm}>
                {Object.entries(SCHOOL).map(([key, school], index) => (
                    <div className={styles.school} key={school.key}>
                        <div className={styles.schoolName}>{school.key}</div>
                        <Divider height="0.75rem" className={styles.divider} />
                        <div className={styles.schoolGrade}>
                            {school.value.map((_, idx) => (
                                <Checkbox
                                    label={`${idx + 1}학년`}
                                    key={idx}
                                    defaultChecked={targetFields[
                                        index
                                    ]?.includes(idx + 1)}
                                    onChange={handleChange({
                                        schoolKey: key,
                                        value: idx,
                                        idx: index,
                                    })}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

const BasicForm = ({ division }) => {
    const {
        thumbnailKey,
        nameKey,
        categoryKey,
        operateLocationKey,
        typeKey,
        descriptionKey,
        contactKey,
    } = PROGRAM_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>기본 정보</h5>
            <ImageFileInputItem
                label="프로그램 썸네일"
                isRequired
                maxFileSize={2}
                fileKey={thumbnailKey}
            />
            <div className={styles.divideRow}>
                <InputItem
                    isRequired
                    label="프로그램 명"
                    placeholder="예) 신나는 로봇 코딩"
                    inputKey={nameKey}
                />
                <ProgramTypeInput division={division} typeKey={typeKey} />
            </div>
            <div className={styles.divideRow}>
                <DropdownInputItem
                    isRequired
                    label="프로그램 카테고리"
                    dropdownKey={categoryKey}
                    placeholder="카테고리 선택"
                    items={PROGRAM_CATEGORIES}
                />
                <DropdownInputItem
                    isRequired
                    label="운영 지역"
                    placeholder="운영 지역 선택"
                    items={PROGRAM_OPERATION_LOCATIONS}
                    dropdownKey={operateLocationKey}
                />
            </div>
            <EditorInputItem
                label="프로그램 소개"
                placeholder="예) 프로그래밍의 순차와 반복에 대해 학습하며 컴퓨팅 사고력을 키운다."
                editorKey={descriptionKey}
            />
            <InputItem
                isRequired
                type="textarea"
                label="문의처(기관)"
                placeholder="프로그램 관련 문의할 수 있는 연락처나 이메일을 입력해주세요."
                inputKey={contactKey}
                className={styles.textarea}
            />
        </div>
    );
};

const ApplyForm = () => {
    const { watch } = useFormContext();
    const {
        applyStartDateKey,
        applyStartTimeKey,
        applyEndDateKey,
        applyEndTimeKey,
    } = PROGRAM_APPLY_KEYS;

    const [applyStartDate, applyEndDate] = watch([
        applyStartDateKey,
        applyEndDateKey,
    ]);

    return (
        <div className={styles.form}>
            <h5>신청 정보</h5>
            <div className={styles.divideRow}>
                <FormDatePicker
                    isRequired
                    label="신청 시작일"
                    datePickerKey={applyStartDateKey}
                    timePickerKey={applyStartTimeKey}
                    calendarProps={{
                        ...(!!applyEndDate
                            ? {
                                  maxDate: new Date(applyEndDate),
                              }
                            : {}),
                    }}
                />
                <FormDatePicker
                    isRequired
                    label="신청 종료일"
                    datePickerKey={applyEndDateKey}
                    timePickerKey={applyEndTimeKey}
                    calendarProps={{
                        ...(!!applyStartDate
                            ? {
                                  minDate: new Date(applyStartDate),
                              }
                            : {}),
                    }}
                />
            </div>
            <ApplyTargetInput />
        </div>
    );
};

const EducationForm = ({ division }) => {
    const { watch } = useFormContext();
    const {
        attachedFilesKey,
        learningTimeKey,
        curriculumKey,
        noticeKey,
        educationLocationNameKey,
        educationLocationAddressKey,
        educationStartDateKey,
        educationStartTimeKey,
        educationEndDateKey,
        educationEndTimeKey,
    } = PROGRAM_APPLY_KEYS;

    const [educationStartDate, educationEndDate] = watch([
        educationStartDateKey,
        educationEndDateKey,
    ]);

    return (
        <div className={styles.form}>
            <h5>교육 정보</h5>
            <InputItem
                isRequired
                label="총 교육 차시"
                placeholder="예) 8차시"
                inputKey={learningTimeKey}
                onInput={formatNumberInput}
            />
            <div className={styles.divideRow}>
                <FormDatePicker
                    isRequired
                    label="교육 시작일"
                    datePickerKey={educationStartDateKey}
                    timePickerKey={educationStartTimeKey}
                    calendarProps={{
                        ...(!!educationEndDate
                            ? {
                                  maxDate: new Date(educationEndDate),
                              }
                            : {}),
                    }}
                />
                <FormDatePicker
                    isRequired
                    label="교육 종료일"
                    datePickerKey={educationEndDateKey}
                    timePickerKey={educationEndTimeKey}
                    calendarProps={{
                        ...(!!educationStartDate
                            ? {
                                  minDate: new Date(educationStartDate),
                              }
                            : {}),
                    }}
                />
            </div>
            <EditorInputItem
                label="커리큘럼"
                placeholder={`예) \n1차시. 순차 구조와 반복 구조 이해하기 \n2차시. 로봇을 활용한 그림 그리기`}
                editorKey={curriculumKey}
            />
            <FileInputItem
                label="프로그램 교안 첨부 파일"
                isRequired
                maxFileSize={2}
                fileKey={attachedFilesKey}
            />
            <InputItem
                isRequired
                type="textarea"
                label="안내사항"
                placeholder="안내 사항이나 주의 사항을 입력해주세요."
                className={styles.textarea}
                inputKey={noticeKey}
            />
            {division === PROGRAM_DIVISION.집합형 && (
                <div className={styles.divideRow}>
                    <InputItem
                        isRequired
                        label="교육 장소"
                        placeholder="예) 구름 타운홀"
                        inputKey={educationLocationNameKey}
                    />
                    <InputItem
                        isRequired
                        label="교육 주소"
                        placeholder="교육 주소"
                        inputKey={educationLocationAddressKey}
                    />
                </div>
            )}
        </div>
    );
};

const EditForm = ({ division }) => (
    <>
        <BasicForm division={division} />
        <ApplyForm />
        <EducationForm division={division} />
    </>
);

export default EditForm;
