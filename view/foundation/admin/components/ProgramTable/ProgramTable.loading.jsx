import React from 'react';
import cn from 'classnames';

import { useHScrollTable, HScrollTable } from '@goorm-dev/gds-tables';
import { Skeleton, SearchInput } from '@goorm-dev/gds-components';

import styles from './ProgramTable.module.scss';
import { FOUNDATION_ADMIN_DEFAULT_QUERY } from './ProgramTable.constants';
import { PROGRAM_DIVISION } from '@/constants/db';

const getTableData = () =>
    Array.from({ length: FOUNDATION_ADMIN_DEFAULT_QUERY.limit }, () => ({
        index: '',
        type: {
            camp: PROGRAM_DIVISION.방문형,
            duration: '장기',
        },
        name: '인간을 돕는 드론 에이전트',
        status: 1,
        uuid: '',
    }));

const TableSkeleton = () => (
    <Skeleton width="100%" height="1.25rem" className={styles.roundSkeleton} />
);

/**
 * @param {import('./ProgramTable.type').ColumnsOption}
 */
const getTableColoums = (option = {}) =>
    [
        {
            accessorKey: 'reviewStatus',
            header: <div>승인 상태</div>,
            cell: <TableSkeleton />,
            size: 119,
        },
        {
            accessorKey: 'name',
            header: <div>프로그램 명</div>,
            cell: <TableSkeleton />,
            size: 640,
        },
        {
            accessorKey: 'type',
            header: <div>유형</div>,
            cell: <TableSkeleton />,
            maxSize: 129,
        },
        {
            accessorKey: 'institution',
            header: <div>기관 명</div>,
            cell: <TableSkeleton />,
            size: 180,
        },
        {
            accessorKey: 'student',
            header: '',
            cell: <TableSkeleton />,
            size: 136,
        },
        {
            accessorKey: 'campCount',
            header: '',
            cell: <TableSkeleton />,
            size: 146,
        },
    ].filter(({ accessorKey }) => option[accessorKey] !== false);

/**
 * @param {{ columnsOption: import('./ProgramTable.type').ColumnsOption }} props
 */
function ProgramTableLoading({ columnsOption }) {
    const { getTableProps } = useHScrollTable({
        columns: getTableColoums(columnsOption),
        data: getTableData(),

        extraColumnType: 'index',

        usePagination: true,
        pageSize: FOUNDATION_ADMIN_DEFAULT_QUERY.limit,
    });
    return (
        <div>
            <div className={styles.title}>
                <h6>전체 프로그램</h6>

                <SearchInput
                    className={cn(
                        styles.searchInput,
                        styles.searchInput_isLoading,
                    )}
                    placeholder="프로그램 검색"
                    size="lg"
                />
            </div>
            <HScrollTable {...getTableProps()} />
        </div>
    );
}

export default ProgramTableLoading;
