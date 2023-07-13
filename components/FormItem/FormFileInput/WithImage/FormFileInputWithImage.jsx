import { useMemo, useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import cn from 'classnames';

import { useFileInput, FileInput } from '@goorm-dev/gds-components';
import { InfoCircleIcon } from '@goorm-dev/gds-icons';

import { convertImageToBase64 } from '@/utils';
import FormWrapper from '../../FormWrapper';
import styles from './FormFileInputWithImage.module.scss';

// 임시 기본 썸네일 : 확정 후 변경 예정
const DEFAULT_THUMBNAIL =
    'https://statics.goorm.io/images/edu/lecture_thumb.svg';

const FormFileInputWithImage = ({
    label,
    isRequired,
    defaultFiles,
    maxFileSize,
    fileKey,
    disabled,
}) => {
    const {
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const { thumbnailKey, thumbnailFileKey } = fileKey;

    const { thumbnailFile, thumbnail } = useWatch([
        thumbnailFileKey,
        thumbnailKey,
    ]);

    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        isMultiple: false,
        defaultFiles,
    });
    const { addFile, ...fileInputProps } = getFileInputProps();

    const backgroundImage = useMemo(() => {
        if (thumbnail) {
            if (thumbnail.src) return `url(${thumbnail.src})`;
            return `url(${thumbnail})`;
        }
        return `url(${DEFAULT_THUMBNAIL})`;
    }, [thumbnail]);

    const isError = useMemo(() => {
        if (fileSize > maxFileSize * 1024 * 1024) return 'maxSize';
        if (fileSize === 0) return 'required';
        return false;
    }, [fileSize, maxFileSize]);

    useEffect(() => {
        if (thumbnailFile && !Object.keys(fileMap).length) {
            addFile([thumbnailFile]);
        }
    }, []);

    useEffect(() => {
        if (Object.values(fileMap).length) {
            const imageFile = Object.values(fileMap)[0]?.file;
            if (imageFile.src) return;
            // (async () => {
            //     setValue(thumbnailKey, await convertImageToBase64(imageFile));
            // })();
            setValue(thumbnailFileKey, imageFile);
        }
    }, [fileMap, fileSize]);

    useEffect(() => {
        if (isError) {
            setError(thumbnailFileKey, {
                type: isError,
                message:
                    isError === 'maxSize'
                        ? `파일 용량이 ${maxFileSize}를 초과하였습니다. 파일을 다시 선택해 주세요.`
                        : '파일을 업로드해주세요.',
            });
        } else {
            clearErrors(thumbnailFileKey);
        }
    }, [isError]);

    return (
        <FormWrapper label={label} isRequired={isRequired}>
            <div className="d-flex">
                <div
                    className={cn(
                        styles.thumbnailContainer,
                        'mr-lg-4 mr-0 mb-lg-0 mb-3',
                    )}
                >
                    <div
                        className={styles.thumbnail}
                        style={{
                            backgroundImage,
                        }}
                    />
                </div>
                <div className={cn(styles.fileInput, 'd-flex flex-column')}>
                    <FileInput
                        className={disabled && styles.disabledInput}
                        addFile={addFile}
                        size="lg"
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        badgeMaxWidth={160}
                        captionText={
                            isError && errors[thumbnailFileKey]?.message
                        }
                        isError={isError}
                        {...fileInputProps}
                    />
                    {errors[thumbnailFileKey]?.type !== 'maxSize' && (
                        <div className="d-flex align-items-center form-text text-default">
                            <InfoCircleIcon className="mr-1" />
                            {`최대 ${maxFileSize}MB 까지 업로드할 수 있습니다.`}
                        </div>
                    )}
                    <div className="d-flex align-items-center form-text text-default">
                        <InfoCircleIcon className="mr-1" />
                        697*365px 이미지 사용을 권장합니다.
                    </div>
                </div>
            </div>
        </FormWrapper>
    );
};

FormFileInputWithImage.defaultProps = {
    defaultFiles: [],
    disabled: false,
};

export default FormFileInputWithImage;
