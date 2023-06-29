import { cellHelper } from '@goorm-dev/gds-tables';
import { Badge, Button } from '@goorm-dev/gds-components';
import { SubmitModeIcon } from '@goorm-dev/gds-icons';
import { CAMP_TYPE_BADGE, STATUS_TEXT } from './ProgramTable.constants';

export const getTableColoums = () => {
    const columns = [
        {
            accessorKey: 'type',
            header: <div>유형</div>,
            cell: cellHelper(({ value }) => (
                <div className="d-flex">
                    <Badge
                        size="sm"
                        color={CAMP_TYPE_BADGE[value.camp].color}
                        className="mr-1"
                    >
                        {value.camp}
                    </Badge>
                    <Badge size="sm" color="dark">
                        {value.duration}
                    </Badge>
                </div>
            )),
            maxSize: 119,
        },
        {
            accessorKey: 'name',
            header: <div>프로그램 명</div>,
            cell: (info) => <div>{info.getValue()}</div>,
            size: 640,
            enableSorting: true,
        },
        {
            accessorKey: 'status',
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
            size: 129,
            enableSorting: true,
        },
        {
            accessorKey: 'student',
            header: <div>신청자 관리</div>,
            cell: cellHelper(({ rowData }) => {
                const { status } = rowData;
                const isInProgress = status === 'IN_PROGRESS';
                return (
                    <Button
                        color="link"
                        onClick={() => alert(rowData.index)}
                        disabled={isInProgress}
                    >
                        신청자 관리
                    </Button>
                );
            }),
            size: 140,
        },
        {
            accessorKey: 'camp',
            header: <div>캠프 관리</div>,
            cell: cellHelper(({ rowData }) => {
                const { status } = rowData;
                const isInProgress = status === 'IN_PROGRESS';
                return (
                    <Button
                        color="link"
                        onClick={() => alert(rowData.index)}
                        disabled={isInProgress}
                    >
                        캠프 관리
                    </Button>
                );
            }),
            size: 129,
        },
        {
            accessorKey: 'content',
            header: <div>콘텐츠 관리</div>,
            cell: cellHelper(({ rowData }) => {
                const { status } = rowData;
                const isInProgress = status === 'IN_PROGRESS';
                return (
                    <Button
                        color="link"
                        onClick={() => alert(rowData.index)}
                        disabled={isInProgress}
                    >
                        콘텐츠 관리
                        <SubmitModeIcon />
                    </Button>
                );
            }),
            size: 160,
        },
    ];

    return columns;
};
