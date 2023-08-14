import Link from 'next/link';
import { useRouter } from 'next/router';

import CustomNav from '@/components/CustomNav';

import { CAMP_TABS } from '@/constants/navigations';

import styles from './CampFunnelTabs.module.scss';
import { PROGRAM_DIVISION } from '@/constants/db';

function CampFunnelTabs({ division }) {
    const {
        asPath,
        query: { campTabId },
    } = useRouter();

    const basePath = asPath.substring(0, asPath.lastIndexOf('/'));

    return (
        <CustomNav tabs className="mb-4">
            {Object.values(CAMP_TABS)
                .filter((campTab) => {
                    const 방문형이고_캠프_참가자_탭인가 =
                        division === PROGRAM_DIVISION.방문형 &&
                        campTab.id === CAMP_TABS.캠프_참가자.id;

                    return !방문형이고_캠프_참가자_탭인가;
                })
                .map(({ id, text, path }) => (
                    <CustomNav.Item className={styles.navItem} key={id}>
                        <CustomNav.Link
                            tag={Link}
                            href={`${basePath}${path}`}
                            active={campTabId === path.substring(1)}
                        >
                            {text}
                        </CustomNav.Link>
                    </CustomNav.Item>
                ))}
        </CustomNav>
    );
}

export default CampFunnelTabs;
