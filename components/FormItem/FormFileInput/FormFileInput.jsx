import { useEffect, useMemo } from 'react';
import FormWrapper from '../FormWrapper';
import { FileInput } from '@goorm-dev/gds-components';
import { InfoCircleIcon } from '@goorm-dev/gds-icons';
import FormFileInputWithImage from './WithImage/FormFileInputWithImage';
import useFileInput from '@/hooks/useFileInput';

import styles from './FormFileInput.module.scss';

const FormFileInput = ({
    label,
    isRequired,
    maxFileSize,
    value,
    disabled,
    onChange,
    errors,
}) => {
    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        defaultFiles: !!value ? [value] : [],
    });
    const fileSizeMB = useMemo(
        () => Number((fileSize / 1024 / 1024).toFixed(2)) || 0,
        [fileSize],
    );

    useEffect(() => {
        const tempFile = Object.values(fileMap)[0]?.file;
        onChange(tempFile);
    }, [fileMap, fileSize]);

    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <FileInput
                {...getFileInputProps()}
                captionText={errors && errors?.message}
                isError={errors}
                className={disabled && styles.disabledInput}
            />
            {errors?.type !== 'maxSize' && (
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
