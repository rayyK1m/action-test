import React from 'react';
import cn from 'classnames';

import { useHScrollTable, HScrollTable } from '@goorm-dev/gds-tables';
import { Skeleton, SearchInput } from '@goorm-dev/gds-components';

import styles from './InstitutionsTable.module.scss';
import { FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY } from './InstitutionsTable.constants';
import { PROGRAM_DIVISION, PROGRAM_DURATION } from '@/constants/db';

const getTableData = () =>
    Array.from(
        { length: FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY.limit },
        () => ({
            index: '',
            type: {
                camp: PROGRAM_DIVISION.방문형,
                duration: PROGRAM_DURATION.지속,
            },
            name: '인간을 돕는 드론 에이전트',
            status: 1,
            uuid: '',
        }),
    );

const TableSkeleton = () => (
    <Skeleton width="100%" height="1.25rem" className={styles.roundSkeleton} />
);

const getTableColoums = () => [
    {
        accessorKey: 'name',
        header: <div>기관 명</div>,
        cell: <TableSkeleton />,
        size: 837,
    },
    {
        accessorKey: 'file',
        header: <div>필수 자료</div>,
        cell: <TableSkeleton />,
        maxSize: 159,
    },
    {
        accessorKey: 'student',
        header: '',
        cell: <TableSkeleton />,
        size: 151,
    },
    {
        accessorKey: 'programCount',
        header: '',
        cell: <TableSkeleton />,
        size: 161,
    },
];

function InstitutionsTableLoading() {
    const { getTableProps } = useHScrollTable({
        columns: getTableColoums(),
        data: getTableData(),

        extraColumnType: 'index',

        usePagination: true,
        pageSize: FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY.limit,
    });
    return (
        <div>
            <div className={styles.title}>
                <h6>전체 기관</h6>

                <SearchInput
                    className={cn(
                        styles.searchInput,
                        styles.searchInput_isLoading,
                    )}
                    placeholder="기관 명, 캠프 명으로 검색"
                    size="lg"
                />
            </div>
            <HScrollTable {...getTableProps()} />
        </div>
    );
}

export default InstitutionsTableLoading;
