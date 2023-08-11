import { useQuery } from '@tanstack/react-query';

import institutionsKeys from './keys';
import institutionsApis from './apis';
import useSession from '../useSession';

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
 */
const useGetInstitution = (id) =>
    useQuery({
        queryKey: institutionsKeys.itemDetail(id),
        queryFn: () => institutionsApis.getInstitution(id),
    });

/**
 * 운영기관 (어드민) 조회
 */
const useGetInstitutionAdmin = () => {
    const { data: userData } = useSession.GET();

    return useQuery({
        queryKey: institutionsKeys.itemAdminDetail(userData.institutionId),
        queryFn: () =>
            institutionsApis.getInstitutionAdmin(userData.institutionId),
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
};
