import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import programsKeys from './keys';
import programsApis from './apis';
import { useRouter } from 'next/router';
import { toast } from '@goorm-dev/gds-toastify';

import useSession from '../useSession';

const useGetPrograms = (filters) => {
    return useQuery({
        queryKey: programsKeys.itemsDetail({ ...filters }),
        queryFn: () => programsApis.getPrograms({ ...filters }),
    });
};

const useGetProgram = ({ id }) => {
    return useQuery({
        queryKey: programsKeys.item(),
        queryFn: () => programsApis.getProgram({ id }),
    });
};

const useGetProgramsAdmin = (filters) => {
    return useQuery({
        queryKey: programsKeys.itemsAdminDetail({ ...filters }),
        queryFn: () => programsApis.getProgramsAdmin({ ...filters }),
    });
};

const useGetProgramAdmin = (id) => {
    return useQuery({
        queryKey: programsKeys.itemAdminDetail(id),
        queryFn: () => programsApis.getProgramAdmin(id),
    });
};

const usePatchProgramAdmin = () => {
    const { data: userData } = useSession.GET();
    return useMutation(
        ({ id, formData }) =>
            programsApis.patchProgramAdmin({
                userId: userData.id,
                institutionId: userData.institutionId,
                programId: id,
                formData,
            }),
        {
            onSuccess: () =>
                toast('승인 요청이 완료되었습니다.', {
                    type: toast.TYPE.SUCCESS,
                }),

            onError: () =>
                toast('프로그램 수정에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                }),
        },
    );
};

const useCreateProgram = () => {
    const router = useRouter();
    return useMutation((query) => programsApis.createProgram(query), {
        onSuccess: () => {
            router.push('/institution/admin/program/new/complete');
        },
        onError: () =>
            toast('프로그램 생성에 실패했습니다.', {
                type: toast.TYPE.ERROR,
            }),
    });
};

const useChangeProgramReviewStatus = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: programsApis.changeProgramReviewStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(
                programsKeys.itemAdminDetail(router.query.id),
            );
        },
    });
};

export {
    useGetPrograms,
    useGetProgram,
    useGetProgramsAdmin,
    useGetProgramAdmin,
    useCreateProgram,
    usePatchProgramAdmin,
    useChangeProgramReviewStatus,
    programsApis,
    programsKeys,
};
