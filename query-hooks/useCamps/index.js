import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import campsKeys from './keys';
import campsApis from './apis';
import { toast } from '@goorm-dev/gds-toastify';

const useGetProgramCamps = (programId, filters) => {
    const { page, limit, institutionId } = filters;

    return useQuery({
        queryKey: campsKeys.itemsProgramDetail(programId, {
            page,
            limit,
            institutionId,
        }),
        queryFn: () =>
            campsApis.getCamps(programId, {
                page,
                limit,
                institutionId,
            }),
    });
};

const useCreateCamp = (returnPath) => {
    const router = useRouter();
    return useMutation((formData) => campsApis.createCamp(formData), {
        onError: () => toast('캠프 생성에 실패했습니다.'),
        onSuccess: () => router.push(returnPath),
    });
};

export {
    campsApis,
    campsKeys,

    /**
     * custom hooks
     */
    useGetProgramCamps,
    useCreateCamp,
};
