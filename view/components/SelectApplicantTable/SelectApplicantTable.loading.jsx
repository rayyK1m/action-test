import React from 'react';

import { useHScrollTable, HScrollTable } from '@goorm-dev/gds-tables';
import { Skeleton, Button } from '@goorm-dev/gds-components';

const getTableData = () => {
    const data = [];
    for (let i = 0; i < 10; i += 1) {
        data.push({
            userName: '',
            operateLocation: '',
            targetGroup: '',
            schoolName: '',
            phoneNumber: '',
        });
    }
    return data;
};

const COLUMNS = [
    {
        accessorKey: 'userName',
        header: <div>이름</div>,
        cell: <Skeleton width="3.5rem" height="1.25rem" />,
        size: 119,
        maxSize: 119,
        enableSorting: true,
    },
    {
        accessorKey: 'operateLocation',
        header: <div>신청 지역</div>,
        cell: <Skeleton width="6rem" height="1.25rem" />,
        size: 139,
    },
    {
        accessorKey: 'targetGroup',
        header: <div>신청 대상</div>,
        cell: <Skeleton width="5rem" height="1.25rem" />,
        size: 168,
        maxSize: 248,
    },
    {
        accessorKey: 'schoolName',
        header: <div>소속 학교</div>,
        cell: <Skeleton width="10rem" height="1.25rem" />,
        size: 310,
        maxSize: 450,
        enableSorting: true,
    },
    {
        accessorKey: 'phoneNumber',
        header: <div>연락처</div>,
        cell: <Skeleton width="6.25rem" height="1.25rem" />,
        size: 145,
    },
    {
        accessorKey: 'viewDetail',
        header: <></>,
        cell: () => (
            <Button color="link" disabled>
                신청 정보 확인
            </Button>
        ),
        size: 154,
        minSize: 154,
    },
];

const ROW_DATA = getTableData();
function SelectApplicantTableLoading() {
    const { getTableProps } = useHScrollTable({
        columns: COLUMNS,
        data: ROW_DATA,

        extraColumnType: 'checkIndex',

        usePagination: true,
        pageSize: 5,
    });

    return <HScrollTable {...getTableProps()} />;
}

export default SelectApplicantTableLoading;
