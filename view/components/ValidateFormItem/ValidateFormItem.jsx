import { Controller, useFormContext } from 'react-hook-form';
import {
    FormDropdown,
    FormEditor,
    FormFileInput,
    FormInput,
} from '@/components/FormItem';

import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import CustomDatePicker from '@/components/CustomDatePicker';
import TimePicker from '@/components/TimePicker';

export const DropdownInputItem = ({
    label,
    dropdownKey,
    items,
    placeholder,
    isRequired,
    ...props
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={dropdownKey}
            rules={{
                ...(isRequired
                    ? {
                          required: '필수 항목을 선택해주세요.',
                      }
                    : {}),
            }}
            render={({ field: { value, onChange, onBlur } }) => (
                <FormDropdown
                    isRequired={isRequired}
                    label={label}
                    value={value ? value : placeholder}
                    placeholder={placeholder}
                    items={items}
                    dropdownKey={dropdownKey}
                    invalid={!!errors[dropdownKey]}
                    feedback={errors[dropdownKey]?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
            )}
        />
    );
};

export const EditorInputItem = ({ editorKey, label, placeholder }) => {
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
                        <div className="d-flex align-items-center text-danger mt-1">
                            <NoticeCircleIcon />
                            <p className="ml-1">{errors[editorKey]?.message}</p>
                        </div>
                    )}
                </div>
            )}
        />
    );
};

export const InputItem = ({
    isRequired,
    label,
    inputKey,
    placeholder,
    validate,
    ...props
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { ref, ...rest } = register(inputKey, {
        ...(isRequired
            ? {
                  required: '필수 항목을 입력해주세요.',
                  ...validate,
              }
            : {}),
    });

    return (
        <FormInput
            ref={ref}
            isRequired={isRequired}
            label={label}
            placeholder={placeholder}
            {...(isRequired && {
                feedback: errors[inputKey]?.message,
                invalid: !!errors[inputKey],
            })}
            {...props}
            {...rest}
        />
    );
};

export const FileInputItem = ({
    isRequired = true,
    label,
    fileKey,
    maxFileSize,
    disabled,
    defaultValue,
    ...props
}) => {
    const {
        control,
        formState: { errors, isDirty },
        trigger,
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={fileKey}
            rules={{
                validate: {
                    requiredFile: (fieldValue) =>
                        isDirty && fieldValue === undefined
                            ? '파일을 업로드해주세요.'
                            : undefined,
                },
            }}
            defaultValue={defaultValue}
            render={({ field: { value, onChange } }) => {
                const handleChange = (value) => {
                    onChange(value);
                    trigger(fileKey);
                };
                return (
                    <FormFileInput
                        isRequired={isRequired}
                        label={label}
                        value={value}
                        onChange={handleChange}
                        errors={errors[fileKey]}
                        maxFileSize={maxFileSize}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        {...props}
                    />
                );
            }}
        />
    );
};

export const ImageFileInputItem = ({
    label,
    fileKey,
    maxFileSize,
    disabled,
    ...props
}) => {
    const {
        control,
        trigger,
        formState: { errors, isDirty },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={fileKey}
            rules={{
                validate: {
                    requiredFile: (fieldValue) =>
                        isDirty && fieldValue === undefined
                            ? '파일을 업로드해주세요.'
                            : undefined,
                },
            }}
            render={({ field: { value, onChange } }) => {
                const handleChange = (value) => {
                    onChange(value);
                    trigger(fileKey);
                };
                return (
                    <FormFileInput.WithImage
                        isRequired
                        label={label}
                        value={value}
                        onChange={handleChange}
                        errors={errors[fileKey]}
                        maxFileSize={maxFileSize}
                        disabled={disabled}
                        {...props}
                    />
                );
            }}
        />
    );
};

export const DatePickerItem = ({
    isRequired,
    datePickerKey,
    disabled,
    date,
    calendarProps,
    ...props
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={datePickerKey}
            rules={{
                ...(isRequired
                    ? {
                          required: '필수 항목을 선택해주세요.',
                      }
                    : {}),
            }}
            render={({ field: { ref, value, onChange, onBlur } }) => {
                return (
                    <div className="d-flex flex-column" style={{ flex: 1 }}>
                        <CustomDatePicker
                            ref={ref}
                            date={value}
                            onChange={onChange}
                            inputProps={{
                                invalid: !!errors[datePickerKey],
                                onBlur,
                                ...props,
                            }}
                            calendarProps={calendarProps}
                            disabled={disabled}
                        />
                        {errors[datePickerKey] && (
                            <div className="d-flex align-items-center mt-1 text-danger">
                                <NoticeCircleIcon />
                                <span className="ml-1">
                                    {errors[datePickerKey]?.message}
                                </span>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};

export const TimePickerItem = ({
    isRequired,
    timePickerKey,
    disabled,
    ...props
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={timePickerKey}
            rules={{
                ...(isRequired
                    ? {
                          required: '필수 항목을 선택해주세요.',
                      }
                    : {}),
            }}
            render={({ field: { ref, value, onChange, onBlur } }) => {
                return (
                    <div className="d-flex flex-column" style={{ flex: 1 }}>
                        <TimePicker
                            ref={ref}
                            time={value}
                            onChange={onChange}
                            inputProps={{
                                invalid: !!errors[timePickerKey],
                                onBlur,
                                ...props,
                            }}
                            disabled={disabled}
                        />
                        {errors[timePickerKey] && (
                            <div className="d-flex align-items-center mt-1 text-danger">
                                <NoticeCircleIcon />
                                <span className="ml-1">
                                    {errors[timePickerKey]?.message}
                                </span>
                            </div>
                        )}
                    </div>
                );
            }}
        />
    );
};
