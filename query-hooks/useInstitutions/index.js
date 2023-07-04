import { useQuery } from '@tanstack/react-query';

import institutionsKeys from './keys';
import { getInstitutions } from './apis';

const GET = (filters) => {
    return useQuery({
        queryKey: institutionsKeys.detail({ ...filters }),
        queryFn: () => getInstitutions({ ...filters }),
    });
};

const usePrograms = {
    GET,
};

export { getInstitutions, institutionsKeys };
export default usePrograms;
