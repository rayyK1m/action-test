import Link from 'next/link';

import { cellHelper } from '@goorm-dev/gds-tables';
import { Badge, Button } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import { PROGRAM_DIVISION_BADGE, STATUS_TEXT } from './ProgramTable.constants';

import styles from './ProgramTable.module.scss';

export const getTableColoums = () => {
    const columns = [
        {
            accessorKey: 'reviewStatus',
            header: <div>승인 상태</div>,
            cell: (info) => {
                const status = info.getValue();
                const Icon = STATUS_TEXT[status].icon;
                return (
                    <div
                        className={`d-flex align-items-center text-${STATUS_TEXT[status].color}`}
                    >
                        <Icon className="mr-2" />
                        {STATUS_TEXT[status].text}
                    </div>
                );
            },
            size: 119,
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: <div>프로그램 명</div>,
            cell: cellHelper(({ value: name, rowData }) => (
                <Link
                    href={`/institution/admin/program/${rowData.id}`}
                    className={styles.programName}
                >
                    {name}
                </Link>
            )),
            size: 640,
            enableSorting: true,
        },
        {
            accessorKey: 'type',
            header: <div>유형</div>,
            cell: cellHelper(({ value: type }) => (
                <div className="d-flex">
                    <Badge
                        size="sm"
                        color={PROGRAM_DIVISION_BADGE[type.division].color}
                        className="mr-1"
                    >
                        {type.division}
                    </Badge>
                    <Badge size="sm" color="dark">
                        {type.duration}
                    </Badge>
                </div>
            )),
            maxSize: 129,
        },
        {
            accessorKey: 'institution',
            header: <div>기관 명</div>,
            cell: cellHelper(({ value: institution }) => {
                return <div>{institution.name}</div>;
            }),
            size: 180,
            enableSorting: true,
        },
        {
            accessorKey: 'student',
            header: '',
            cell: cellHelper(({ rowData }) => {
                const { campUserTicketCount } = rowData;

                return (
                    <Button
                        color="link"
                        onClick={() => alert(rowData.id)}
                        disabled={!campUserTicketCount}
                    >
                        신청자 관리
                    </Button>
                );
            }),
            size: 136,
        },
        {
            accessorKey: 'campCount',
            header: '',
            cell: cellHelper(({ value: campCount, rowData }) => {
                const { campUserTicketCount } = rowData;

                if (!campUserTicketCount) return <></>;

                return (
                    <Button
                        color="link"
                        onClick={() => alert(campCount)}
                        iconSide={'right'}
                        icon={<ChevronRightIcon />}
                    >
                        캠프 <span className="text-primary">{campCount}</span>
                    </Button>
                );
            }),
            size: 146,
        },
    ];

    return columns;
};
