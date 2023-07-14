import { useQuery } from '@tanstack/react-query';

import programsKeys from './keys';
import programsApis from './apis';

// const GET = (filters) => {
//     return useQuery({
//         queryKey: programsKeys.detail({ ...filters }),
//         queryFn: () => getPrograms({ ...filters }),
//     });
// };

const useGetProgram = (filters) => {
    return useQuery({
        queryKey: programsKeys.item(),
        queryFn: () => programsApis.getProgram({ ...filters }),
    });
};

export { useGetProgram, programsKeys, programsApis };
