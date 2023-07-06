import { useQuery } from '@tanstack/react-query';

import programAdminKeys from './keys';
import { getProgramsAdmin } from './apis';

const GET = (filters) => {
    return useQuery({
        queryKey: programAdminKeys.detail({ ...filters }),
        queryFn: () => getProgramsAdmin({ ...filters }),
    });
};

const useProgramsAdmin = {
    GET,
};

export { getProgramsAdmin, programAdminKeys };
export default useProgramsAdmin;
