import React, { useMemo } from 'react';
import cn from 'classnames';

import { useHScrollTable, HScrollTable } from '@goorm-dev/gds-tables';
import {
    Skeleton,
    SearchInput,
    Button,
    DropdownToggle,
} from '@goorm-dev/gds-components';

import styles from './ApplicantTable.module.scss';
import { PROGRAM_DIVISION } from '@/constants/db';

const getTableData = () => {
    const data = [];
    for (let i = 0; i < 10; i += 1) {
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

const getTableColoums = (division) => [
    {
        accessorKey: 'userName',
        header: <div>신청자 명</div>,
        cell: <Skeleton width="4rem" height="1.25rem" />,
        maxSize: 119,
        enableSorting: true,
    },
    {
        accessorKey: 'operateLocation',
        header: <div>신청 지역</div>,
        cell: <Skeleton width="4.5rem" height="1.25rem" />,
        size: 168,
    },
    {
        accessorKey: 'targetGroup',
        header: <div>신청 대상</div>,
        cell: <Skeleton width="17.5rem" height="1.25rem" />,
        size: 139,
    },
    {
        accessorKey: 'schoolIndex',
        header: (
            <div>
                {division === PROGRAM_DIVISION.방문형
                    ? '교육 장소'
                    : '소속 학교'}
            </div>
        ),
        cell: <Skeleton width="5.5rem" height="1.25rem" />,
        size: 340,
    },
    {
        accessorKey: 'expectedUserCount',
        header: (
            <div>
                {division === PROGRAM_DIVISION.방문형 ? '신청 인원' : '연락처'}
            </div>
        ),
        cell: <Skeleton width="5.5rem" height="1.25rem" />,
        size: 129,
    },
    {
        accessorKey: 'reviewStatus',
        header: <div>승인 상태</div>,
        cell: <Skeleton width="5.5rem" height="1.25rem" />,
        size: 119,
    },
    {
        accessorKey: 'viewDetail',
        header: <></>,
        cell: () => (
            <Button color="link" disabled>
                신청 정보 보기
            </Button>
        ),
        size: 151,
        minSize: 151,
    },
];

const ROW_DATA = getTableData();

function ApplicantTableLoading({ division }) {
    const COLUMNS = useMemo(() => getTableColoums(division), [division]);
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
                <h6>모든 신청자</h6>

                <div className="d-flex">
                    <SearchInput
                        className={cn(
                            styles.searchInput,
                            styles.searchInput_isLoading,
                        )}
                        placeholder="신청자 검색"
                        size="lg"
                    />

                    <DropdownToggle
                        size="lg"
                        color="link"
                        theme="light"
                        caret
                        disabled
                    >
                        전체
                    </DropdownToggle>
                </div>
            </div>

            <HScrollTable {...getTableProps()} />
        </div>
    );
}

export default ApplicantTableLoading;
