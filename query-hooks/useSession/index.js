import { useQuery, useQueryClient } from '@tanstack/react-query';
import sessionKeys from './keys';

/**
 * @typedef {'student' | 'teacher' | 'institution' | 'foundation'} Role
 */
/**
 * @typedef UserData
 * @property {string} id
 * @property {string} name
 * @property {Role} role
 */

/**
 *
 * @returns {{ data?: UserData }}
 */
const GET = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(sessionKeys.all());

    return useQuery(sessionKeys.all(), () => data, {
        cacheTime: Infinity,
        enabled: !!data,
    });
};

const useSession = {
    GET,
};

export { sessionKeys };

export default useSession;
