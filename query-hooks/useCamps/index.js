import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { toast } from '@goorm-dev/gds-toastify';

import useSession from '../useSession';
import { campTicketsKeys } from '../uesCampTickets';
import campsKeys from './keys';
import campsApis from './apis';

/** 프로그램에 속한 캠프 리스트 조회 */
const useGetProgramCamps = (programId, query) => {
    return useQuery({
        queryKey: campsKeys.itemsProgramDetail(programId, { ...query }),
        queryFn: () => campsApis.getCamps(programId, { ...query }),
    });
};

/** 캠프 단일 복사 */
const useCopyCamp = () => {
    const queryClient = useQueryClient();
    const {
        query: { id: programId },
    } = useRouter();

    return useMutation({
        mutationFn: campsApis.copyCamp,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: campsKeys.itemsProgram(programId),
            });
            toast('캠프 복사가 완료됐습니다.', {
                type: toast.TYPE.SUCCESS,
            });
        },
        onError: ({ response }) => {
            const message = response?.data?.meta?.res?.data?.message;
            toast(
                <span>
                    <strong>캠프 복사에 실패했습니다.</strong> <br />
                    {message}
                </span>,
                {
                    type: toast.TYPE.ERROR,
                },
            );
        },
    });
};

/** 캠프 리스트 삭제 */
const useDeleteCamps = () => {
    const queryClient = useQueryClient();
    const {
        query: { id: programId },
    } = useRouter();

    return useMutation({
        mutationFn: campsApis.deleteCamps,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: campsKeys.itemsProgram(programId),
            });
            toast('캠프 삭제가 완료됐습니다.', {
                type: toast.TYPE.SUCCESS,
            });
        },
        onError: ({ response }) => {
            const message = response?.data?.meta?.res?.data?.message;
            toast(
                <span>
                    <strong>캠프 삭제에 실패했습니다.</strong> <br />
                    {message}
                </span>,
                {
                    type: toast.TYPE.ERROR,
                },
            );
        },
    });
};

const useGetCamp = (campId) => {
    const { query } = useRouter();
    const { data: userData } = useSession.GET();

    const institutionId = query.institutionId || userData.institutionId;

    return useQuery({
        queryKey: campsKeys.itemDetail(campId),
        queryFn: () => campsApis.getCamp({ campId, institutionId }),
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
                    icon: false,
                });
                queryClient.invalidateQueries(campTicketsKeys.participants());
                queryClient.invalidateQueries(campsKeys.item());
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
    useCopyCamp,
    useDeleteCamps,
    useGetCamp,
    useGetCampClasses,
    useAddCampParticipants,
    useDeleteCampParticipants,
    useCreateCamp,
    usePatchCamp,
    useSubmitCampReport,
};
