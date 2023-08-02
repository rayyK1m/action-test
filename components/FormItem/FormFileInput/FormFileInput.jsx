import { useEffect, useMemo } from 'react';
import FormWrapper from '../FormWrapper';
import { FileInput } from '@goorm-dev/gds-components';
import { InfoCircleIcon } from '@goorm-dev/gds-icons';
import FormFileInputWithImage from './WithImage/FormFileInputWithImage';
import useFileInput from '@/hooks/useFileInput';

import styles from './FormFileInput.module.scss';
import { useUploadFile, fileApis } from '@/query-hooks/useFile';

const FormFileInput = ({
    label,
    isRequired,
    maxFileSize,
    value,
    disabled,
    onChange,
    errors,
    pathType = 'program',
}) => {
    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        defaultFiles: value
            ? [
                  {
                      name: value.filename,
                      src: value.url,
                  },
              ]
            : [],
    });

    const { deleteFiles, ...fileInputProps } = getFileInputProps();

    const fileSizeMB = useMemo(
        () => Number((fileSize / 1024 / 1024).toFixed(2)) || 0,
        [fileSize],
    );

    const uploadFile = useUploadFile();
    const handleChange = async (file) => {
        if (!file) return;

        if (fileSizeMB > maxFileSize) {
            onChange({ size: fileSizeMB });
            deleteFiles();
            return;
        }
        /** 현재 GDS FileInput 스펙상 useEffect 내에서 파일 입력 처리하므로 getPresignedUrl을 useQuery를 사용하여 관리할 수 없음.
         * 따라서 API를 직접 호출하여 사용하는 방법으로 url을 가져오도록 처리함.
         */
        const { url, path } = await fileApis.getPresignedUrl({
            file,
            pathType,
        });

        uploadFile.mutate({ url, file });

        onChange({
            filename: file.name,
            url: path,
        });
    };

    useEffect(() => {
        if (disabled || !!Object.values(fileMap)[0]?.src) return;

        const tempFile = Object.values(fileMap)[0]?.file;
        handleChange(tempFile);
    }, [fileMap, fileSize]);

    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <FileInput
                {...fileInputProps}
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
