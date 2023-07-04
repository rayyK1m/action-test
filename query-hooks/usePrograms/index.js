import { useQuery } from '@tanstack/react-query';

import programsKeys from './keys';
import { getPrograms } from './apis';

const GET = (filters) => {
    return useQuery({
        queryKey: programsKeys.detail({ ...filters }),
        queryFn: () => getPrograms({ ...filters }),
    });
};

const usePrograms = {
    GET,
};

export { getPrograms, programsKeys };
export default usePrograms;
