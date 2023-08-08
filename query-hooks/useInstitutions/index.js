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
    useGetInstitutionsFoundation,
};
