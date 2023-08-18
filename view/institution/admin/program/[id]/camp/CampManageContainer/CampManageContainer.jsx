import { useState, useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import qs from 'query-string';

import {
    BackPageIcon,
    PlusIcon,
    RefreshIcon,
    TrashIcon,
} from '@goorm-dev/gds-icons';
import { Button } from '@goorm-dev/gds-components';
import { useHScrollTable, TYPES } from '@goorm-dev/gds-tables';

import Layout from '@/components/Layout/Layout';
import GridContainer from '@/components/GridContainer';
import PageHeader from '@/components/PageHeader';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';

import useRowSelections from '@/hooks/useRowSelections';
import useSession from '@/query-hooks/useSession';
import {
    campsKeys,
    useCopyCamp,
    useDeleteCamps,
    useGetProgramCamps,
} from '@/query-hooks/useCamps';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import CampDeleteModal from '../CampDeleteModal';
import CampManageTable from '../CampManageTable';
import { getCampsBreadcrumbs } from './CampManageContainer.utils';

import { PROGRAM_DIVISION, ROLE } from '@/constants/db';
import {
    TABLE_DATA,
    TABLE_HEADER,
    DELETE_TYPE,
} from './CampManageContainer.constants';

import styles from './CampManageContainer.module.scss';

function CampManageContainer() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { asPath, query } = router;
    const { id: programId, division, page, limit, sort } = query;
    const basePath = asPath.substring(0, asPath.lastIndexOf('?')); // 쿼리 스트링을 제외한 basePath
    const itemLimit = limit * 1;

    /** 지역 상태 */
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [deleteCamp, setDeleteCamp] = useState({
        classNumberStr: '',
        campId: '',
    });

    /** server(전역) 상태 */
    const { data: program } = useGetProgramAdmin(programId);
    const campsDeleteMutation = useDeleteCamps();
    const campCopyMutation = useCopyCamp();
    const { data: userData } = useSession.GET();

    const institutionId = userData.institutionId || router.query.institutionId;
    const { data } = useGetProgramCamps(programId, {
        institutionId,
        page: page,
        limit: limit,
        sort,
        division,
    });
    const { items = [], total } = data;

    /** 삭제 모달 토글 */
    const onToggleModal = () => setIsOpenDeleteModal((prev) => !prev);

    /**
     * HScrollTable 데이터 핸들링
     */
    const onClickMoreButton = async (e) => {
        /** 테이블 더보기 Button의 DropdownItem 클릭 이벤트 handler */
        const { id, campId, classNumberStr } = e.target.dataset;
        resetRowSelection();

        if (id === 'delete') {
            onToggleModal();
            setDeleteCamp({
                campId,
                classNumberStr,
            });
        } else if (id === 'copy') {
            campCopyMutation.mutate({ campId, institutionId });
        }
    };
    const memoizationColumns = useMemo(
        () => TABLE_HEADER(division, userData.role),
        [division, userData.role],
    );
    const memoizationData = useMemo(
        () =>
            TABLE_DATA({
                items,
                onClickMoreButton,
            }),
        [items],
    );

    const [sorting, setSorting] = useState([]);
    const {
        getTableProps,
        getPaginationProps,
        state: { sorting: selectedSorting },
    } = useHScrollTable({
        data: memoizationData,
        columns: memoizationColumns,
        usePagination: true,
        manualPagination: true,
        extraColumnType: TYPES.EXTRA_COLUMN_TYPE.CHECK_INDEX,
        pageCount: Math.ceil(total / itemLimit),
        pageIndex: page * 1 - 1,
        pageSize: itemLimit,
        sorting,
        setSorting,
    });
    const { selectedRows, selectedRowCount, resetRowSelection } =
        useRowSelections(getTableProps().table);

    /** 삭제 모달 내의 삭제하기 버튼 클릭 */
    const handleDeleteCamp = async () => {
        const queryString = qs.stringify({ division, page: 1, limit, sort });
        const deleteType =
            selectedRowCount === 0
                ? DELETE_TYPE.캠프_단일_삭제
                : DELETE_TYPE.캠프_다중_삭제;

        let deleteCampIds = [];

        if (deleteType === DELETE_TYPE.캠프_다중_삭제) {
            const deleteCamps = [];

            /** 1. 모든 페이지에서 체크 표시가된 page와 item index를 찾는다. */
            Object.keys(selectedRows).forEach((selectedPageIndex) => {
                const selectedPage = selectedPageIndex * 1 + 1;
                const pageQueryData = queryClient.getQueriesData(
                    campsKeys.itemsProgramDetail(programId, {
                        page: String(selectedPage),
                    }),
                )[0][1];

                /** 2. 체크 표시가된 Page의 캠프 리스트 */
                const { items: selectedPageItems } = pageQueryData;

                /** 3. 체크 표시가된 Item들을 deleteCamps에 push */
                Object.keys(selectedRows[selectedPageIndex]).forEach(
                    (selectedItemIndex) => {
                        deleteCamps.push(
                            selectedPageItems[selectedItemIndex * 1],
                        );
                    },
                );
            });

            /** 4. 체크된 item의 campId를 가져와, 삭제한다. */
            deleteCampIds = deleteCamps.map(({ id: campId }) => campId);
        } else {
            /**
             * 캠프 한 개 삭제
             */

            deleteCampIds = [deleteCamp.campId];
        }

        await campsDeleteMutation.mutateAsync({
            campIds: [...deleteCampIds],
            institutionId,
        });

        router.push(`${basePath}?${queryString}`);
        resetRowSelection();
        onToggleModal();
    };

    /**
     * sorting 핸들링
     */
    useEffect(() => {
        if (selectedSorting.length === 0) return;

        // eslint-disable-next-line no-unused-vars
        const { id: noUsedProgramId, ...restQuery } = query;
        const { id: sortId, desc } = selectedSorting[0];

        const queryString = qs.stringify({
            /**
             * programId는 querystring에서 제외된다.
             */
            ...restQuery,
            sort: desc ? sortId : `-${sortId}`,
        });

        router.push(`${basePath}?${queryString}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSorting]);

    return (
        <>
            <Layout>
                <Layout.Header userData={userData} />
                <Layout.Main>
                    <GridContainer>
                        <div className="d-flex flex-column">
                            <PageHeader useHrTag>
                                <PageHeader.Title>
                                    <PageHeader.Breadcrumb
                                        breadcrumbs={getCampsBreadcrumbs(
                                            program,
                                            userData.role,
                                        )}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <Button
                                                color="link"
                                                tag={Link}
                                                href={
                                                    userData.role ===
                                                    ROLE.INSTITUTION
                                                        ? '/institution/admin'
                                                        : '/foundation/admin/programs'
                                                }
                                                className="d-flex justify-content-center mr-2"
                                                icon={<BackPageIcon />}
                                            />
                                            <h3>캠프 관리</h3>
                                        </div>

                                        {
                                            /**
                                             * 캠프 생성은 "기관 Admin"에서 "집합형 프로그램"만 가능하다.
                                             */
                                            division ===
                                                PROGRAM_DIVISION.집합형 &&
                                                userData.role ===
                                                    ROLE.INSTITUTION && (
                                                    <Button
                                                        size="lg"
                                                        color="primary"
                                                        icon={<PlusIcon />}
                                                        tag={Link}
                                                        href={`/institution/admin/program/${programId}/camp/new`}
                                                    >
                                                        캠프 생성하기
                                                    </Button>
                                                )
                                        }
                                    </div>
                                </PageHeader.Title>
                                {division === PROGRAM_DIVISION.방문형 && (
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
                                    &apos;{program?.name}&apos; 캠프{' '}
                                    <span
                                        className={cn(
                                            total === 0
                                                ? 'text-hint'
                                                : 'text-primary',
                                        )}
                                    >
                                        {total}
                                    </span>
                                </h5>

                                {selectedRowCount !== 0 && (
                                    <div className={styles.deleteWrapper}>
                                        <h6 className="text-primary">
                                            {selectedRowCount}건 선택됨
                                        </h6>

                                        <div
                                            className={
                                                styles.deleteWrapperButtons
                                            }
                                        >
                                            <Button
                                                size="lg"
                                                color="link"
                                                icon={<RefreshIcon />}
                                                onClick={resetRowSelection}
                                            >
                                                초기화
                                            </Button>
                                            <Button
                                                size="lg"
                                                color="danger"
                                                icon={<TrashIcon />}
                                                onClick={onToggleModal}
                                            >
                                                삭제하기
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {total === 0 ? (
                                <EmptyTableCard text="등록된 캠프가 없습니다." />
                            ) : (
                                <CampManageTable
                                    getTableProps={getTableProps}
                                    getPaginationProps={getPaginationProps}
                                />
                            )}
                        </div>
                    </GridContainer>
                </Layout.Main>

                <Layout.Footer />
            </Layout>

            {/* 캠프 삭제 모달 */}
            <CampDeleteModal
                deleteCamp={deleteCamp}
                isOpen={isOpenDeleteModal}
                toggle={onToggleModal}
                selectedRows={selectedRows}
                selectedRowCount={selectedRowCount}
                onClickDeleteButton={handleDeleteCamp}
            />
        </>
    );
}

export default CampManageContainer;
