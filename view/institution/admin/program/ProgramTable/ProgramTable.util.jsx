import Link from 'next/link';

import { cellHelper } from '@goorm-dev/gds-tables';
import { Button } from '@goorm-dev/gds-components';
import { ChevronRightIcon, SubmitModeIcon } from '@goorm-dev/gds-icons';

import { slugify } from '@/utils';
import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';
import { STATUS_TEXT } from './ProgramTable.constants';

import styles from './ProgramTable.module.scss';
import { PROGRAM_REVIEW_STATUS } from '@/constants/db';

const BASE_URL = '/institution/admin';
export const getTableColoums = () => {
    const columns = [
        {
            accessorKey: 'type',
            header: <div>유형</div>,
            cell: cellHelper(({ value }) => (
                <ProgramTypeBadge
                    division={value.division}
                    duration={value.duration}
                />
            )),
            maxSize: 119,
        },
        {
            accessorKey: 'name',
            header: <div>프로그램 명</div>,
            cell: cellHelper(({ value, rowData }) => (
                <Link
                    href={`/institution/admin/program/${rowData.id}`}
                    className={styles.programName}
                >
                    {value}
                </Link>
            )),
            size: 640,
            enableSorting: true,
        },
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
            size: 129,
            enableSorting: true,
        },
        {
            accessorKey: 'student',
            header: <div>신청자 관리</div>,
            cell: cellHelper(({ rowData }) => {
                const { reviewStatus, id } = rowData;
                const isApproved =
                    reviewStatus === PROGRAM_REVIEW_STATUS.승인됨.value;
                return (
                    <Button
                        color="link"
                        tag={Link}
                        href={`${BASE_URL}/program/${id}/applicant`}
                        disabled={!isApproved}
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
                const { reviewStatus, id } = rowData;
                const isApproved =
                    reviewStatus === PROGRAM_REVIEW_STATUS.승인됨.value;

                return (
                    <Button
                        color="link"
                        tag={Link}
                        href={`${BASE_URL}/program/${id}/camp`}
                        disabled={!isApproved}
                        icon={<ChevronRightIcon />}
                        iconSide="right"
                    >
                        캠프
                        <span className="text-blue-500">
                            {rowData.campCount > 99 ? '99+' : rowData.campCount}
                        </span>
                    </Button>
                );
            }),
            size: 146,
        },
        {
            accessorKey: 'content',
            header: <div>콘텐츠 관리</div>,
            cell: cellHelper(({ rowData }) => {
                const { reviewStatus } = rowData;
                const isApproved =
                    reviewStatus === PROGRAM_REVIEW_STATUS.승인됨.value;
                return (
                    <Button
                        color="link"
                        tag={Link}
                        target="_blank"
                        href={`${
                            process.env.SWCAMP_CONTENTS_CHANNEL
                        }/v2/teach/lecture/${rowData.lectureSequence}/${slugify(
                            rowData.name,
                        )}`}
                        disabled={!isApproved}
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
