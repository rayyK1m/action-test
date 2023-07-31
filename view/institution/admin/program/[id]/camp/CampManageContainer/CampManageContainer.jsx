import { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { PlusIcon, MoreCommonIcon, SubmitModeIcon } from '@goorm-dev/gds-icons';
import { Button, SearchInput } from '@goorm-dev/gds-components';

import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import CampManageTable from '@/view/institution/admin/program/[id]/camp/CampManageTable';

import useSession from '@/query-hooks/useSession';
import { useGetProgramCamps } from '@/query-hooks/useCamps';

import { PROGRAM_DIVISION } from '@/constants/db';
import { CAMPS_DEFAULT_QUERY } from '@/pages/institution/admin/program/[id]/camp';

import StatusText from '../StatusText';

import styles from './CampManageContainer.module.scss';

const DUMMY_CAMP_TYPE = '방문형';

function CampManageContainer() {
    const {
        query: { id: programId },
    } = useRouter();
    const [search, setSearch] = useState('');

    const { data: userData } = useSession.GET();
    const { data } = useGetProgramCamps(programId, {
        institutionId: 'institution-ZERO',
        ...CAMPS_DEFAULT_QUERY,
    });
    const { items = [], total } = data;
    /**
     * tableJsxItems
     *
     * @desciprtion 서버에서 받아온, items에서 해당 페이지의 테이블 UI에 맞게 jsx가 추가된 리스트 배열
     */
    const tableJsxItems = items.map((item) => ({
        ...item,
        classroom: <p className="text-truncate">{item.classroom}</p>,
        name: <p className="text-truncate">{item.name}</p>,
        submitPreFileReport: (
            <StatusText
                type="submit"
                status={item.submitPreFileReport ? '제출' : '미제출'}
            />
        ),
        submitPostFileReport: (
            <StatusText
                type="submit"
                status={item.submitPostFileReport ? '제출' : '미제출'}
            />
        ),
        classStatus: (
            <StatusText type="classStatus" status={item.classStatus} />
        ),
        buttons: (
            <div className={styles.buttons}>
                <Button
                    color="link"
                    icon={<SubmitModeIcon />}
                    iconSide="right"
                    onClick={() => window.open(item.channelLink, '_blank')}
                >
                    채널로 이동
                </Button>
                <Button color="link" className={cn(styles.moreButton, 'p-0')}>
                    <MoreCommonIcon />
                </Button>
            </div>
        ),
    }));

    return (
        <Layout>
            <Layout.Header userData={userData} />
            <Layout.Main>
                <GridContainer>
                    <div className="d-flex flex-column">
                        <PageHeader useHrTag>
                            <PageHeader.Title className="d-flex justify-content-between">
                                <h3>캠프 관리</h3>
                                <Button
                                    size="lg"
                                    color="primary"
                                    icon={<PlusIcon />}
                                >
                                    캠프 생성하기
                                </Button>
                            </PageHeader.Title>
                            {DUMMY_CAMP_TYPE === PROGRAM_DIVISION.방문형 && (
                                <PageHeader.Description>
                                    방문형의 경우, 신청자 승인을 하면 캠프가
                                    바로 생성됩니다.
                                </PageHeader.Description>
                            )}
                        </PageHeader>

                        <div
                            className={cn(
                                styles.subHeader,
                                'd-flex justify-content-between align-items-center',
                            )}
                        >
                            <h5>
                                모든 캠프{' '}
                                <span className="text-primary">{total}</span>
                            </h5>
                            <SearchInput
                                size="lg"
                                value={search}
                                placeholder="캠프 검색"
                                className={styles.searchInput}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <CampManageTable data={tableJsxItems} total={total} />
                    </div>
                </GridContainer>
            </Layout.Main>

            {/* <Layout.Footer /> */}
        </Layout>
    );
}

export default CampManageContainer;
