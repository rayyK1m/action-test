import { useQuery } from '@tanstack/react-query';

import institutionsKeys from './keys';
import institutionsApis from './apis';

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

export {
    institutionsKeys,
    institutionsApis,

    /**
     * query hooks
     */
    useGetInstitutions,
    useGetInstitution,
};
