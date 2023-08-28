import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@goorm-dev/gds-toastify';

import { CAMP_REVIEW_STATUS } from '@/constants/db';

import useSession from '../useSession';
import { campsKeys } from '../useCamps';
import campTicketsKeys from './keys';
import campTicketsApis from './apis';

const useGetCampTickets = (filters) => {
    return useQuery({
        queryKey: campTicketsKeys.itemsDetail({ ...filters }),
        queryFn: () => campTicketsApis.getCampTickets({ query: filters }),
    });
};

const useGetCampTicket = (query) => {
    const { isOpen, id, userId } = query;
    return useQuery({
        queryKey: campTicketsKeys.itemDetail(),
        queryFn: () => campTicketsApis.getCampTicket({ id, userId }),
        enabled: isOpen,
        suspense: false,
    });
};

const useGetCampTicketAdmin = (query) => {
    const { isOpen, id } = query;
    return useQuery({
        queryKey: campTicketsKeys.itemDetail(),
        queryFn: () => campTicketsApis.getCampTicketAdmin({ id }),
        enabled: isOpen,
        suspense: false,
    });
};

/**
 *
 * @param {{ userId: string }} param
 * @param {Omit<import('@tanstack/react-query').UseQueryOptions, 'queryKey' | 'queryFn' | 'initialData'>} options
 * @returns
 */
const useGetCampTicketsCount = ({ userId }, options) => {
    return useQuery({
        /** queryKey와 queryFn을 덮는 상황을 막기 위해 앞쪽에 스프레드 */
        ...options,
        queryKey: campTicketsKeys.count(),
        queryFn: () => campTicketsApis.getCampTicketsCount({ userId }),
    });
};

const useCreateCampTicket = () => {
    const router = useRouter();
    return useMutation(
        ({ role, userId, formData }) =>
            campTicketsApis.createCampTicket({ role, userId, formData }),
        {
            onSuccess: () => {
                router.push('/applications/new/complete');
            },
            onError: () =>
                toast('캠프 신청에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                }),
        },
    );
};

const useCancelCampTicket = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id, userId }) => campTicketsApis.cancelCampTicket({ id, userId }),
        {
            onSuccess: () => {
                toast('프로그램 신청이 취소되었습니다.');
                queryClient.invalidateQueries(campTicketsKeys.itemDetail());
                queryClient.invalidateQueries(campTicketsKeys.items());
            },
        },
    );
};

const useGetCampTicketsAdmin = (filters) => {
    return useQuery({
        queryKey: campTicketsKeys.itemsAdminDetail({ ...filters }),
        queryFn: () => campTicketsApis.getCampticketsAdmin({ ...filters }),
    });
};

const useGetCampTicketHistory = (filters) => {
    const { data: userData } = useSession.GET();

    return useQuery({
        queryKey: campTicketsKeys.historyDetail({ ...filters }),
        queryFn: () => campTicketsApis.getCampTicketHistory({ ...filters }),
        enabled: !!userData?.id,
    });
};

const useGetCampParticipants = (filters) => {
    return useQuery({
        queryKey: campTicketsKeys.participantsDetail({ ...filters }),
        queryFn: () => campTicketsApis.getCampParticipants({ ...filters }),
        enabled: !!filters.campId,
    });
};

const useMoveCampTickets = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ originCampId, newCampId, targets, meta }) =>
            campTicketsApis.moveCampTickets({
                originCampId,
                newCampId,
                targets,
                meta,
            }),
        {
            onSuccess: (data) => {
                if (!data.result) {
                    throw Error();
                }
                toast(
                    `'${data.userName}' 참가자가 ${data.newClass}분반으로 변경되었습니다.`,
                    {
                        type: toast.TYPE.SUCCESS,
                    },
                );
                queryClient.invalidateQueries(campTicketsKeys.participants());
                queryClient.invalidateQueries(campsKeys.item());
            },
            onError: () =>
                toast('분반 변경에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                }),
        },
    );
};

const useChangeCampTicketStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ status, id }) =>
            campTicketsApis.changeCampTicketStatus({ status, id }),
        {
            onSuccess: (_, variable) => {
                const { status } = variable;
                if (status === CAMP_REVIEW_STATUS.승인.value) {
                    toast('신청자 승인이 완료되었습니다.', {
                        type: toast.TYPE.SUCCESS,
                    });
                }
                if (status === CAMP_REVIEW_STATUS.거절.value) {
                    toast('신청자 승인이 거절되었습니다.');
                }
                queryClient.invalidateQueries(campTicketsKeys.itemDetail());
                queryClient.invalidateQueries(
                    campTicketsKeys.itemsAdminDetail(),
                );
            },
            onError: () =>
                toast('승인 상태 변경에 실패했습니다.', {
                    type: toast.TYPE.ERROR,
                }),
        },
    );
};

export {
    useGetCampTickets,
    useGetCampTicket,
    useGetCampTicketAdmin,
    useGetCampTicketsCount,
    useCreateCampTicket,
    useCancelCampTicket,
    useGetCampTicketsAdmin,
    useGetCampTicketHistory,
    useGetCampParticipants,
    useMoveCampTickets,
    useChangeCampTicketStatus,
    campTicketsApis,
    campTicketsKeys,
};
