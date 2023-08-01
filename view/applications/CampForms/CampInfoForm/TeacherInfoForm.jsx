import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import {
    FormDatePicker,
    FormDropdown,
    FormInput,
    FormWrapper,
} from '@/components/FormItem';

import Divider from '@/components/Divider/Divider';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

import { Checkbox } from '@goorm-dev/gds-components';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import styles from '../CampForms.module.scss';

import {
    CAMP_APPLY_KEYS,
    SCHOOL,
    PROGRAM_KEYS,
    USER_KEYS,
} from '../CampForms.constants';

// 방문형 프로그램 캠프 신청 폼

const ApplyTargetInput = ({ programTarget }) => {
    const { watch } = useFormContext();

    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        CAMP_APPLY_KEYS;

    const targetFields = watch([
        elementaryTargetKey,
        middleTargetKey,
        highTargetKey,
    ]);

    const targetSchool = Object.values(programTarget) || {};

    return (
        <FormWrapper label="신청 가능 대상" isRequired>
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
                                            disabled ? styles.disabled : '',
                                        )}
                                        label={`${idx + 1}학년`}
                                        key={idx}
                                        disabled={disabled}
                                        checked={targetFields[index]?.includes(
                                            idx + 1,
                                        )}
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

export const ReadOnlyProgramForm = () => {
    const { getValues } = useFormContext();

    const { institutionKey, typeKey, nameKey } = PROGRAM_KEYS;

    return (
        <div className={styles.form}>
            <h5>프로그램 정보</h5>
            <FormInput
                label="운영 기관 명"
                value={getValues(institutionKey)}
                readOnly
            />
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 유형"
                    value={getValues(typeKey)}
                    readOnly
                />
                <FormInput
                    label="프로그램 명"
                    value={getValues(nameKey)}
                    readOnly
                />
            </div>
        </div>
    );
};

export const ReadOnlyManagerForm = () => {
    const { getValues } = useFormContext();

    const { userNameKey, schoolNameKey, operateLocationKey, schoolTypeKey } =
        CAMP_APPLY_KEYS;
    const { phoneNumberKey, emailKey } = USER_KEYS;

    return (
        <div className={styles.form}>
            <h5>담당자 정보</h5>
            <div className={styles.divideRow}>
                <FormInput
                    isRequired
                    label="현장 담당자 명"
                    placeholder="예) 김구름"
                    value={getValues(userNameKey)}
                    readOnly
                />
                <FormInput
                    label="담당자 연락처"
                    value={getValues(phoneNumberKey)}
                    readOnly
                />
            </div>
            <div className={styles.divideRow}>
                <FormInput
                    label="담당자 이메일"
                    value={getValues(emailKey)}
                    readOnly
                />
                <FormInput
                    isRequired
                    label="소속 학교(교육 장소)"
                    placeholder="소속 학교"
                    value={getValues(schoolNameKey)}
                    readOnly
                />
            </div>
            <div className={styles.divideRow}>
                <FormDropdown
                    isRequired
                    label="신청 지역"
                    value={getValues(operateLocationKey)}
                    readOnly
                />
                <FormInput
                    label="학교 유형"
                    placeholder="예) 늘봄 학교"
                    formText="미 입력시 일반 학교로 자동 등록됩니다."
                    value={getValues(schoolTypeKey) || '일반 학교'}
                    readOnly
                />
            </div>
        </div>
    );
};

export const ReadOnlyTeacherForm = () => {
    const { getValues } = useFormContext();

    const { mainEducatorKey, subEducatorKey } = CAMP_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>강사 정보</h5>
            <div>
                <div className={styles.divideRow}>
                    <FormInput
                        label="강사 명"
                        value={getValues(mainEducatorKey)}
                        readOnly
                    />
                    <FormInput
                        label="보조 강사 명"
                        value={getValues(subEducatorKey)}
                        readOnly
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

export const ReadOnlyTargetForm = ({ programTarget }) => {
    const { getValues } = useFormContext();
    const { applicantCountKey } = CAMP_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>신청 대상 정보</h5>
            <ApplyTargetInput programTarget={programTarget} />
            <FormInput
                label="신청 인원"
                value={getValues(applicantCountKey)}
                isRequired
                readOnly
            />
        </div>
    );
};

export const ReadOnlyLearningTimeForm = () => {
    const { getValues } = useFormContext();
    const { learningTimeKey } = PROGRAM_KEYS;
    const { startDateKey, startTimeKey, endDateKey, endTimeKey } =
        CAMP_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>교육 시간</h5>
            <FormInput
                label="총 교육 차시"
                placeholder="8차시"
                value={getValues(learningTimeKey)}
                readOnly
            />
            <div className={styles.divideRow}>
                <FormDatePicker
                    label="교육 이수 시작일"
                    isRequired
                    datePickerKey={startDateKey}
                    timePickerKey={startTimeKey}
                    disabled
                />
                <FormDatePicker
                    label="교육 이수 종료일"
                    isRequired
                    datePickerKey={endDateKey}
                    timePickerKey={endTimeKey}
                    disabled
                />
            </div>
        </div>
    );
};
