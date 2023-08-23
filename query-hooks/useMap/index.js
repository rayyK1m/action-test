import { useQuery } from '@tanstack/react-query';

import mapKeys from './keys';
import mapApis from './apis';
import useMount from '@/hooks/useMount';

const useKakaoMap = () => {
    const isMounted = useMount();

    return useQuery(mapKeys.kakaoMap(), () => mapApis.getKaKaoMapScript(), {
        enabled: isMounted,
        cacheTime: Infinity,
        staleTime: Infinity,
        suspense: false,
    });
};

/**
 *
 * @param {{ onComplete: import('./types').OnComplete }} param
 * @returns
 */
const useDaumSearchMap = ({ onComplete } = {}) => {
    const isMounted = useMount();

    return useQuery(
        mapKeys.daumSearchMap(),
        () => mapApis.getDaumSearchMapScript({ onComplete }),
        {
            enabled: isMounted,
            cacheTime: Infinity,
            staleTime: Infinity,
            suspense: false,
        },
    );
};

export {
    mapKeys,
    mapApis,

    /**
     * query hooks
     */
    useKakaoMap,
    useDaumSearchMap,
};
