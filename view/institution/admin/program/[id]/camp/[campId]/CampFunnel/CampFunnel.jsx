import { useRouter } from 'next/router';

import CampFunnelTabs from '../CampFunnelTabs';
import CampTab from '../[campTabId]/CampTab';

import { CAMP_TABS } from '@/constants/navigations';

import styles from './CampFunnel.module.scss';

function CampFunnel({ division }) {
    const router = useRouter();
    const {
        asPath,
        query: { campTabId, institutionId },
    } = router;

    const activeTabPath = `/${campTabId}`;
    const basePath = asPath.substring(0, asPath.lastIndexOf('/'));

    /**
     * handleChangeTabs
     *
     * @description 캠프 상세 페이지의 원하는 sub path로 이동합니다.
     * @param {string} subPath
     *  - '/info'
     *  - '/participants'
     *  - '/report-prefile'
     *  - '/report-postfile'
     *  - '/report-post'
     */
    const handleChangeTabs = (subPath) => {
        if (institutionId) {
            router.push(`${basePath}${subPath}?institutionId=${institutionId}`);
        } else {
            router.push(`${basePath}${subPath}`);
        }
    };

    return (
        <div className="d-flex flex-column">
            <CampFunnelTabs division={division} />

            {activeTabPath === CAMP_TABS.기본_정보.path && (
                <CampTab.Info onChangeTabs={handleChangeTabs} />
            )}
            {activeTabPath === CAMP_TABS.캠프_참가자.path && (
                <CampTab.Participants onChangeTabs={handleChangeTabs} />
            )}
            {activeTabPath === CAMP_TABS.사전_제출.path && (
                <CampTab.PreFileReport onChangeTabs={handleChangeTabs} />
            )}
            {activeTabPath === CAMP_TABS.종료_제출.path && (
                <CampTab.PostFileReport onChangeTabs={handleChangeTabs} />
            )}
            {activeTabPath === CAMP_TABS.결과_보고.path && (
                <CampTab.PostReport onChangeTabs={handleChangeTabs} />
            )}
        </div>
    );
}

export default CampFunnel;
