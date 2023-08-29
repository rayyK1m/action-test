import { useRef } from 'react';
import { Skeleton } from '@goorm-dev/gds-components';

import styles from './Map.module.scss';
import { useKakaoMap } from '@/query-hooks/useMap';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorBox from '../ErrorBox';

const MapComponent = ({ address }) => {
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

const MapErrorFallback = () => {
    return (
        <div className={styles.wrapper}>
            <ErrorBox
                devFeedback={
                    'KAKAO_MAP_APP_KEY가 잘 설정되어 있고 사용중인 도메인이 등록되어 있는지 확인해주세요.'
                }
                useRetry={false}
            />
        </div>
    );
};

function Map() {
    return (
        <ErrorBoundary fallbackRender={MapErrorFallback}>
            <MapComponent />
        </ErrorBoundary>
    );
}

export default Map;
