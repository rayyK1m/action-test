import { useEffect, useMemo } from 'react';
import FormWrapper from '../FormWrapper';
import { FileInput } from '@goorm-dev/gds-components';
import { ConfirmIcon, InfoCircleIcon } from '@goorm-dev/gds-icons';
import { toast } from '@goorm-dev/gds-toastify';
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
    defaultValue,
}) => {
    const defaultFile = useMemo(() => {
        if (value?.filename && value?.url) {
            return { name: value.filename, src: value.url };
        }
        if (defaultValue?.filename && defaultValue?.url) {
            return { name: defaultValue.filename, src: defaultValue.url };
        }
        return undefined;
    }, [
        value?.filename,
        value?.url,
        defaultValue?.filename,
        defaultValue?.url,
    ]);

    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        defaultFiles: defaultFile ? [defaultFile] : [],
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
            toast('용량을 초과하여 파일을 선택할 수 없습니다.', {
                type: toast.TYPE.ERROR,
            });
            deleteFiles();
            uploadFile.reset();
            return;
        }
        /** 현재 GDS FileInput 스펙상 useEffect 내에서 파일 입력 처리하므로 getPresignedUrl을 useQuery를 사용하여 관리할 수 없음.
         * 따라서 API를 직접 호출하여 사용하는 방법으로 url을 가져오도록 처리함.
         */
        const { url, path } = await fileApis.getPresignedUrl({
            file,
            pathType,
        });

        await uploadFile.mutateAsync({ url, file });
        onChange({
            filename: file.name,
            url: path,
        });
    };

    /** 기본값 설정 */
    useEffect(() => {
        if (value || defaultValue) {
            onChange(value || defaultValue);
        }
    }, [
        value?.filename,
        value?.url,
        defaultValue?.filename,
        defaultValue?.url,
    ]);

    useEffect(() => {
        const fileData = Object.values(fileMap)[0];
        if (!fileData) return;
        if (disabled || !!fileData.src) return;

        if (
            fileData.name === defaultValue?.filename &&
            fileData.src === defaultValue?.url
        )
            return;

        handleChange(fileData.file);
    }, [fileMap, fileSize]);

    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <FileInput
                {...fileInputProps}
                captionText={errors && errors?.message}
                isError={errors}
                className={disabled && styles.disabledInput}
            />
            {(!uploadFile.data || uploadFile.isLoading) && (
                <div className="d-flex align-items-center form-text text-default">
                    <InfoCircleIcon className="mr-1" />
                    최대 {maxFileSize}MB 까지 업로드 가능합니다.
                </div>
            )}
            {uploadFile.data && !uploadFile.isLoading && (
                <div className="mt-1 form-text text-success">
                    <ConfirmIcon className="mr-1" />
                    선택 완료 ({fileSizeMB}MB/{maxFileSize}
                    MB)
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
