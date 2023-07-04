import { useQueryClient } from '@tanstack/react-query';
import sessionKeys from './keys';

/**
 *
 * @returns {{ data?: { id: string, name: string } }}
 */
const GET = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(sessionKeys.all());

    return { data };
};

const useSession = {
    GET,
};

export { sessionKeys };

export default useSession;
