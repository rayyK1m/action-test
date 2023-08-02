import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import {
    SearchInput,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from '@goorm-dev/gds-components';

import useQueryParam from '@/hooks/useQueryParam';
import useToggle from '@/hooks/useToggle';
import { convertSort, routerPushShallow } from '@/utils';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';
import { useGetCampTicketsAdmin } from '@/query-hooks/uesCampTickets';
import { getTableColoums } from './ApplicantTable.util';
import { DROPDOWN_MENU } from './ApplicantTable.constants';

import styles from './ApplicantTable.module.scss';

function ApplicantTable() {
    const router = useRouter();
    const memoizedRouter = useMemo(() => router, []);

    const { search, sort } = memoizedRouter.query;
    const page =
        useQueryParam({
            key: 'page',
            parser: Number,
        }) || 1;
    const reviewStatus =
        useQueryParam({ key: 'reviewStatus', parser: Number }) || 0;

    const [searchText, setSearchText] = useState(search);
    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState(convertSort(sort));
    const [isFilterDropdownOpen, toggleFilterDropdown] = useToggle();

    const {
        data: { campApplicants, totalCount, programDivision },
    } = useGetCampTicketsAdmin({
        programId: router.query.id,
        page: pageIndex + 1,
        limit: pageSize,
        search,

        reviewStatus: DROPDOWN_MENU[reviewStatus].value,
        ...(sort !== '' && { sort }),
    });

    const columns = useMemo(
        () => getTableColoums(programDivision),
        [programDivision],
    );
    const { getTableProps, getPaginationProps } = useHScrollTable({
        columns,
        data: campApplicants,

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
    const isFiltered = useMemo(
        () => reviewStatus !== 0 || !!search,
        [reviewStatus, search],
    );
    return (
        <div>
            <div className={styles.title}>
                <h6>
                    전체 신청자{' '}
                    <span
                        className={
                            isEmptyData ? 'text-gray-600' : 'text-blue-500'
                        }
                    >
                        {totalCount}
                    </span>
                </h6>

                <div className="d-flex">
                    <SearchInput
                        className={cn(
                            styles.searchInput,
                            isEmptyData &&
                                !isFiltered &&
                                styles.searchInput_isLoading,
                        )}
                        placeholder="신청자 검색"
                        size="lg"
                        onChange={handleSearhCange}
                        onKeyDown={handleSearchKeyDown}
                        value={searchText}
                    />
                    <ButtonDropdown
                        isOpen={isFilterDropdownOpen}
                        toggle={toggleFilterDropdown}
                    >
                        <DropdownToggle
                            size="lg"
                            color="link"
                            theme="light"
                            caret
                            disabled={isEmptyData && !isFiltered}
                            active={reviewStatus !== 0}
                        >
                            {DROPDOWN_MENU[reviewStatus].text}
                        </DropdownToggle>

                        <DropdownMenu right={true}>
                            {DROPDOWN_MENU.map((item) => (
                                <DropdownItem
                                    key={item.key}
                                    onClick={() => {
                                        routerPushShallow(memoizedRouter, {
                                            page: 1,
                                            reviewStatus: item.index,
                                        });
                                    }}
                                >
                                    {item.text}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </div>

            {isEmptyData ? (
                <EmptyTableCard
                    text={
                        isFiltered
                            ? '해당하는 신청자가 없습니다.'
                            : '프로그램 신청자가 없습니다.'
                    }
                    type="NO_LIST"
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

export default ApplicantTable;
