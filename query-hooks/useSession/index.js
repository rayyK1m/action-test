import { useQueryClient } from '@tanstack/react-query';
import sessionKeys from './keys';

/**
 *
 * @returns {{ data?: { id: string, name: string } }}
 */
const GET = () => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(sessionKeys.base());

    return { data };
};

export default { GET };
