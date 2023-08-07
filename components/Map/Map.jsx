import { useRef } from 'react';
import { Skeleton } from '@goorm-dev/gds-components';

import styles from './Map.module.scss';
import { useKakaoMap } from '@/query-hooks/useMap';

const Map = ({ address }) => {
    const { data: maps, isLoading } = useKakaoMap();

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
