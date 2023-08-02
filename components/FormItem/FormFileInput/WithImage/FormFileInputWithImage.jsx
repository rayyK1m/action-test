import { useMemo, useEffect, useState } from 'react';
import cn from 'classnames';

import { FileInput } from '@goorm-dev/gds-components';
import { InfoCircleIcon } from '@goorm-dev/gds-icons';

import useFileInput from '@/hooks/useFileInput';
import FormWrapper from '../../FormWrapper';
import styles from './FormFileInputWithImage.module.scss';
import { useUploadFile, fileApis } from '@/query-hooks/useFile';
// 임시 기본 썸네일 : 확정 후 변경 예정
const DEFAULT_THUMBNAIL =
    'https://statics.goorm.io/images/edu/lecture_thumb.svg';

const FormFileInputWithImage = ({
    label,
    isRequired,
    value,
    onChange,
    maxFileSize,
    errors,
    disabled,
    pathType = 'program',
}) => {
    const [imageUrl, setImageUrl] = useState(value ? value.url : '');

    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        isMultiple: false,
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

    const backgroundImage = useMemo(() => {
        if (imageUrl) {
            return `url(${imageUrl})`;
        }
        return `url(${DEFAULT_THUMBNAIL})`;
    }, [imageUrl]);

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

        await uploadFile.mutateAsync({ url, file });

        const fullUrl = `https://grm-newsac-photo.s3.ap-northeast-2.amazonaws.com/${path}`;

        onChange({
            filename: file?.name,
            url: fullUrl,
        });
        setImageUrl(fullUrl);
    };

    useEffect(() => {
        if (disabled || !!Object.values(fileMap)[0]?.src) return;

        const imageFile = Object.values(fileMap)[0]?.file;
        handleChange(imageFile);
    }, [fileMap, fileSize]);

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
                        {...fileInputProps}
                        className={disabled && styles.disabledInput}
                        size="lg"
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        badgeMaxWidth={160}
                        captionText={errors && errors?.message}
                        isError={errors}
                    />
                    {errors?.type !== 'maxSize' && (
                        <div className="d-flex align-items-center form-text text-default">
                            <InfoCircleIcon className="mr-1" />
                            {`최대 ${maxFileSize}MB 까지 업로드할 수 있습니다.`}
                        </div>
                    )}
                    <div className="d-flex align-items-center form-text text-default">
                        <InfoCircleIcon className="mr-1" />
                        320*136px 이미지 사용을 권장합니다.
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
