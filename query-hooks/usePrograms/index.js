import { useQuery } from '@tanstack/react-query';

import programsKeys from './keys';
import programsApis from './apis';

const useGetPrograms = (filters) => {
    return useQuery({
        queryKey: programsKeys.itemsDetail({ ...filters }),
        queryFn: () => programsApis.getPrograms({ ...filters }),
    });
};

const useGetProgram = ({ id }) => {
    return useQuery({
        queryKey: programsKeys.item(),
        queryFn: () => programsApis.getProgram({ id }),
    });
};

export { useGetPrograms, useGetProgram, programsKeys, programsApis };
