import { cellHelper } from '@goorm-dev/gds-tables';
import { Button } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import { STATUS_TEXT } from './InstitutionsTable.constants';
import Link from 'next/link';
import React from 'react';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import ConfirmRequiredFile from './ConfirmRequiredFile';

export const getTableColoums = () => {
    return [
        {
            accessorKey: 'name',
            header: <div>기관 명</div>,
            cell: cellHelper(({ value: name, rowData }) => {
                const { id: institutionId } = rowData;

                return (
                    <Link
                        href={`/foundation/admin/institution/${institutionId}/programs`}
                    >
                        {name}
                    </Link>
                );
            }),
            size: 837,
            enableSorting: true,
        },
        {
            accessorKey: 'file',
            header: <div>필수 자료</div>,
            cell: cellHelper(({ rowData }) => {
                /** TODO: 상태값 DB에도 적용 완료되면 주석 해제 후 tempSubmitFilesStatus 제거 */
                const { submitFileStatus } = rowData;
                // const tempSubmitFilesStatus = 'NOT_SUBMITTED';
                const Icon =
                    STATUS_TEXT[submitFileStatus].icon || React.Fragment;

                return (
                    <span
                        size="sm"
                        className={
                            STATUS_TEXT[submitFileStatus].color &&
                            `text-${STATUS_TEXT[submitFileStatus].color}`
                        }
                    >
                        <Icon className="mr-2" />
                        {STATUS_TEXT[submitFileStatus].text}
                    </span>
                );
            }),
            maxSize: 159,
            enableSorting: true,
        },
        {
            accessorKey: 'confirm',
            header: '',
            cell: cellHelper(({ rowData }) => {
                return <ConfirmRequiredFile rowData={rowData} />;
            }),
            size: 151,
        },
        {
            accessorKey: 'programCount',
            header: '',
            cell: cellHelper(({ value: programCount, rowData }) => {
                const { id: institutionId, submitFileStatus } = rowData;

                const isDisabled =
                    submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.제출.key ||
                    submitFileStatus ===
                        REQUIRED_FILE_SUBMIT_STATUS.미제출.key ||
                    submitFileStatus === REQUIRED_FILE_SUBMIT_STATUS.거절됨.key;

                return (
                    <Button
                        tag={Link}
                        href={`/foundation/admin/institution/${institutionId}/programs`}
                        color="link"
                        iconSide={'right'}
                        icon={<ChevronRightIcon />}
                        disabled={isDisabled}
                    >
                        프로그램{' '}
                        <span className="text-primary">{programCount}</span>
                    </Button>
                );
            }),
            size: 161,
        },
    ];
};
