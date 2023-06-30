import { Checkbox } from '@goorm-dev/gds-components';
import CampCardLoading from '../CampCard/CampCard.loading';

import styles from './CampCards.module.scss';

function CampCardsLoading() {
    return (
        <>
            <div className="mb-4">
                <ul className="d-flex justify-content-between align-items-center">
                    <li className="d-flex">
                        <h6 className="text-dark">전체 프로그램</h6>
                        <h6 className="text-primary ml-1">-</h6>
                    </li>
                    <li className="d-flex">
                        <Checkbox disabled />
                        <p>신청 가능한 프로그램 보기</p>
                    </li>
                </ul>
            </div>
            <div className={styles.campCardContainer}>
                <CampCardLoading />
                <CampCardLoading />
                <CampCardLoading />
                <CampCardLoading />
                <CampCardLoading />
                <CampCardLoading />
                <CampCardLoading />
                <CampCardLoading />
            </div>
        </>
    );
}

export default CampCardsLoading;
