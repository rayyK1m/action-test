import { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import { FileInput } from '@goorm-dev/gds-components';
import { ConfirmIcon, InfoCircleIcon } from '@goorm-dev/gds-icons';
import { toast } from '@goorm-dev/gds-toastify';

import useFileInput from '@/hooks/useFileInput';
import FormWrapper from '../../FormWrapper';
import styles from './FormFileInputWithImage.module.scss';
import { useUploadFile, fileApis } from '@/query-hooks/useFile';

const FormFileInputWithImage = ({
    label,
    isRequired,
    value,
    onChange,
    maxFileSize,
    errors,
    disabled,
    pathType = 'program',
    fileType = 'thumbnail',
}) => {
    const [imageUrl, setImageUrl] = useState(value ? value.url : '');
    const defaultFile = useMemo(() => {
        if (value?.filename && value?.url) {
            return { name: value.filename, src: value.url };
        }
        return undefined;
    }, [value?.filename, value?.url]);

    const {
        getFileInputProps,
        state: { fileMap, fileSize },
    } = useFileInput({
        isMultiple: false,
        defaultFiles: defaultFile ? [defaultFile] : [],
    });

    const { deleteFiles, ...fileInputProps } = getFileInputProps();

    const fileSizeMB = useMemo(
        () => Number((fileSize / 1024 / 1024).toFixed(2)) || 0,
        [fileSize],
    );

    const backgroundImage = imageUrl && `url(${imageUrl})`;

    const uploadFile = useUploadFile();
    const handleChange = async (file) => {
        if (!file) return;
        if (fileSizeMB > maxFileSize) {
            toast('용량을 초과하여 파일을 선택할 수 없습니다.', {
                type: toast.TYPE.ERROR,
            });
            deleteFiles();
            setImageUrl('');
            uploadFile.reset();
            return;
        }
        /** 현재 GDS FileInput 스펙상 useEffect 내에서 파일 입력 처리하므로 getPresignedUrl을 useQuery를 사용하여 관리할 수 없음.
         * 따라서 API를 직접 호출하여 사용하는 방법으로 url을 가져오도록 처리함.
         */
        const { url, path } = await fileApis.getPresignedUrl({
            file,
            pathType,
            fileType,
        });

        await uploadFile.mutateAsync({ url, file });

        const fullUrl = `${process.env.SWCAMP_THUMBNAIL_DOMAIN}/${path}`;

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
                        'd-flex align-items-center justify-content-center mr-lg-4 mr-0 mb-lg-0 mb-3',
                    )}
                >
                    {backgroundImage ? (
                        <div
                            className={styles.thumbnail}
                            style={{
                                backgroundImage,
                            }}
                        />
                    ) : (
                        <Image
                            width={57}
                            height={30}
                            src="https://s3.ap-northeast-2.amazonaws.com/statics.goorm.io/images/newsac/default_thumbnail_logo.svg"
                            alt="default thumbnail logo"
                        />
                    )}
                </div>
                <div className={cn(styles.fileInput, 'd-flex flex-column')}>
                    <FileInput
                        {...fileInputProps}
                        className={disabled ? styles.disabledInput : ''}
                        size="lg"
                        accept="image/*"
                        badgeMaxWidth={160}
                        captionText={errors && errors?.message}
                        isError={errors}
                    />
                    {(!uploadFile.data || uploadFile.isLoading) && (
                        <div className="d-flex align-items-center form-text text-default">
                            <InfoCircleIcon className="mr-1" />
                            {maxFileSize}MB 이하로 업로드 가능합니다.
                        </div>
                    )}
                    {uploadFile.data && !uploadFile.isLoading && (
                        <div className="mt-1 form-text text-success">
                            <ConfirmIcon className="mr-1" />
                            선택 완료 ({fileSizeMB}MB/{maxFileSize}
                            MB)
                        </div>
                    )}
                    <div className="d-flex align-items-center form-text text-default">
                        <InfoCircleIcon className="mr-1" />
                        436*244px 이미지 사용을 권장합니다.
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
