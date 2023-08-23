import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import institutionsKeys from './keys';
import institutionsApis from './apis';
import useSession from '../useSession';
import { toast } from '@goorm-dev/gds-toastify';

/**
 * 운영기관 리스트 조회
 */
const useGetInstitutions = (filters) =>
    useQuery({
        queryKey: institutionsKeys.itemsDetail({ ...filters }),
        queryFn: () => institutionsApis.getInstitutions({ ...filters }),
    });

/**
 * 운영기관  조회
 * @param {string} id 기관 id
 * @param {Omit<import('@tanstack/react-query').UseQueryOptions, 'queryKey' | 'queryFn'>} options
 * @returns
 */
const useGetInstitution = (id, options = {}) =>
    useQuery({
        ...options,
        queryKey: institutionsKeys.itemDetail(id),
        queryFn: () => institutionsApis.getInstitution(id),
    });

/**
 * 운영기관 (어드민) 조회
 * @param {string} id 기관 id
 * @param {Omit<import('@tanstack/react-query').UseQueryOptions, 'queryKey' | 'queryFn'>} options
 * @returns {import('@tanstack/react-query').UseQueryResult<import('./types').InstitutionAdmin, unknown>}
 */
const useGetInstitutionAdmin = (id, options = {}) => {
    return useQuery({
        ...options,
        queryKey: institutionsKeys.itemAdminDetail(id),
        queryFn: () => institutionsApis.getInstitutionAdmin(id),
    });
};

/**
 * 운영기관 리스트 조회(재단)
 */
const useGetInstitutionsFoundation = (filters) => {
    const { data: userData } = useSession.GET();

    return useQuery({
        queryKey: institutionsKeys.itemsFoundationDetail({ ...filters }),
        queryFn: () =>
            institutionsApis.getInstitutionsFoundation({ ...filters }),
        enabled: userData?.role === 'foundation',
    });
};

/**
 * 기관 필수 자료 제출
 */
const useSubmitReports = () => {
    const queryClient = useQueryClient();
    const { data: userData } = useSession.GET();

    return useMutation({
        mutationFn: institutionsApis.submitReports,
        onSuccess: async () => {
            await queryClient.invalidateQueries(
                institutionsKeys.itemAdminDetail(userData.institutionId),
            );
            toast('제출이 완료되었습니다.', {
                type: toast.TYPE.SUCCESS,
            });
        },
    });
};

/**
 * 기관 필수 자료 수정
 */
const usePatchReports = () => {
    const queryClient = useQueryClient();
    const { data: userData } = useSession.GET();

    return useMutation({
        mutationFn: institutionsApis.patchReports,
        onSuccess: async () => {
            await queryClient.invalidateQueries(
                institutionsKeys.itemAdminDetail(userData.institutionId),
            );
            toast('제출이 완료되었습니다.', {
                type: toast.TYPE.SUCCESS,
            });
        },
    });
};

/**
 * 기관 추가 자료 제출
 */
const useSubmitExtraReports = () => {
    const queryClient = useQueryClient();
    const { data: userData } = useSession.GET();

    return useMutation({
        mutationFn: institutionsApis.submitExtraReports,
        onSuccess: async () => {
            await queryClient.invalidateQueries(
                institutionsKeys.itemAdminDetail(userData.institutionId),
            );
            toast('제출이 완료되었습니다.', {
                type: toast.TYPE.SUCCESS,
            });
        },
    });
};

/**
 * 기관이 제출한 필수 자료에 대한 승인 상태 변경(재단)
 */
const useSubmitReportReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: institutionsApis.submitReportReview,
        onSuccess: async () => {
            /**
             * TODO: invalidate 해야될거 정확히 정리
             */
            await queryClient.invalidateQueries(institutionsKeys.itemAdmin());
            await queryClient.invalidateQueries(
                institutionsKeys.itemsFoundation(),
            );
        },
    });
};

export {
    institutionsKeys,
    institutionsApis,

    /**
     * query hooks
     */
    useGetInstitutions,
    useGetInstitution,
    useGetInstitutionAdmin,
    useGetInstitutionsFoundation,
    useSubmitReports,
    usePatchReports,
    useSubmitExtraReports,
    useSubmitReportReview,
};
