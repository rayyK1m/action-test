import Link from 'next/link';

import { cellHelper } from '@goorm-dev/gds-tables';
import { Button } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';

import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';
import { STATUS_TEXT } from './ProgramTable.constants';

import styles from './ProgramTable.module.scss';

/**
 * @param {import('./ProgramTable.type').ColumnsOption}
 */
const BASE_URL = '/foundation/admin/programs';
export const getTableColoums = (option = {}) => {
    return [
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
                    href={`/foundation/admin/programs/${rowData.id}`}
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
                <ProgramTypeBadge
                    division={type.division}
                    duration={type.duration}
                />
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
                const { reviewStatus } = rowData;
                const isDisabled =
                    reviewStatus === 'IN_PROGRESS' || reviewStatus === 'REJECT';

                return (
                    <Button
                        color="link"
                        href={`${BASE_URL}/${rowData.id}/applicant`}
                        disabled={isDisabled}
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
                const { reviewStatus } = rowData;
                const isDisabled =
                    reviewStatus === 'IN_PROGRESS' || reviewStatus === 'REJECT';

                return (
                    <Button
                        color="link"
                        onClick={() => alert(campCount)}
                        iconSide={'right'}
                        icon={<ChevronRightIcon />}
                        disabled={isDisabled}
                    >
                        캠프 <span className="text-primary">{campCount}</span>
                    </Button>
                );
            }),
            size: 146,
        },
    ].filter(({ accessorKey }) => option[accessorKey] !== false);
};
