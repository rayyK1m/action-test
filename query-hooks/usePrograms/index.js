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

const useGetProgramsAdmin = (filters) => {
    return useQuery({
        queryKey: programsKeys.itemsAdminDetail({ ...filters }),
        queryFn: () => programsApis.getProgramsAdmin({ ...filters }),
    });
};

export {
    useGetPrograms,
    useGetProgram,
    useGetProgramsAdmin,
    programsApis,
    programsKeys,
};
