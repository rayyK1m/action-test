import React from 'react';
import cn from 'classnames';

import { useHScrollTable, HScrollTable } from '@goorm-dev/gds-tables';
import { Skeleton, SearchInput } from '@goorm-dev/gds-components';

import styles from './ProgramTable.module.scss';

const getTableData = () => {
    const data = [];
    for (let i = 0; i < 5; i += 1) {
        data.push({
            index: '',
            type: {
                camp: '방문형',
                duration: '장기',
            },
            name: '인간을 돕는 드론 에이전트',
            status: 1,
            uuid: '',
        });
    }
    return data;
};

const getTableColoums = () => [
    {
        accessorKey: 'type',
        header: <div>유형</div>,
        cell: <Skeleton width="4rem" height="1.25rem" />,
        maxSize: 119,
    },
    {
        accessorKey: 'name',
        header: <div>프로그램 명</div>,
        cell: <Skeleton width="17.5rem" height="1.25rem" />,
        size: 640,
        enableSorting: true,
    },
    {
        accessorKey: 'status',
        header: <div>승인 상태</div>,
        cell: <Skeleton width="4rem" height="1.25rem" />,
        size: 129,
        enableSorting: true,
    },
    {
        accessorKey: 'student',
        header: <div>신청자 관리</div>,
        cell: <Skeleton width="5.5rem" height="1.25rem" />,
        size: 140,
    },
    {
        accessorKey: 'camp',
        header: <div>캠프 관리</div>,
        cell: <Skeleton width="5.5rem" height="1.25rem" />,
        size: 129,
    },
    {
        accessorKey: 'content',
        header: <div>콘텐츠 관리</div>,
        cell: <Skeleton width="5.5rem" height="1.25rem" />,
        size: 160,
    },
];

const ROW_DATA = getTableData();
const COLUMNS = getTableColoums();

function ProgramTableLoading() {
    const { getTableProps } = useHScrollTable({
        columns: COLUMNS,
        data: ROW_DATA,

        extraColumnType: 'index',

        usePagination: true,
        pageSize: 5,
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
