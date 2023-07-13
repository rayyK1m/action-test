import { useEffect, useMemo } from 'react';
import FormWrapper from '../FormWrapper';
import { useFileInput, FileInput } from '@goorm-dev/gds-components';
import { InfoCircleIcon } from '@goorm-dev/gds-icons';
import FormFileInputWithImage from './WithImage/FormFileInputWithImage';
import { useFormContext } from 'react-hook-form';

import styles from './FormFileInput.module.scss';

const FormFileInput = ({
    label,
    isRequired,
    maxFileSize,
    fileKey,
    defaultFiles,
    disabled,
}) => {
    const {
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        isMultiple: false,
        defaultFiles,
    });

    const fileSizeMB = useMemo(
        () => Number((fileSize / 1024 / 1024).toFixed(2)) || 0,
        [fileSize],
    );

    const isError = useMemo(() => {
        if (fileSize > maxFileSize * 1024 * 1024) return 'maxSize';
        if (fileSize === 0) return 'required';
        return false;
    }, [fileSize, maxFileSize]);

    useEffect(() => {
        if (Object.values(fileMap).length) {
            const tempFile = Object.values(fileMap)[0]?.file;
            if (tempFile.src) return;
            setValue(fileKey, tempFile);
        }
    }, [fileMap, fileSize]);

    useEffect(() => {
        if (isError) {
            setError(fileKey, {
                type: isError,
                message:
                    isError === 'maxSize'
                        ? '파일 용량이 2MB를 초과하였습니다. 파일을 다시 선택해 주세요.'
                        : '파일을 업로드해주세요.',
            });
        } else {
            clearErrors(fileKey);
        }
    }, [isError]);

    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <FileInput
                {...getFileInputProps()}
                badgeMaxWidth={160}
                captionText={isError && errors[fileKey]?.message}
                isError={isError}
                className={disabled && styles.disabledInput}
            />
            {errors[fileKey]?.type !== 'maxSize' && (
                <div className="d-flex align-items-center form-text text-default">
                    <InfoCircleIcon className="mr-1" />
                    {`최대 ${maxFileSize}MB 까지 업로드 가능합니다. (${fileSizeMB}MB/${maxFileSize}MB)`}
                </div>
            )}
        </FormWrapper>
    );
};

FormFileInput.WithImage = FormFileInputWithImage;

FormFileInput.defaultProps = {
    defaultFiles: [],
    onChange: (tempFile) => {
        console.log(tempFile);
    },
};

export default FormFileInput;
