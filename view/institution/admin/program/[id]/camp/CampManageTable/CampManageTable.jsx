import { useMemo } from 'react';

import {
    HScrollTable,
    HScrollTablePagination,
    useHScrollTable,
    TYPES,
} from '@goorm-dev/gds-tables';

import styles from './CampManageTable.module.scss';

const columns = [
    {
        accessorKey: 'classNumberStr',
        header: '분반',
        cell: (info) => info.getValue(),
        size: 92,
        enableSorting: true,
    },
    {
        accessorKey: 'classroom',
        header: '교육장소',
        cell: (info) => info.getValue(),
        size: 130,
    },
    {
        accessorKey: 'name',
        header: '캠프 명',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'classStatus',
        header: '교육 진행',
        cell: (info) => info.getValue(),
        size: 115,
    },
    {
        accessorKey: 'submitPreFileReport',
        header: '사전 자료',
        cell: (info) => info.getValue(),
        size: 115,
    },
    {
        accessorKey: 'submitPostFileReport',
        header: '종료 자료',
        cell: (info) => info.getValue(),
        size: 115,
    },
    {
        accessorKey: 'buttons',
        header: '',
        cell: (info) => info.getValue(),
        size: 200,
    },
];

function CampManageTable({ data, total }) {
    const page = 1;
    const memoizationColumns = useMemo(() => columns, []);
    const { getTableProps, getPaginationProps } = useHScrollTable({
        data,
        columns: memoizationColumns,
        usePagination: true,
        manualPagination: true,
        extraColumnType: TYPES.EXTRA_COLUMN_TYPE.INDEX,
        pageCount: Math.ceil(total / 5),
        pageIndex: page - 1,
        pageSize: 5,
    });

    return (
        <div className={styles.container}>
            <HScrollTable {...getTableProps()} />
            <HScrollTablePagination
                paginationProps={{
                    ...getPaginationProps(),
                }}
            />
        </div>
    );
}

export default CampManageTable;
