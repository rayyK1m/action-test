import { useMutation } from '@tanstack/react-query';

import fileApis from './api';
import { toast } from '@goorm-dev/gds-toastify';

const useUploadFile = () => {
    return useMutation((file) => fileApis.uploadFile(file), {
        onError: () => {
            toast('파일 업로드에 실패했습니다.', {
                type: toast.TYPE.ERROR,
            });
        },
        onSuccess: (data) => data,
    });
};

export { fileApis, useUploadFile };
