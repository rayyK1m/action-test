import { useQuery } from '@tanstack/react-query';

import { PROGRAMS_KEYS } from './keys';
import { getPrograms } from './apis';

const GET = (filters) => {
    return useQuery({
        queryKey: PROGRAMS_KEYS.detail({ ...filters }),
        queryFn: () => getPrograms({ ...filters }),
    });
};

const usePrograms = {
    GET,
};

export { getPrograms, PROGRAMS_KEYS };
export default usePrograms;
