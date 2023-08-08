import { useQuery } from '@tanstack/react-query';

import schoolApis from './apis';
import schoolKeys from './keys';

const useGetSchools = (query) => {
    const { name } = query;
    return useQuery({
        enabled: !!name,
        queryKey: schoolKeys.items({ name }),
        queryFn: () => schoolApis.getSchools({ name }),
        suspense: false,
    });
};

export { useGetSchools };
