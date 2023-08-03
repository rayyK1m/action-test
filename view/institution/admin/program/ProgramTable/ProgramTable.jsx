import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import { SearchInput } from '@goorm-dev/gds-components';

import useQueryParam from '@/hooks/useQueryParam';
import { convertSort, routerPushShallow } from '@/utils';
import { ENTER_KEY } from '@/constants/common.js';
import { useGetProgramsAdmin } from '@/query-hooks/usePrograms';
import EmptyTableCard, {
    EMPTY_IMAGE_TYPE,
} from '@/components/EmptyTableCard/EmptyTableCard';
import { getTableColoums } from './ProgramTable.util.jsx';

import styles from './ProgramTable.module.scss';

function ProgramTable() {
    const router = useRouter();
    const memoizedRouter = useMemo(() => router, []);

    const { search, sort } = memoizedRouter.query;
    const page =
        useQueryParam({
            key: 'page',
            parser: Number,
        }) || 1;

    const [searchText, setSearchText] = useState(search);
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState(convertSort(sort));

    const {
        data: { programs, totalCount },
    } = useGetProgramsAdmin({
        page: pageIndex + 1,
        limit: pageSize,
        search,
        ...(sort !== '' && { sort }),
    });

    const columns = useMemo(() => getTableColoums(), []);
    const { getTableProps, getPaginationProps } = useHScrollTable({
        columns,
        data: programs,

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
        if (pageIndex === 0 && page === 1) {
            return;
        }
        routerPushShallow(memoizedRouter, { page: pageIndex + 1 });
    }, [memoizedRouter, pageIndex, page]);

    useEffect(() => {
        if (sorting.length === 0) {
            sort !== undefined &&
                routerPushShallow(memoizedRouter, { sort: null });
            return;
        }
        const sortId = sorting[0]?.id ?? null;
        const isDesc = sorting[0]?.desc;

        routerPushShallow(memoizedRouter, {
            sort: (isDesc ? '-' : '') + sortId,
        });
    }, [memoizedRouter, sort, sorting]);

    const handleSearhCange = useCallback(
        (e) => {
            const {
                target: { value },
            } = e;
            setSearchText(value);
        },
        [setSearchText],
    );

    const handleSearchKeyDown = useCallback(
        (key, value) => {
            if (key === ENTER_KEY) {
                routerPushShallow(memoizedRouter, {
                    page: 1,
                    search: value,
                });
            }
        },
        [memoizedRouter],
    );

    const isEmptyData = useMemo(() => totalCount === 0, [totalCount]);
    const isFiltered = useMemo(() => !!search, [search]);
    return (
        <div>
            <div className={styles.title}>
                <h6>
                    전체 프로그램{' '}
                    <span
                        className={
                            isEmptyData ? 'text-gray-600' : 'text-blue-500'
                        }
                    >
                        {totalCount}
                    </span>
                </h6>

                <SearchInput
                    className={cn(
                        styles.searchInput,
                        isEmptyData &&
                            !isFiltered &&
                            styles.searchInput_isLoading,
                    )}
                    placeholder="프로그램 검색"
                    size="lg"
                    onChange={handleSearhCange}
                    onKeyDown={(e) => handleSearchKeyDown(e.key, searchText)}
                    onCancelClick={() => {
                        handleSearchKeyDown(ENTER_KEY, '');
                    }}
                    value={searchText}
                />
            </div>

            {isEmptyData ? (
                <EmptyTableCard
                    text={
                        isFiltered
                            ? '검색 결과가 없습니다.'
                            : '등록된 프로그램이 없습니다.'
                    }
                    imageSrc={isFiltered && EMPTY_IMAGE_TYPE.SEARCH}
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
        </div>
    );
}

export default ProgramTable;
