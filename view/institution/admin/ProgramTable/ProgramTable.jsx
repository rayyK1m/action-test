import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import { SearchInput } from '@goorm-dev/gds-components';

import useQueryParam from '@/hooks/useQueryParam';
import { convertSort, routerPushShallow } from '@/utils';
import { useGetProgramsAdmin } from '@/query-hooks/usePrograms';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';
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
        pageSize: 5,
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
        routerPushShallow(memoizedRouter, { page: pageIndex + 1 });
    }, [memoizedRouter, pageIndex]);

    useEffect(() => {
        if (sorting.length === 0) {
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

            if (!value) {
                routerPushShallow(memoizedRouter, {
                    search: null,
                });
                return;
            }
        },
        [memoizedRouter, setSearchText],
    );

    const handleSearchKeyDown = useCallback(
        (e) => {
            const {
                key,
                target: { value },
            } = e;
            if (key === 'Enter') {
                routerPushShallow(memoizedRouter, {
                    search: value,
                });
            }
        },
        [memoizedRouter],
    );

    const isEmptyData = useMemo(() => totalCount === 0, [totalCount]);
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
                    className={styles.searchInput}
                    placeholder="프로그램 검색"
                    size="lg"
                    onChange={handleSearhCange}
                    onKeyDown={handleSearchKeyDown}
                    value={searchText}
                />
            </div>

            {isEmptyData ? (
                <EmptyTableCard text="등록된 프로그램이 없습니다." />
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
