import React, { useMemo } from 'react';

import {
    useHScrollTable,
    HScrollTable,
    HScrollTablePagination,
} from '@goorm-dev/gds-tables';
import { SearchInput } from '@goorm-dev/gds-components';

import { getTableColoums } from './ProgramTable.util';

import styles from './ProgramTable.module.scss';
import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';

const MOCK_DATA = [
    {
        index: 'prog_oUOrd_1687395960877',
        type: {
            camp: '방문형',
            duration: '장기',
        },
        name: '인간을 돕는 드론 에이전트',
        status: 1,
        uuid: 'eZCNFRJL18BCAZ3h0_iaY',
    },
    {
        index: 'prog_oUOrd_1687395960878',
        type: {
            camp: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        status: 2,
        uuid: 'eZCNFRJL18BCAZ3h0_iaY1',
    },
    {
        index: 'prog_oUOrd_1687395960879',
        type: {
            camp: '집합형',
            duration: '장기',
        },
        name: '제주교대(신화월드) 상반기 새싹캠프 인공지능 올림픽',
        status: 3,
        uuid: 'eZCNFRJL18BCAZ3h0_iaY2',
    },
    {
        index: 'prog_oUOrd_1687395960880',
        type: {
            camp: '방문형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        status: 2,
        uuid: 'eZCNFRJL18BCAZ3h0_iaY3',
    },
    {
        index: 'prog_oUOrd_1687395960881',
        type: {
            camp: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        status: 2,
        uuid: 'eZCNFRJL18BCAZ3h0_iaY4',
    },
];

function ProgramTable() {
    const columns = getTableColoums();
    const totalCount = 0;
    const {
        getTableProps,
        getPaginationProps,
        // state: {
        //     rowSelection,
        //     pageIndex: tablePageIndex,
        //     pageSize: tablePageSize,
        //     sorting: tableSorting,
        // },
    } = useHScrollTable({
        columns,
        data: MOCK_DATA || [],

        extraColumnType: 'index',

        usePagination: true,
        // manualPagination: true,
        // pageCount,
        // setPagination,
        // pageIndex,
        pageSize: 5,
    });

    const isEmpty = useMemo(() => totalCount === 0, [totalCount]);
    return (
        <div>
            <div className={styles.title}>
                <h6>
                    모든 프로그램{' '}
                    <span
                        className={isEmpty ? 'text-gray-600' : 'text-blue-500'}
                    >
                        {totalCount}
                    </span>
                </h6>

                <SearchInput
                    className={styles.searchInput}
                    placeholder="프로그램 검색"
                    size="lg"
                />
            </div>

            {isEmpty ? (
                <EmptyTableCard text="등록된 프로그램이 없습니다." />
            ) : (
                <>
                    {' '}
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
