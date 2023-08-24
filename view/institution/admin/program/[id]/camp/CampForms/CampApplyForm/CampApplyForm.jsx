import { useId } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import cn from 'classnames';
import useToggle from '@/hooks/useToggle';

import { FormDatePicker, FormInput, FormWrapper } from '@/components/FormItem';
import Divider from '@/components/Divider';
import { Button, Checkbox, Input } from '@goorm-dev/gds-components';
import { ChevronDownIcon, InfoCircleIcon } from '@goorm-dev/gds-icons';
import styles from '../CampForms.module.scss';

import { CAMP_KEYS, SCHOOL } from '../CampForms.constants';
import {
    DropdownInputItem,
    InputItem,
} from '@/view/components/ValidateFormItem';
import CustomAlert from '@/components/CustomAlert/CustomAlert';
import {
    PROGRAM_CATEGORIES,
    PROGRAM_DIFFICULTY,
    PROGRAM_DIVISION,
    PROGRAM_OPERATION_LOCATIONS,
    PROGRAM_SCHOOL_TYPE,
} from '@/constants/db';
import { formatNumberInput, formatPhoneNumberInput } from '@/utils';
import { useGetSchools } from '@/query-hooks/useSchool';
import SearchSchoolDropdown from '@/view/components/SearchSchoolDropdown/SearchSchoolDropdown';
import { useDaumSearchMap } from '@/query-hooks/useMap';
import useDebounce from '@/hooks/useDebounce';

const ProgramTypeInput = ({ division, duration }) => {
    return (
        <FormWrapper label="캠프 유형">
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
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size="lg"
                    className={cn(styles.button, styles.dropdown)}
                    disabled
                >
                    {duration}
                </Button>
            </div>
        </FormWrapper>
    );
};
const ApplyTargetInput = ({ programTargetGroup }) => {
    const { control, setValue, watch, getValues } = useFormContext();

    const { elementaryTargetKey, middleTargetKey, highTargetKey } = CAMP_KEYS;

    const targetFields = watch([
        elementaryTargetKey,
        middleTargetKey,
        highTargetKey,
    ]);

    const handleChange =
        ({ schoolKey, value, idx }) =>
        (e) => {
            if (e.target.checked) {
                setValue(schoolKey, [value + 1, ...targetFields[idx]], {
                    shouldDirty: true,
                });
            } else {
                const values = getValues(schoolKey).filter(
                    (v) => v !== value + 1,
                );
                setValue(schoolKey, values, {
                    shouldDirty: true,
                });
            }
        };

    const targetSchool = Object.values(programTargetGroup) || {};

    return (
        <FormWrapper label="신청 대상">
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
                                    key={idx}
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
                                                defaultChecked={targetFields[
                                                    index
                                                ]?.includes(idx + 1)}
                                                ref={ref}
                                                label={`${idx + 1}학년`}
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

const EducationAddress = ({ addressKey }) => {
    const { register, setValue } = useFormContext();
    const { data: mapSearch } = useDaumSearchMap({
        onComplete: (data) => {
            console.log(data.address);
            setValue(addressKey, data.address, {
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
    return (
        <FormWrapper label="교육 주소" isRequired>
            <div className={styles.addressForm}>
                <Input
                    placeholder="교육 주소"
                    bsSize="lg"
                    className={styles.addressForm_input}
                    {...register(addressKey)}
                    readOnly
                />
                <Button outline color="basic" size="lg" onClick={handleOpen}>
                    검색하기
                </Button>
            </div>
        </FormWrapper>
    );
};

const SearchSchoolInput = ({ schoolKey }) => {
    const { schoolNameKey, schoolCodeKey } = schoolKey;
    const [isInputOpen, toggleInput] = useToggle();

    const { control, trigger, setValue } = useFormContext();

    const handleClick = (value) => {
        setValue(schoolCodeKey, value, {
            shouldDirty: true,
        });
    };
    return (
        <FormWrapper label="소속 학교(교육 장소)">
            <Controller
                control={control}
                name={schoolNameKey}
                rules={{
                    required: true,
                }}
                render={({ field: { ref, value, onChange } }) => {
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
                            ref={ref}
                            schoolList={data.items}
                            isOpenDropdown={isInputOpen}
                            schoolName={value}
                            toggle={toggleInput}
                            onChangeSchoolName={handleChange}
                            onClickDropdownItem={handleClick}
                        />
                    );
                }}
            />
        </FormWrapper>
    );
};

const CampForm = ({ division = PROGRAM_DIVISION.집합형 }) => {
    const {
        typeKey,
        programNameKey,
        operateLocationKey,
        difficultyKey,
        categoryKey,
    } = CAMP_KEYS;
    const { getValues } = useFormContext();
    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">캠프 정보</h5>
            <div className={styles.divideRow}>
                <ProgramTypeInput
                    division={getValues(`${typeKey}.division`)}
                    duration={getValues(`${typeKey}.duration`)}
                />
                <FormInput
                    label="캠프 명"
                    value={getValues(programNameKey)}
                    disabled
                />
            </div>

            <div className={styles.divideRow}>
                <DropdownInputItem
                    label="캠프 카테고리"
                    placeholder="카테고리 선택"
                    dropdownKey={categoryKey}
                    items={PROGRAM_CATEGORIES}
                />
                <DropdownInputItem
                    label="캠프 수준"
                    placeholder="수준 선택"
                    dropdownKey={difficultyKey}
                    items={Object.values(PROGRAM_DIFFICULTY)}
                    disabled
                />
            </div>
            {division === PROGRAM_DIVISION.집합형 && (
                <DropdownInputItem
                    label="운영 지역"
                    placeholder="운영 지역 선택"
                    dropdownKey={operateLocationKey}
                    items={PROGRAM_OPERATION_LOCATIONS}
                />
            )}
        </div>
    );
};

const ManagerForm = ({ division = PROGRAM_DIVISION.집합형 }) => {
    const {
        managerNameKey,
        managerPhoneNumberKey,
        managerEmailKey,
        schoolNameKey,
        schoolCodeKey,
        operateLocationKey,
        schoolTypeKey,
    } = CAMP_KEYS;

    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">담당자 정보</h5>
            <div className={styles.divideRow}>
                <InputItem
                    label="현장 담당자 명"
                    placeholder="예) 김구름"
                    inputKey={managerNameKey}
                />
                <InputItem
                    label="담당자 연락처"
                    placeholder="예) 010-1234-5678"
                    inputKey={managerPhoneNumberKey}
                    onInput={formatPhoneNumberInput}
                    maxLength={13}
                />
            </div>
            {division === PROGRAM_DIVISION.집합형 ? (
                <InputItem
                    label="담당자 이메일"
                    placeholder="예) goormee@goorm.io"
                    inputKey={managerEmailKey}
                />
            ) : (
                <>
                    <div className={styles.divideRow}>
                        <InputItem
                            label="담당자 이메일"
                            placeholder="예) goormee@goorm.io"
                            inputKey={managerEmailKey}
                        />
                        <SearchSchoolInput
                            schoolKey={{
                                schoolCodeKey,
                                schoolNameKey,
                            }}
                        />
                    </div>
                    <div className={styles.divideRow}>
                        <DropdownInputItem
                            label="운영 지역"
                            dropdownKey={operateLocationKey}
                            items={PROGRAM_OPERATION_LOCATIONS}
                            placeholder="운영 지역 선택"
                        />
                        <DropdownInputItem
                            label="학교 유형"
                            dropdownKey={schoolTypeKey}
                            items={PROGRAM_SCHOOL_TYPE}
                            placeholder="학교 유형 선택"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

const TeacherForm = () => {
    const { mainEducatorKey, subEducatorKey } = CAMP_KEYS;
    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">강사 정보</h5>
            <div>
                <div className={styles.divideRow}>
                    <InputItem
                        label="강사명"
                        placeholder="예) 김구름"
                        inputKey={mainEducatorKey}
                    />
                    <InputItem
                        label="보조 강사명"
                        placeholder="예) 김구름"
                        inputKey={subEducatorKey}
                    />
                </div>
                <CustomAlert leftIcon={InfoCircleIcon} className="mt-3 mb-0">
                    강사 정보는 운영 기관에서 직접 입력해야 합니다.
                </CustomAlert>
            </div>
        </div>
    );
};

const TargetForm = ({ programTargetGroup }) => {
    const { applicantCountKey } = CAMP_KEYS;

    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">신청 대상 정보</h5>
            <ApplyTargetInput programTargetGroup={programTargetGroup} />
            <InputItem
                label="신청 인원"
                placeholder="예) 15"
                inputKey={applicantCountKey}
                onInput={formatNumberInput}
            />
        </div>
    );
};

const TargetEditForm = ({ programTargetGroup }) => {
    const { applicantCountKey, classKey } = CAMP_KEYS;

    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">신청 대상 정보</h5>
            <ApplyTargetInput programTargetGroup={programTargetGroup} />
            <div className={styles.divideRow}>
                <InputItem
                    label="최초 신청 인원"
                    inputKey={applicantCountKey}
                    disabled
                />
                <InputItem label="분반" inputKey={classKey} disabled />
            </div>
        </div>
    );
};

const EducationForm = ({ division = PROGRAM_DIVISION.집합형 }) => {
    const {
        learningTimeKey,
        educationStartDateKey,
        educationStartTimeKey,
        educationEndDateKey,
        educationEndTimeKey,
        educationLocationNameKey,
        educationLocationAddressKey,
    } = CAMP_KEYS;

    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">교육 정보</h5>
            <InputItem
                label="총 교육 차시"
                placeholder="예) 8"
                inputKey={learningTimeKey}
                onInput={formatNumberInput}
                disabled
            />
            <div className={styles.divideRow}>
                <FormDatePicker
                    label="교육 시작일"
                    datePickerKey={educationStartDateKey}
                    timePickerKey={educationStartTimeKey}
                />
                <FormDatePicker
                    label="교육 종료일"
                    datePickerKey={educationEndDateKey}
                    timePickerKey={educationEndTimeKey}
                />
            </div>
            {division === PROGRAM_DIVISION.집합형 && (
                <div className={styles.divideRow}>
                    <InputItem
                        label="교육 장소"
                        placeholder="예) 구름 타운홀"
                        inputKey={educationLocationNameKey}
                    />
                    <EducationAddress
                        addressKey={educationLocationAddressKey}
                    />
                </div>
            )}
        </div>
    );
};

/** 집합형 캠프 생성 */
export const CampInfoInputForm = ({ programTargetGroup }) => (
    <div className={styles.forms}>
        <CampForm />
        <ManagerForm />
        <TeacherForm />
        <TargetForm programTargetGroup={programTargetGroup} />
        <EducationForm />
    </div>
);

/** 캠프 수정 */
export const CampEditForm = ({ program }) => {
    const {
        type: { division },
        targetGroup,
    } = program;
    return (
        <div className={styles.forms}>
            <CampForm division={division} />
            <ManagerForm division={division} />
            <TeacherForm />
            <TargetEditForm programTargetGroup={targetGroup} />
            <EducationForm division={division} />
        </div>
    );
};
