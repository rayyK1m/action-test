import { useQuery } from '@tanstack/react-query';

import institutionsKeys from './keys';
import { getInstitutions, getInstitution } from './apis';

/**
 *
 * @param {{queryKeyType: keyof typeof institutionsKeys} & import('@tanstack/react-query').QueryOptions} queryKeyType keys에 정의한 Key값들 (ex. `item`, `itemDetail`, `items`, ... )
 * @param {*} queryParams
 * @param {*} queryOptions
 *
 * @example
 * useInstitutions.GET({ queryKeyType: 'itemDetail', queryParams: institutionId, enabled: false })
 * useInstitutions.GET({ queryKeyType: 'itemsDetail', queryParams: institutionId })
 */
const GET = ({ queryKeyType, queryParams, queryOptions }) => {
    const queryFuntions = {
        /**
         * 운영기관 리스트 조회
         */
        itemsDetail: () => getInstitutions(queryParams),

        /**
         * 운영기관 조회
         */
        itemDetail: () => getInstitution(queryParams),
    };

    return useQuery({
        queryKey: institutionsKeys[queryKeyType](queryParams),
        queryFn: queryFuntions[queryKeyType],

        // NOTE: enabled와 같은 useQuery 나머지 옵션 컴포넌트 단에서 사용할 수 있도록 해준다.
        ...queryOptions,
    });
};

const useInstitutions = {
    GET,
};

export { getInstitutions, institutionsKeys };
export default useInstitutions;
