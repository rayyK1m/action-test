import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@goorm-dev/gds-toastify';

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

export {
    useGetCampTickets,
    useGetCampTicket,
    useGetCampTicketsCount,
    useCreateCampTicket,
    useCancelCampTicket,
    useGetCampTicketsAdmin,
    campTicketsApis,
    campTicketsKeys,
};
