import { useFormContext } from 'react-hook-form';
import {
    FormWrapper,
    FormDropdown,
    FormInput,
    FormEditor,
    FormDatePicker,
} from '@/components/FormItem';
import Divider from '@/components/Divider';
import styles from '../program.module.scss';

import { Button, Checkbox } from '@goorm-dev/gds-components';
import { ChevronDownIcon } from '@goorm-dev/gds-icons';

import { PROGRAM_APPLY_KEYS, SCHOOL } from '../program.contants';

import {
    FileInputItem,
    ImageFileInputItem,
} from '@/view/components/ValidateFormItem';

const ProgramTypeInput = ({ division, durationKey }) => {
    const { getValues } = useFormContext();

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
                <Button
                    icon={<ChevronDownIcon />}
                    color="select"
                    iconSide="right"
                    size="lg"
                    className={styles.button}
                    disabled
                >
                    {getValues(durationKey)}
                </Button>
            </div>
        </FormWrapper>
    );
};

const ApplyTargetInput = () => {
    const { watch } = useFormContext();
    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        PROGRAM_APPLY_KEYS;

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
                                <Checkbox
                                    className={styles.readOnly}
                                    label={`${idx + 1}학년`}
                                    key={idx}
                                    checked={targetFields[index]?.includes(
                                        idx + 1,
                                    )}
                                    readOnly
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </FormWrapper>
    );
};

const ReadOnlyBasicForm = ({ division }) => {
    const { getValues } = useFormContext();
    const {
        thumbnailKey,
        nameKey,
        categoryKey,
        difficultyKey,
        durationKey,
        operateLocationKey,
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
                disabled
            />
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 명"
                    isRequired
                    value={getValues(nameKey)}
                    readOnly
                />
                <ProgramTypeInput
                    division={division}
                    durationKey={durationKey}
                />
            </div>
            <div className={styles.divideRow}>
                <FormDropdown
                    label="프로그램 카테고리"
                    value={getValues(categoryKey)}
                    isRequired
                    readOnly
                />
                <FormDropdown
                    label="프로그램 수준"
                    value={getValues(difficultyKey)}
                    dropdownKey={difficultyKey}
                    isRequired
                    readOnly
                />
            </div>
            <FormDropdown
                label="운영 지역"
                value={getValues(operateLocationKey)}
                dropdownKey={operateLocationKey}
                isRequired
                readOnly
            />
            <FormEditor
                label="프로그램 소개"
                value={getValues(descriptionKey)}
                editorKey={descriptionKey}
                isRequired
                readOnly
            />
            <FormEditor
                label="문의처(기관)"
                value={getValues(contactKey)}
                isRequired
                readOnly
            />
        </div>
    );
};

const ReadOnlyApplyForm = () => {
    const {
        applyStartDateKey,
        applyStartTimeKey,
        applyEndDateKey,
        applyEndTimeKey,
    } = PROGRAM_APPLY_KEYS;
    return (
        <div className={styles.form}>
            <h5>신청 정보</h5>
            <div className={styles.divideRow}>
                <FormDatePicker
                    label="신청 시작일"
                    isRequired
                    datePickerKey={applyStartDateKey}
                    timePickerKey={applyStartTimeKey}
                    disabled
                />
                <FormDatePicker
                    label="신청 종료일"
                    isRequired
                    datePickerKey={applyEndDateKey}
                    timePickerKey={applyEndTimeKey}
                    disabled
                />
            </div>
            <ApplyTargetInput />
        </div>
    );
};

const ReadOnlyEducationForm = ({ division }) => {
    const { getValues } = useFormContext();
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

    return (
        <div className={styles.form}>
            <h5>교육 정보</h5>
            <FormInput
                type="number"
                label="총 교육 차시"
                value={getValues(learningTimeKey)}
                isRequired
                readOnly
            />
            <div className={styles.divideRow}>
                <FormDatePicker
                    label="교육 가능 시작일"
                    isRequired
                    datePickerKey={educationStartDateKey}
                    timePickerKey={educationStartTimeKey}
                    disabled
                />
                <FormDatePicker
                    label="교육 가능 종료일"
                    isRequired
                    datePickerKey={educationEndDateKey}
                    timePickerKey={educationEndTimeKey}
                    disabled
                />
            </div>
            <FormEditor
                label="커리큘럼"
                value={getValues(curriculumKey)}
                editorKey={curriculumKey}
                isRequired
                readOnly
            />
            <FileInputItem
                label="프로그램 교안 첨부 파일"
                isRequired
                maxFileSize={30}
                fileKey={attachedFilesKey}
                disabled
            />
            <FormEditor
                label="안내사항"
                value={getValues(noticeKey)}
                isRequired
                readOnly
            />
            {division === '집합형' && (
                <div className={styles.divideRow}>
                    <FormInput
                        label="교육 장소"
                        value={getValues(educationLocationNameKey)}
                        isRequired
                        readOnly
                    />
                    <FormInput
                        label="교육 주소"
                        value={getValues(educationLocationAddressKey)}
                        isRequired
                        readOnly
                    />
                </div>
            )}
        </div>
    );
};

const InfoForm = ({ division }) => (
    <>
        <ReadOnlyBasicForm division={division} />
        <ReadOnlyApplyForm />
        <ReadOnlyEducationForm division={division} />
    </>
);

export default InfoForm;
