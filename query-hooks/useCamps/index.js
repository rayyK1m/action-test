import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from '@goorm-dev/gds-toastify';
import { campTicketsKeys } from '../uesCampTickets';

import campsKeys from './keys';
import campsApis from './apis';

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

const useGetCamp = (campId) => {
    return useQuery({
        queryKey: campsKeys.itemDetail(campId),
        queryFn: () => campsApis.getCamp(campId),
        refetchOnWindowFocus: true,
        staleTime: 5 * 60 * 1000,
    });
};

const useGetCampClasses = (programId, options) => {
    return useQuery({
        queryKey: campsKeys.classes(programId),
        queryFn: () => campsApis.getCampClasses(programId),
        ...options,
    });
};

const useAddCampParticipants = (returnPath) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        ({ campId, targets }) =>
            campsApis.addCampParticipants({ campId, targets }),
        {
            onSuccess: (data) => {
                if (!data.result) {
                    throw Error();
                }
                toast('캠프 참가자가 추가되었습니다.', {
                    type: toast.TYPE.SUCCESS,
                });
                queryClient.invalidateQueries(campTicketsKeys.participants());
                router.push(returnPath);
            },
            onError: () => {
                toast('캠프 참가자 추가에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                });
            },
        },
    );
};

const useDeleteCampParticipants = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ campId, targets, meta }) =>
            campsApis.deleteCampParticipants({ campId, targets, meta }),
        {
            onSuccess: (data) => {
                if (!data.result) {
                    throw Error();
                }
                toast(`${data.userName} 참가자가 퇴장되었습니다.`, {
                    type: toast.TYPE.DEFAULT,
                });
                queryClient.invalidateQueries(campTicketsKeys.participants());
            },
            onError: () =>
                toast('참가자 퇴장에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                }),
        },
    );
};

const useCreateCamp = (returnPath) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation((formData) => campsApis.createCamp(formData), {
        onError: () => toast('캠프 생성에 실패했습니다.'),
        onSuccess: (data) => {
            router.push(returnPath);
            toast(`'${data.class}분반' 캠프 생성이 완료되었습니다.`, {
                type: toast.TYPE.SUCCESS,
            });
            queryClient.invalidateQueries(campsKeys.classes());
        },
    });
};

const usePatchCamp = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ campId, formData }) => campsApis.patchCamp({ campId, formData }),
        {
            onSuccess: (_, { campId }) => {
                toast('저장되었습니다.', {
                    type: toast.TYPE.SUCCESS,
                });
                queryClient.invalidateQueries(campsKeys.itemDetail(campId));
            },
            onError: () => {
                toast('저장에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                });
            },
        },
    );
};

/** 캠프 보고서 제출 */
const useSubmitCampReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: campsApis.submitCampReport,
        onSuccess: ({ campId }) => {
            queryClient.invalidateQueries(campsKeys.itemDetail(campId));

            toast('등록이 완료되었습니다.', {
                type: toast.TYPE.SUCCESS,
            });
        },
        onError: () => {
            toast('등록이 실패되었습니다.', {
                type: toast.TYPE.ERROR,
            });
        },
    });
};

export {
    campsApis,
    campsKeys,

    /**
     * custom hooks
     */
    useGetProgramCamps,
    useGetCamp,
    useGetCampClasses,
    useAddCampParticipants,
    useDeleteCampParticipants,
    useCreateCamp,
    usePatchCamp,
    useSubmitCampReport,
};
