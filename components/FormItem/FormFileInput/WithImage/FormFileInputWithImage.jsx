import { useMemo, useEffect, useState } from 'react';
import cn from 'classnames';

import { FileInput } from '@goorm-dev/gds-components';
import { InfoCircleIcon } from '@goorm-dev/gds-icons';

import useFileInput from '@/hooks/useFileInput';
import { convertImageToBase64 } from '@/utils';
import FormWrapper from '../../FormWrapper';
import styles from './FormFileInputWithImage.module.scss';

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
}) => {
    const [image, setImage] = useState(value ? value : null);

    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        isMultiple: false,
        defaultFiles: value ? [value] : [],
    });

    const backgroundImage = useMemo(() => {
        if (image) {
            if (image.src) return `url(${image.src})`;
            return `url(${image})`;
        }

        return `url(${DEFAULT_THUMBNAIL})`;
    }, [image]);

    useEffect(() => {
        const imageFile = Object.values(fileMap)[0]?.file;
        onChange(imageFile);

        if (!imageFile) {
            setImage(null);
            return;
        }
        if (imageFile?.src) {
            setImage(imageFile.src);
            return;
        }

        (async () => {
            const convertedImage = await convertImageToBase64(imageFile);
            setImage(convertedImage);
        })();
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
                        className={disabled && styles.disabledInput}
                        size="lg"
                        accept="image/png, image/jpeg, image/gif, image/webp"
                        badgeMaxWidth={160}
                        captionText={errors && errors?.message}
                        isError={errors}
                        {...getFileInputProps()}
                    />
                    {errors?.type !== 'maxSize' && (
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
