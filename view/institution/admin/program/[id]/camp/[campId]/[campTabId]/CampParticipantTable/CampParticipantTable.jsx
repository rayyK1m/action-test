import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import { PlusIcon } from '@goorm-dev/gds-icons';
import { Button, SearchInput } from '@goorm-dev/gds-components';

import { ENTER_KEY } from '@/constants/common';
import { campsApis, campsKeys, useGetCamp } from '@/query-hooks/useCamps';
import { useGetCampParticipants } from '@/query-hooks/uesCampTickets';
import EmptyTableCard, {
    EMPTY_IMAGE_TYPE,
} from '@/components/EmptyTableCard/EmptyTableCard';

import { getTableColums } from './CampParticipantTable.utils';

import styles from './CampParticipantTable.module.scss';
import SSRSuspense from '@/components/SSRSuspense';
import CampParticipantTableLoading from './CampParticipantTable.loading';
import { checkIsFoundationPage, routerPushShallow } from '@/utils';

const Table = ({ programId, campId, onSetTotalCount, isFoundationPage }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { search } = router.query;

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const { data: camp } = useGetCamp(campId);
    const {
        data: { campParticipants, totalCount },
    } = useGetCampParticipants({
        campId,
        page: pageIndex + 1,
        limit: pageSize,
        search,
        ...(sorting.length !== 0 && {
            sort: (sorting[0].desc ? '-' : '') + sorting[0].id,
        }),
    });
    queryClient.prefetchQuery({
        queryKey: campsKeys.classes(programId),
        queryFn: () => campsApis.getCampClasses(programId),
        staleTime: 5 * 60 * 1000,
        suspense: false,
    });

    const { getTableProps, getPaginationProps } = useHScrollTable({
        columns: getTableColums(camp, isFoundationPage),
        data: campParticipants || [],

        extraColumnType: 'index',

        usePagination: true,
        manualPagination: true,
        pageCount: Math.ceil(totalCount / pageSize),
        setPagination,
        setSorting,
        pageIndex,
        pageSize,
        sorting,
    });

    useEffect(() => {
        onSetTotalCount(totalCount);
    }, [totalCount, onSetTotalCount]);

    const isEmptyData = useMemo(() => totalCount === 0, [totalCount]);
    const isFiltered = useMemo(() => !!search, [search]);
    return (
        <>
            {isEmptyData ? (
                <EmptyTableCard
                    text={
                        isFiltered
                            ? '검색 결과가 없습니다.'
                            : '캠프 참가자가 없습니다.'
                    }
                    imageSrc={
                        isFiltered
                            ? EMPTY_IMAGE_TYPE.SEARCH
                            : EMPTY_IMAGE_TYPE.LIST
                    }
                />
            ) : (
                <>
                    <HScrollTable {...getTableProps()} />
                    <HScrollTablePagination
                        paginationProps={{
                            ...getPaginationProps(),
                        }}
                    />
                </>
            )}
        </>
    );
};

function CampParticipantTable() {
    const router = useRouter();
    const isFoundationPage = useMemo(
        () => checkIsFoundationPage(router.pathname),
        [router.pathname],
    );
    const { id: programId, campId } = router.query;

    const [totalCount, setTotalCount] = useState(0);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = useCallback((e) => {
        const {
            target: { value },
        } = e;
        setSearchText(value);
    }, []);

    const handleSearchKeyDown = useCallback((key, value) => {
        if (key === ENTER_KEY) {
            routerPushShallow(router, { search: value });
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="d-flex">
                    캠프 참가자{' '}
                    <p className="text-blue-500 ml-1">{totalCount}</p>
                </h5>
                {!isFoundationPage && (
                    <Button
                        color="primary"
                        size="lg"
                        icon={<PlusIcon />}
                        tag={Link}
                        href={`${router.asPath}/new`}
                    >
                        참가자 추가하기
                    </Button>
                )}
            </div>

            <SearchInput
                size="lg"
                placeholder="참가자 검색"
                onChange={handleSearchChange}
                onKeyDown={(e) => handleSearchKeyDown(e.key, searchText)}
                onCancelClick={() => {
                    handleSearchKeyDown(ENTER_KEY, '');
                }}
                value={searchText}
            />

            <SSRSuspense fallback={<CampParticipantTableLoading />}>
                <Table
                    programId={programId}
                    campId={campId}
                    onSetTotalCount={setTotalCount}
                    isFoundationPage={isFoundationPage}
                />
            </SSRSuspense>
        </div>
    );
}

export default CampParticipantTable;
