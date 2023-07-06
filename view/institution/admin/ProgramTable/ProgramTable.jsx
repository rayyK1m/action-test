import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import { SearchInput } from '@goorm-dev/gds-components';

import useQueryParam from '@/hooks/useQueryParam';
import { convertSort } from '@/utils';
import useProgramsAdmin from '@/query-hooks/useProgramsAdmin';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';
import { getTableColoums } from './ProgramTable.util.jsx';

import styles from './ProgramTable.module.scss';

const CURRENT_URL = '/institution/admin';
const routerPush = (router, query) => {
    router.push(
        {
            pathname: CURRENT_URL,
            query: {
                ...router.query,
                ...query,
            },
        },
        undefined,
        { shallow: true },
    );
};

function ProgramTable() {
    const router = useRouter();
    const memoizedRouter = useMemo(() => router, []);

    const { search, sort } = memoizedRouter.query;
    const page = useQueryParam({
        key: 'page',
        parser: Number,
        defaultValue: 1,
    });

    const [searchText, setSearchText] = useState(search);
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: 5,
    });
    const [sorting, setSorting] = useState(convertSort(sort));

    const {
        data: { data: programs, totalCount },
    } = useProgramsAdmin.GET({
        page,
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
        pageCount: Math.ceil(totalCount / 5),
        setPagination,
        setSorting,
        pageIndex: page - 1,
        pageSize: 5,
        sorting,
    });

    useEffect(() => {
        routerPush(memoizedRouter, { page: pageIndex + 1 });
    }, [memoizedRouter, pageIndex]);

    useEffect(() => {
        if (sorting.length === 0) {
            routerPush(memoizedRouter, { sort: null });
            return;
        }
        const sortId = sorting[0]?.id ?? null;
        const isDesc = sorting[0]?.desc;

        routerPush(memoizedRouter, { sort: (isDesc ? '-' : '') + sortId });
    }, [memoizedRouter, sort, sorting]);

    const handleSearhCange = useCallback(
        (e) => {
            const {
                target: { value },
            } = e;
            setSearchText(value);

            if (!value) {
                routerPush(memoizedRouter, { search: null });
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
                routerPush(memoizedRouter, { search: value });
            }
        },
        [memoizedRouter],
    );

    const isEmptyData = useMemo(() => totalCount === 0, [totalCount]);
    return (
        <div>
            <div className={styles.title}>
                <h6>
                    모든 프로그램{' '}
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
