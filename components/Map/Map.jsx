import { useRef } from 'react';
import { Skeleton } from '@goorm-dev/gds-components';

import styles from './Map.module.scss';
import { useQuery } from '@tanstack/react-query';
import useMount from '@/hooks/useMount';

const Map = ({ address }) => {
    const isMounted = useMount();
    const { data: maps, isLoading } = useQuery(
        ['kakao.maps'],
        async () => {
            return await new Promise((res, rej) => {
                const $mapScript = document.createElement('script');
                $mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_APP_KEY}&autoload=false&libraries=services,drawing`;
                $mapScript.onload = () => {
                    window.kakao.maps.load(() => res(window.kakao.maps));
                };
                $mapScript.onerror = rej;
                document.head.append($mapScript);
            });
        },
        { enabled: isMounted, cacheTime: Infinity },
    );

    const mapRef = useRef(null);

    if (isLoading || !address) {
        return <Skeleton height={256} />;
    }

    /** 주소 검색 */
    const geoCoder = new maps.services.Geocoder();

    geoCoder.addressSearch(address, ([{ x, y }]) => {
        /** map 생성 */
        const map = new maps.Map(mapRef.current, {
            center: new maps.LatLng(y, x),
            level: 3,
        });

        /** marker 생성 */
        const marker = new maps.Marker({
            map: map,
            position: new maps.LatLng(y, x),
        });

        marker.setMap(map);
    });

    return <div ref={mapRef} className={styles.map} />;
};

export default Map;
