import { useQuery } from '@tanstack/react-query';

import programAdminKeys from './keys';
import { getProgramsAdmin } from './apis';

/**
 * 아래와 같이 useQuery를 CRUD 형식에 맞춰서 관리하는 방식은 deprecated 됨
 * FIXME: usePrograms 내부로 이동 필요
 */
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
