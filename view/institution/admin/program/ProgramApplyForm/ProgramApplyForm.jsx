import { useEffect, useState, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _isEmpty from 'lodash/isEmpty';

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
import {
    PROGRAM_CATEGORIES,
    PROGRAM_OPERATION_LOCATIONS,
} from '@/constants/db';

import {
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Checkbox,
} from '@goorm-dev/gds-components';
import { ChevronDownIcon, NoticeCircleIcon } from '@goorm-dev/gds-icons';

import useToggle from '@/hooks/useToggle';
import { PROGRAM_APPLY_KEYS, SCHOOL } from '../program.contants.js';

const InputItem = ({ label, inputKey, placeholder, ...props }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { ref, ...rest } = register(inputKey, {
        required: '필수 항목을 입력해주세요.',
    });
    return (
        <FormInput
            ref={ref}
            isRequired
            label={label}
            placeholder={placeholder}
            feedback={errors[inputKey]?.message}
            invalid={!!errors[inputKey]}
            {...props}
            {...rest}
        />
    );
};

const PriceInputItem = ({ priceKey }) => {
    const {
        setValue,
        watch,
        register,
        formState: { errors },
    } = useFormContext();

    const price = watch(priceKey);
    const [isCharged, setIsCharged] = useState(price > 0);

    return (
        <div className={styles.buttonGroup}>
            <FormButtonToggleGroup
                label="비용"
                defaultIndex={isCharged ? 1 : 0}
                items={[
                    {
                        children: '무료',
                        props: {
                            onClick: () => {
                                setIsCharged(false);
                                setValue(priceKey, 0);
                            },
                        },
                    },
                    {
                        children: '유료',
                        props: {
                            onClick: () => setIsCharged(true),
                        },
                    },
                ]}
                size="md"
                isRequired
            />
            {isCharged && (
                <div>
                    <Input
                        type="number"
                        placeholder="금액을 입력해주세요."
                        defaultValue={price}
                        bsSize="lg"
                        {...register(priceKey, {
                            min: {
                                value: 1,
                                message: '필수 항목을 입력해주세요.',
                            },
                            required: '필수 항목을 입력해주세요.',
                        })}
                        invalid={!!errors[priceKey]}
                    />
                    {errors[priceKey] && (
                        <div className="d-flex algin-items-center text-danger mt-1">
                            <NoticeCircleIcon />
                            <p className="ml-1">{errors[priceKey].message}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const ProgramTypeInput = ({ campType, typeKey }) => {
    const { setValue, watch } = useFormContext();

    const items = ['장기', '단기'];
    const [isOpen, toggle] = useToggle(false);

    useEffect(() => {
        setValue(typeKey, {
            camp: campType,
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
                    {campType}
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
                                    setValue('type', {
                                        camp: campType,
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

const EditorInput = ({ editorKey, label, placeholder }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={editorKey}
            rules={{
                required: '필수 항목을 입력해주세요.',
                validate: (value) =>
                    value !== '<p><br></p>' || '필수 항목을 입력해주세요!',
            }}
            render={({ field: { value, onChange, onBlur } }) => (
                <div>
                    <FormEditor
                        isRequired
                        label={label}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                    {errors[editorKey] && (
                        <div className="d-flex algin-items-center text-danger mt-1">
                            <NoticeCircleIcon />
                            <p className="ml-1">{errors[editorKey]?.message}</p>
                        </div>
                    )}
                </div>
            )}
        />
    );
};

const DropdownInput = ({ label, dropdownKey, items, placeholder }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={dropdownKey}
            rules={{
                required: '필수 항목을 입력해주세요.',
            }}
            render={({ field: { value, onBlur, onChange } }) => (
                <FormDropdown
                    isRequired
                    label={label}
                    defaultValue={value}
                    placeholder={placeholder}
                    items={items}
                    dropdownKey={dropdownKey}
                    onBlur={onBlur}
                    onChange={onChange}
                    invalid={!!errors[dropdownKey]}
                    feedback={errors[dropdownKey]?.message}
                />
            )}
        />
    );
};

const BasicForm = ({ type }) => {
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

    const [thumbnail] = getValues([thumbnailKey]);

    return (
        <div className={styles.form}>
            <h5>기본 정보</h5>
            <FormFileInput.WithImage
                label="프로그램 썸네일"
                isRequired
                maxFileSize={2}
                fileKey={{ thumbnailKey, thumbnailFileKey }}
                defaultFiles={thumbnail ? [thumbnail] : []}
            />
            <div className={styles.divideRow}>
                <InputItem
                    label="프로그램 명"
                    placeholder="예) 신나는 로봇 코딩"
                    inputKey={nameKey}
                />
                <ProgramTypeInput campType={type} typeKey={typeKey} />
            </div>
            <div className={styles.divideRow}>
                <DropdownInput
                    label="프로그램 카테고리"
                    dropdownKey={categoryKey}
                    placeholder="카테고리 선택"
                    items={PROGRAM_CATEGORIES}
                />
                <PriceInputItem priceKey={priceKey} />
            </div>
            <EditorInput
                label="프로그램 소개"
                placeholder="예) 프로그래밍의 순차와 반복에 대해 학습하며 컴퓨팅 사고력을 키운다."
                editorKey={descriptionKey}
            />
            <DropdownInput
                label="운영 지역"
                placeholder="운영 지역 선택"
                items={PROGRAM_OPERATION_LOCATIONS}
                dropdownKey={operateLocationKey}
            />
            <InputItem
                label="문의처(기관)"
                placeholder="프로그램 관련 문의할 수 있는 연락처나 이메일을 입력해주세요."
                inputKey={contactKey}
            />
        </div>
    );
};

const ApplyForm = ({ program }) => {
    return (
        <div className={styles.form}>
            <h5>신청 정보</h5>
            <ApplyTargetInput targetGroup={program?.targetGroup} />
        </div>
    );
};

const EducationForm = ({ type }) => {
    const { getValues } = useFormContext();
    const {
        attachedFilesKey,
        learningTimeKey,
        curriculumKey,
        noticeKey,
        educationLocationNameKey,
        educationLocationAddressKey,
    } = PROGRAM_APPLY_KEYS;

    return (
        <div className={styles.form}>
            <h5>교육 정보</h5>
            <InputItem
                type="number"
                label="총 교육 시간"
                placeholder="예) 20 (단위: 시간)"
                inputKey={learningTimeKey}
            />
            {/** 교육 기간 DatePicker 논의 중 */}
            <EditorInput
                label="커리큘럼"
                placeholder={`예) \n1차시. 순차 구조와 반복 구조 이해하기 \n2차시. 로봇을 활용한 그림 그리기`}
                editorKey={curriculumKey}
            />
            <FormFileInput
                label="프로그램 교안 첨부 파일"
                isRequired
                maxFileSize={30}
                fileKey={attachedFilesKey}
                defaultFiles={
                    getValues(attachedFilesKey)
                        ? [getValues(attachedFilesKey)]
                        : []
                }
            />
            <InputItem
                type="textarea"
                label="안내사항"
                placeholder="안내 사항이나 주의 사항을 입력해주세요."
                className={styles.textarea}
                inputKey={noticeKey}
            />
            {type === '집합형' && (
                <div className={styles.divideRow}>
                    <InputItem
                        label="교육 장소"
                        placeholder="예) 구름 타운홀"
                        inputKey={educationLocationNameKey}
                    />
                    <InputItem
                        label="교육 주소"
                        placeholder="교육 주소"
                        inputKey={educationLocationAddressKey}
                    />
                </div>
            )}
        </div>
    );
};

const EditForm = ({ camp }) => (
    <>
        <BasicForm type={camp} />
        <ApplyForm />
        <EducationForm type={camp} />
    </>
);

export default EditForm;
