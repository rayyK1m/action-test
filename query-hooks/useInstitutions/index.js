import { useQuery } from '@tanstack/react-query';

import { INSTITUTIONS_KEYS } from './keys';
import { getInstitutions } from './apis';

const GET = (filters) => {
    return useQuery({
        queryKey: INSTITUTIONS_KEYS.detail({ ...filters }),
        queryFn: () => getInstitutions({ ...filters }),
    });
};

const usePrograms = {
    GET,
};

export { getInstitutions, INSTITUTIONS_KEYS };
export default usePrograms;
