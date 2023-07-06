import { useQuery } from '@tanstack/react-query';
import campTicketsKeys from './keys';
import { getCamptickets } from './apis';

const GET = (filters) => {
    return useQuery({
        queryKey: campTicketsKeys.detail({ ...filters }),
        queryFn: () => getCamptickets({ ...filters }),
    });
};

const uesCampTickets = {
    GET,
};

export { getCamptickets, campTicketsKeys };
export default uesCampTickets;
