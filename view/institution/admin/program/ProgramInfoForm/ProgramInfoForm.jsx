import { useFormContext } from 'react-hook-form';
import {
    FormWrapper,
    FormButtonToggleGroup,
    FormDropdown,
    FormFileInput,
    FormInput,
    FormEditor,
} from '@/components/FormItem';
import Divider from '@/components/Divider';
import styles from '../program.module.scss';

import { Input, Button, Checkbox } from '@goorm-dev/gds-components';
import { ChevronDownIcon } from '@goorm-dev/gds-icons';

import { PROGRAM_APPLY_KEYS, SCHOOL } from '../program.contants';
import cn from 'classnames';

const PriceInputItem = ({ priceKey }) => {
    const { getValues } = useFormContext();

    const price = getValues(priceKey);

    return (
        <div className={styles.buttonGroup}>
            <FormButtonToggleGroup
                label="비용"
                defaultIndex={price > 0 ? 1 : 0}
                items={[
                    {
                        children: '무료',
                        props: { disabled: true },
                    },
                    {
                        children: '유료',
                        props: { disabled: true },
                    },
                ]}
                size="md"
                isRequired
            />
            {price > 0 && (
                <Input
                    type="number"
                    placeholder="금액을 입력해주세요."
                    value={price}
                    bsSize="lg"
                    readOnly
                />
            )}
        </div>
    );
};

const ProgramTypeInput = ({ typeKey }) => {
    const { getValues } = useFormContext();

    return (
        <div className={styles.divideRow}>
            <FormDropdown
                label="프로그램 유형"
                placeholder={getValues(`${typeKey}.camp`)}
                isRequired
                readOnly
            />
            <Button
                icon={<ChevronDownIcon />}
                color="select"
                iconSide="right"
                size="lg"
                className={cn(styles.button, styles.dropdown)}
                disabled
            >
                {getValues(`${typeKey}.duration`)}
            </Button>
        </div>
    );
};

const ApplyTargetInput = () => {
    const { getValues } = useFormContext();
    const { elementaryTargetKey, middleTargetKey, highTargetKey } =
        PROGRAM_APPLY_KEYS;

    const targetFields = getValues([
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

const ReadOnlyBasicForm = () => {
    const { getValues } = useFormContext();
    const {
        thumbnailKey,
        thumbnailFileKey,
        nameKey,
        categoryKey,
        operateLocationKey,
        typeKey,
        priceKey,
        descriptionKey,
        contactKey,
    } = PROGRAM_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>기본 정보</h5>
            <FormFileInput.WithImage
                label="프로그램 썸네일"
                isRequired
                maxFileSize={2}
                fileKey={{ thumbnailKey, thumbnailFileKey }}
                defaultFiles={
                    getValues(thumbnailKey) ? [getValues(thumbnailKey)] : []
                }
                disabled
            />
            <div className={styles.divideRow}>
                <FormInput
                    label="프로그램 명"
                    isRequired
                    value={getValues(nameKey)}
                    readOnly
                />
                <ProgramTypeInput typeKey={typeKey} />
            </div>
            <div className={styles.divideRow}>
                <FormDropdown
                    label="프로그램 카테고리"
                    placeholder={getValues(categoryKey)}
                    isRequired
                    readOnly
                />
                <PriceInputItem priceKey={priceKey} />
            </div>
            <FormEditor
                label="프로그램 소개"
                value={getValues(descriptionKey)}
                editorKey={descriptionKey}
                isRequired
                readOnly
            />
            <FormDropdown
                label="운영 지역"
                placeholder={getValues(operateLocationKey)}
                dropdownKey={operateLocationKey}
                isRequired
                readOnly
            />
            <FormInput
                type="textarea"
                label="문의처(기관)"
                className={styles.textarea}
                value={getValues(contactKey)}
                isRequired
                readOnly
            />
        </div>
    );
};

const ReadOnlyApplyForm = () => {
    return (
        <div className={styles.form}>
            <h5>신청 정보</h5>
            <ApplyTargetInput />
        </div>
    );
};

const ReadOnlyEducationForm = () => {
    const { getValues } = useFormContext();
    const {
        attachedFilesKey,
        learningTimeKey,
        curriculumKey,
        noticeKey,
        educationLocationNameKey,
        educationLocationAddressKey,
        typeKey,
    } = PROGRAM_APPLY_KEYS;

    const [
        attachedFiles,
        learningTime,
        curriculum,
        notice,
        educationLocationName,
        educationLocationAddress,
        type,
    ] = getValues([
        attachedFilesKey,
        learningTimeKey,
        curriculumKey,
        noticeKey,
        educationLocationNameKey,
        educationLocationAddressKey,
        typeKey,
    ]);

    return (
        <div className={styles.form}>
            <h5>교육 정보</h5>
            <FormInput
                type="number"
                label="총 교육 시간"
                value={learningTime}
                isRequired
                readOnly
            />
            {/** 교육 기간 DatePicker 논의 중 */}
            <FormEditor
                label="커리큘럼"
                value={curriculum}
                editorKey={curriculumKey}
                isRequired
                readOnly
            />
            <FormFileInput
                label="프로그램 교안 첨부 파일"
                isRequired
                maxFileSize={30}
                fileKey={attachedFilesKey}
                defaultFiles={attachedFiles ? [attachedFiles] : []}
                disabled
            />
            <FormInput
                type="textarea"
                label="안내사항"
                value={notice}
                className={styles.textarea}
                isRequired
                readOnly
            />
            {type.camp === '집합형' && (
                <div className={styles.divideRow}>
                    <FormInput
                        label="교육 장소"
                        value={educationLocationName}
                        isRequired
                        readOnly
                    />
                    <FormInput
                        label="교육 주소"
                        value={educationLocationAddress}
                        isRequired
                        readOnly
                    />
                </div>
            )}
        </div>
    );
};

const InfoForm = () => (
    <>
        <ReadOnlyBasicForm />
        <ReadOnlyApplyForm />
        <ReadOnlyEducationForm />
    </>
);

export default InfoForm;
