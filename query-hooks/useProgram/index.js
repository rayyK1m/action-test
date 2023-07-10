import { useQuery } from '@tanstack/react-query';
import programKeys from './keys';
import { getProgramDetail } from './apis';

/**
 *
 * @param {{type: 'detail'; id: string}} param
 * @returns
 */
const GET = ({ type, id }) => {
    return useQuery(
        programKeys.detail({ id }),
        async () => {
            switch (type) {
                case 'detail':
                    return await getProgramDetail({ id });
            }
        },
        {
            enabled: !!id,
        },
    );
};

const useProgram = { GET };

export { programKeys, getProgramDetail };

export default useProgram;
