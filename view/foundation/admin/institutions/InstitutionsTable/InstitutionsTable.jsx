import useQueryParam from '@/hooks/useQueryParam';
import { useGetInstitutionsFoundation } from '@/query-hooks/useInstitutions';
import { convertSort } from '@/utils';
import {
    HScrollTable,
    HScrollTablePagination,
    useHScrollTable,
} from '@goorm-dev/gds-tables';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getTableColoums } from './InstitutionsTable.util';

import styles from './InstitutionsTable.module.scss';
import { SearchInput } from '@goorm-dev/gds-components';
import EmptyTableCard, {
    EMPTY_IMAGE_TYPE,
} from '@/components/EmptyTableCard/EmptyTableCard';

function InstitutionsTable() {
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
        data: { items: institutions, totalCount },
    } = useGetInstitutionsFoundation({
        page,
        limit: pageSize,
        search,
        sort,
    });

    const columns = useMemo(() => getTableColoums(), []);

    const { getTableProps, getPaginationProps } = useHScrollTable({
        columns,
        data: institutions,

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
    const isFiltered = useMemo(() => !!search, [search]);

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
                    전체 기관{' '}
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
                        placeholder="기관 명, 캠프 명으로 검색"
                        size="lg"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </form>
            </div>
            {isEmptyData ? (
                <EmptyTableCard
                    text={
                        isFiltered
                            ? '검색 결과가 없습니다.'
                            : '등록된 기관이 없습니다.'
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
                        paginationProps={{ ...getPaginationProps() }}
                    />
                </>
            )}
        </div>
    );
}

export default InstitutionsTable;
