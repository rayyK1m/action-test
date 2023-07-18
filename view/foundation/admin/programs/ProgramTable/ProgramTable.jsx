import { useRouter } from 'next/router';
import useQueryParam from '@/hooks/useQueryParam';
import { useEffect, useMemo, useState } from 'react';
import { convertSort } from '@/utils';
import useProgramsAdmin from '@/query-hooks/useProgramsAdmin';
import {
    HScrollTable,
    HScrollTablePagination,
    useHScrollTable,
} from '@goorm-dev/gds-tables';
import { getTableColoums } from './ProgramTable.util';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';

import styles from './ProgramTable.module.scss';
import { SearchInput } from '@goorm-dev/gds-components/dist/cjs';

function ProgramTable() {
    const router = useRouter();
    const page = useQueryParam({
        key: 'page',
        parser: Number,
    });
    const limit = useQueryParam({
        key: 'limit',
        parser: Number,
    });

    const { search, sort } = router.query;
    const [searchText, setSearchText] = useState(search);
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: limit,
    });
    const [sorting, setSorting] = useState(convertSort(sort));

    const {
        data: { data: programs, totalCount },
    } = useProgramsAdmin.GET({
        page,
        limit: pageSize,
        search,
        sort,
    });

    const columns = useMemo(() => getTableColoums(), []);
    const { getTableProps, getPaginationProps } = useHScrollTable({
        columns,
        data: programs,

        extraColumnType: 'index',

        usePagination: true,
        manualPagination: true,
        pageCount: Math.ceil((totalCount || 0) / pageSize),
        setPagination,
        setSorting,
        pageIndex,
        pageSize,
        sorting,
    });
    const isEmptyData = useMemo(() => !totalCount, [totalCount]);

    const searchTable = (e) => {
        e.preventDefault();
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    search: searchText,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    useEffect(() => {
        /** page, limit 관련 query 변경 */
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page: pageIndex + 1,
                    limit: pageSize,
                },
            },
            undefined,
            { shallow: true },
        );
    }, [pageIndex, pageSize]);

    useEffect(() => {
        /** sorting 관련 query 변경 */
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    sort:
                        sorting.map(({ id, desc }) =>
                            desc ? `-${id}` : `${id}`,
                        )[0] ?? null,
                },
            },
            undefined,
            { shallow: true },
        );
    }, [sorting]);

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
                        {totalCount || 0}
                    </span>
                </h6>
                <form onSubmit={searchTable}>
                    <SearchInput
                        className={styles.searchInput}
                        placeholder="프로그램 검색"
                        size="lg"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </form>
            </div>
            {isEmptyData ? (
                <EmptyTableCard text="등록된 프로그램이 없습니다." />
            ) : (
                <>
                    <HScrollTable {...getTableProps()} />
                    <HScrollTablePagination
                        paginationProps={{ ...getPaginationProps() }}
                    />
                </>
            )}
        </div>
    );
}

export default ProgramTable;
