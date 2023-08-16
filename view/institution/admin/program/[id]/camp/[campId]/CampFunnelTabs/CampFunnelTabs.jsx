import Link from 'next/link';
import { useRouter } from 'next/router';

import { Badge } from '@goorm-dev/gds-components';

import { CAMP_TABS } from '@/constants/navigations';
import { PROGRAM_DIVISION } from '@/constants/db';
import { useGetCamp } from '@/query-hooks/useCamps';
import CustomNav from '@/components/CustomNav';

import styles from './CampFunnelTabs.module.scss';

function CampFunnelTabs({ division }) {
    const {
        asPath,
        query: { campId, campTabId, institutionId },
    } = useRouter();
    const {
        data: { campTicketCount },
    } = useGetCamp(campId);
    const basePath = asPath.substring(0, asPath.lastIndexOf('/'));

    return (
        <CustomNav tabs className="mb-4">
            {Object.values(CAMP_TABS)
                .filter(({ id: campTabId }) => {
                    const 방문형이고_캠프_참가자_탭인가 =
                        division === PROGRAM_DIVISION.방문형 &&
                        campTabId === CAMP_TABS.캠프_참가자.id;

                    return !방문형이고_캠프_참가자_탭인가;
                })
                .map(({ id, text, path }) => (
                    <CustomNav.Item className={styles.navItem} key={id}>
                        <CustomNav.Link
                            tag={Link}
                            href={
                                institutionId
                                    ? `${basePath}${path}?institutionId=${institutionId}`
                                    : `${basePath}${path}`
                            }
                            active={campTabId === path.substring(1)}
                        >
                            {text}
                            {id === CAMP_TABS.캠프_참가자.id && (
                                <Badge
                                    className="ml-1"
                                    size="sm"
                                    color="primary"
                                >
                                    {campTicketCount}
                                </Badge>
                            )}
                        </CustomNav.Link>
                    </CustomNav.Item>
                ))}
        </CustomNav>
    );
}

export default CampFunnelTabs;
