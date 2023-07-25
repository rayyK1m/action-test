import { useQuery } from '@tanstack/react-query';

import schoolApis from './apis';
import schoolKeys from './keys';

const useGetSchools = (query) => {
    const { userId, name } = query;
    return useQuery({
        enabled: !!name,
        queryKey: schoolKeys.items({ name }),
        queryFn: () => schoolApis.getSchools({ userId, name }),
        suspense: false,
    });
};

export { useGetSchools };
