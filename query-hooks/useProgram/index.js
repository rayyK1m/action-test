import { useQuery } from '@tanstack/react-query';
import programKeys from './keys';
import { getProgramDetail } from './apis';

/**
 * 아래와 같이 useQuery를 CRUD 형식에 맞춰서 관리하는 방식은 deprecated 됨
 * FIXME: usePrograms 내부로 이동 필요
 */

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
