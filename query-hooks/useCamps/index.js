import { useQuery } from '@tanstack/react-query';

import campsKeys from './keys';
import campsApis from './apis';

const useGetProgramCamps = (programId, filters) => {
    const { page, limit, institutionId } = filters;

    return useQuery({
        queryKey: campsKeys.itemsProgramDetail(programId, {
            page,
            limit,
            institutionId,
        }),
        queryFn: () =>
            campsApis.getCamps(programId, {
                page,
                limit,
                institutionId,
            }),
    });
};

export {
    campsApis,
    campsKeys,

    /**
     * custom hooks
     */
    useGetProgramCamps,
};
