import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { FormWrapper, FormDatePicker } from '@/components/FormItem';
import {
    DropdownInputItem,
    InputItem,
} from '@/view/components/ValidateFormItem';

import Divider from '@/components/Divider';
import { Button, Checkbox } from '@goorm-dev/gds-components';
import {
    EditIcon,
    ChevronDownIcon,
    InfoCircleIcon,
} from '@goorm-dev/gds-icons';
import styles from '../CampForms.module.scss';

import { CAMP_INFO_KEYS, SCHOOL } from '../CampForms.constants';
import { PROGRAM_DIVISION } from '@/constants/db';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

const ProgramTypeInput = ({ division, duration, isFoundationPage }) => {
    return (
        <FormWrapper label="캠프 유형">
            <div className={styles.divideRow}>
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size="lg"
                    className={cn(
                        styles.button,
                        styles.dropdown,
                        isFoundationPage && styles.readOnlyButton,
                    )}
                    disabled
                >
                    {division}
                </Button>
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size="lg"
                    className={cn(
                        styles.button,
                        styles.dropdown,
                        isFoundationPage && styles.readOnlyButton,
                    )}
                    disabled
                >
                    {duration}
                </Button>
            </div>
        </FormWrapper>
    );
};

const ApplyTargetInput = ({ programTargetGroup }) => {
    const { watch } = useFormContext();
    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        CAMP_INFO_KEYS;

    const targetFields = watch([
        elementaryTargetKey,
        middleTargetKey,
        highTargetKey,
    ]);

    const targetSchool = Object.values(programTargetGroup) || {};

    return (
        <FormWrapper label="신청 대상">
            <div className={styles.checkForm}>
                {Object.entries(SCHOOL).map(([_, school], index) => (
                    <div className={styles.school} key={school.key}>
                        <div className={styles.schoolName}>{school.key}</div>
                        <Divider height="0.75rem" className={styles.divider} />
                        <div className={styles.schoolGrade}>
                            {school.value.map((_, idx) => {
                                const disabled = !targetSchool[index].includes(
                                    idx + 1,
                                );
                                return (
                                    <Checkbox
                                        className={cn(
                                            styles.readOnly,
                                            disabled && styles.disabled,
                                        )}
                                        label={`${idx + 1}학년`}
                                        key={idx}
                                        checked={targetFields[index]?.includes(
                                            idx + 1,
                                        )}
                                        disabled={disabled}
                                        readOnly
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

const ReadOnlyCampForm = ({ onClickEdit, division, isFoundationPage }) => {
    const {
        typeKey,
        programNameKey,
        categoryKey,
        difficultyKey,
        operateLocationKey,
    } = CAMP_INFO_KEYS;
    const { getValues } = useFormContext();

    return (
        <div className={styles.form}>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-gray-700">캠프 정보</h5>
                {!isFoundationPage && (
                    <Button
                        icon={<EditIcon />}
                        onClick={onClickEdit}
                        size="lg"
                        color="link"
                    >
                        수정하기
                    </Button>
                )}
            </div>
            <div className={styles.divideRow}>
                <ProgramTypeInput
                    division={getValues(`${typeKey}.division`)}
                    duration={getValues(`${typeKey}.duration`)}
                    isFoundationPage={isFoundationPage}
                />
                <InputItem
                    label="캠프 명"
                    inputKey={programNameKey}
                    disabled={!isFoundationPage}
                    readOnly={isFoundationPage}
                />
            </div>

            <div className={styles.divideRow}>
                <DropdownInputItem
                    label="캠프 카테고리"
                    dropdownKey={categoryKey}
                    readOnly
                />
                <DropdownInputItem
                    label="캠프 수준"
                    dropdownKey={difficultyKey}
                    disabled={!isFoundationPage}
                    readOnly={isFoundationPage}
                />
            </div>
            {division === PROGRAM_DIVISION.집합형 && (
                <DropdownInputItem
                    label="운영 지역"
                    dropdownKey={operateLocationKey}
                    readOnly
                />
            )}
        </div>
    );
};

const ReadOnlyManagerForm = ({ division }) => {
    const { getValues } = useFormContext();
    const {
        managerNameKey,
        managerPhoneNumberKey,
        managerEmailKey,
        schoolNameKey,
        operateLocationKey,
        schoolTypeKey,
    } = CAMP_INFO_KEYS;
    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">담당자 정보</h5>
            <div className={styles.divideRow}>
                <InputItem
                    label="현장 담당자 명"
                    inputKey={managerNameKey}
                    placeholder="예) 김구름"
                    readOnly
                />
                <InputItem
                    label="담당자 연락처"
                    inputKey={managerPhoneNumberKey}
                    placeholder="예) 010-1234-5678"
                    readOnly
                />
            </div>
            {division === PROGRAM_DIVISION.집합형 ? (
                <InputItem
                    label="담당자 이메일"
                    inputKey={managerEmailKey}
                    placeholder="예) goormee@goorm.io"
                    readOnly
                />
            ) : (
                <>
                    <div className={styles.divideRow}>
                        <InputItem
                            label="담당자 이메일"
                            inputKey={managerEmailKey}
                            placeholder="예) goormee@goorm.io"
                            readOnly
                        />
                        <DropdownInputItem
                            label="소속 학교(교육 장소)"
                            dropdownKey={schoolNameKey}
                            placeholder="소속 학교"
                            readOnly
                        />
                    </div>
                    <div className={styles.divideRow}>
                        <DropdownInputItem
                            label="운영 지역"
                            dropdownKey={operateLocationKey}
                            placeholder="지역 선택"
                            readOnly
                        />
                        <DropdownInputItem
                            label="학교 유형"
                            dropdownKey={schoolTypeKey}
                            placeholder="학교 유형 선택"
                            readOnly
                        />
                    </div>
                </>
            )}
        </div>
    );
};

const ReadOnlyTeacherForm = ({ isFoundationPage }) => {
    const { mainEducatorKey, subEducatorKey } = CAMP_INFO_KEYS;
    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">강사 정보</h5>
            <div>
                <div className={styles.divideRow}>
                    <InputItem
                        label="강사명"
                        inputKey={mainEducatorKey}
                        placeholder="예) 김구름"
                        readOnly
                    />
                    <InputItem
                        label="보조 강사명"
                        inputKey={subEducatorKey}
                        placeholder="예) 김구름"
                        readOnly
                    />
                </div>
                {!isFoundationPage && (
                    <CustomAlert
                        leftIcon={InfoCircleIcon}
                        className="mt-3 mb-0"
                    >
                        강사 정보는 운영 기관에서 직접 입력해야 합니다.
                    </CustomAlert>
                )}
            </div>
        </div>
    );
};

const ReadOnlyTargetForm = ({ programTargetGroup, isFoundationPage }) => {
    const { applicantCountKey, classKey } = CAMP_INFO_KEYS;
    return (
        <div className={styles.form}>
            <h5 className="text-gray-700">신청 대상 정보</h5>
            <ApplyTargetInput programTargetGroup={programTargetGroup} />
            <div className={styles.divideRow}>
                <InputItem
                    label="최초 신청 인원"
                    inputKey={applicantCountKey}
                    disabled={!isFoundationPage}
                    readOnly={isFoundationPage}
                />
                <InputItem
                    label="분반"
                    inputKey={classKey}
                    disabled={!isFoundationPage}
                    readOnly={isFoundationPage}
                />
            </div>
        </div>
    );
};

const ReadOnlyEducationForm = ({ division, isFoundationPage }) => {
    const {
        learningTimeKey,
        educationStartDateKey,
        educationEndDateKey,
        educationLocationNameKey,
        educationLocationAddressKey,
    } = CAMP_INFO_KEYS;

    return (
        <div className={styles.form}>
            {division === PROGRAM_DIVISION.집합형 ? (
                <h5 className="text-gray-700">교육 정보</h5>
            ) : (
                <h5 className="text-gray-700">교육 시간</h5>
            )}
            <InputItem
                label="총 교육 차시"
                inputKey={learningTimeKey}
                disabled={!isFoundationPage}
                readOnly={isFoundationPage}
            />
            <div className={styles.divideRow}>
                <FormDatePicker
                    label="교육 시작일"
                    datePickerKey={educationStartDateKey}
                    disabled
                />
                <FormDatePicker
                    label="교육 종료일"
                    datePickerKey={educationEndDateKey}
                    disabled
                />
            </div>
            {division === PROGRAM_DIVISION.집합형 && (
                <div className={styles.divideRow}>
                    <InputItem
                        label="교육 장소"
                        inputKey={educationLocationNameKey}
                        readOnly
                    />
                    <InputItem
                        label="교육 주소"
                        inputKey={educationLocationAddressKey}
                        readOnly
                    />
                </div>
            )}
        </div>
    );
};

/** 캠프 정보 */
export const CampInfoForm = ({ program, onClickEdit, isFoundationPage }) => {
    const {
        type: { division },
        targetGroup,
    } = program;

    return (
        <div className={styles.infoForms}>
            <ReadOnlyCampForm
                division={division}
                onClickEdit={onClickEdit}
                isFoundationPage={isFoundationPage}
            />
            <ReadOnlyManagerForm division={division} />
            <ReadOnlyTeacherForm isFoundationPage={isFoundationPage} />
            <ReadOnlyTargetForm
                programTargetGroup={targetGroup}
                isFoundationPage={isFoundationPage}
            />
            <ReadOnlyEducationForm
                division={division}
                isFoundationPage={isFoundationPage}
            />
        </div>
    );
};
