import { useEffect, useId, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

import useToggle from '@/hooks/useToggle';
import { useDaumSearchMap } from '@/query-hooks/useMap';

import {
    InputItem,
    DropdownInputItem,
    EditorInputItem,
    FileInputItem,
    ImageFileInputItem,
} from '@/view/components/ValidateFormItem';
import { FormWrapper, FormDatePicker } from '@/components/FormItem';

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

import { formatNumberInput, addDay, numberMaxLength } from '@/utils/index.js';
import {
    PROGRAM_CATEGORIES,
    PROGRAM_DIFFICULTY,
    PROGRAM_DIVISION,
    PROGRAM_DURATION,
    PROGRAM_OPERATION_LOCATIONS,
} from '@/constants/db';
import { PROGRAM_APPLY_KEYS, SCHOOL } from '../program.contants.js';

const ProgramTypeInput = ({ division, durationKey }) => {
    const { setValue, watch } = useFormContext();

    const items = [PROGRAM_DURATION.지속, PROGRAM_DURATION.단기];
    const [isOpen, toggle] = useToggle(false);

    const duration = watch(durationKey);

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
                    <DropdownMenu className="w-100">
                        {items.map((item) => (
                            <DropdownItem
                                key={item}
                                onClick={() =>
                                    setValue(durationKey, item, {
                                        shouldDirty: true,
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
                message: '필수 항목을 선택해주세요.',
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
                    shouldDirty: true,
                    shouldTouch: true,
                });
            } else {
                const values = getValues(schoolKey).filter(
                    (v) => v !== value + 1,
                );
                setValue(schoolKey, values, {
                    shouldDirty: true,
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
                                <div className="d-flex" key={idx}>
                                    <Checkbox
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
                                    <span>{idx + 1}학년</span>
                                </div>
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
        difficultyKey,
        operateLocationKey,
        durationKey,
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
                    maxLength={50}
                    onInput={numberMaxLength}
                />
                <ProgramTypeInput
                    division={division}
                    durationKey={durationKey}
                />
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
                    label="프로그램 수준"
                    dropdownKey={difficultyKey}
                    placeholder="수준 선택"
                    items={Object.values(PROGRAM_DIFFICULTY)}
                />
            </div>
            <DropdownInputItem
                isRequired
                label="운영 지역"
                placeholder="운영 지역 선택"
                items={PROGRAM_OPERATION_LOCATIONS}
                dropdownKey={operateLocationKey}
            />
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
        educationStartDateKey,
    } = PROGRAM_APPLY_KEYS;

    const [applyStartDate, applyEndDate, educationStartDate] = watch([
        applyStartDateKey,
        applyEndDateKey,
        educationStartDateKey,
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
                        ...(applyEndDate
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
                        ...(applyStartDate
                            ? {
                                  minDate: new Date(applyStartDate),
                              }
                            : {}),
                        ...(educationStartDate
                            ? {
                                  maxDate: new Date(
                                      addDay(educationStartDate, -1),
                                  ),
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
    const { watch, setValue } = useFormContext();
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
        applyEndDateKey,
    } = PROGRAM_APPLY_KEYS;

    const [
        educationStartDate,
        educationStartTime,
        educationEndDate,
        educationEndTime,
        learningTime,
    ] = watch([
        educationStartDateKey,
        educationStartTimeKey,
        educationEndDateKey,
        educationEndTimeKey,
        learningTimeKey,
    ]);
    const isEducationDateDirty =
        educationStartDate ||
        educationStartTime ||
        educationEndDate ||
        educationEndTime;

    const { data: mapSearch } = useDaumSearchMap({
        onComplete: (data) => {
            setValue(educationLocationAddressKey, data.address, {
                shouldDirty: true,
            });
        },
    });

    const mapPopupKey = useId();
    const handleOpen = () => {
        mapSearch?.open({
            popupKey: mapPopupKey,
            left: window.screen.width / 2 - mapSearch.width / 2,
            top: window.screen.height / 2 - mapSearch.height / 2,
        });
    };

    const validateLearningTime = learningTime <= 36;

    return (
        <div className={styles.form}>
            <h5>교육 정보</h5>
            <InputItem
                isRequired
                label="총 교육 차시"
                placeholder="예) 8"
                inputKey={learningTimeKey}
                onInput={formatNumberInput}
                validate={{
                    max: {
                        value: 36,
                        message: '36차시 이내로 입력해주세요.',
                    },
                }}
                formText={
                    validateLearningTime &&
                    '교육 차시는 최대 36차시까지 등록할 수 있습니다.'
                }
            />
            <div className={styles.divideRow}>
                <FormDatePicker
                    isRequired
                    label="교육 가능 시작일"
                    datePickerKey={educationStartDateKey}
                    timePickerKey={educationStartTimeKey}
                    calendarProps={{
                        ...(educationEndDate
                            ? {
                                  maxDate: new Date(educationEndDate),
                              }
                            : {}),
                    }}
                    formText={
                        !isEducationDateDirty &&
                        '프로그램의 교육이 가능한 전체 기간을 선택해 주세요.'
                    }
                />
                <FormDatePicker
                    isRequired
                    label="교육 가능 종료일"
                    datePickerKey={educationEndDateKey}
                    timePickerKey={educationEndTimeKey}
                    calendarProps={{
                        ...(educationStartDate
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
                maxFileSize={30}
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
                    <div className={styles.location}>
                        <InputItem
                            isRequired
                            label="교육 주소"
                            placeholder="교육 주소"
                            inputKey={educationLocationAddressKey}
                            readOnly
                        />
                        <Button
                            outline
                            color="basic"
                            size="lg"
                            onClick={handleOpen}
                            className={styles.searchButton}
                        >
                            검색하기
                        </Button>
                    </div>
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
