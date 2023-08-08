import { cellHelper } from '@goorm-dev/gds-tables';
import { Button } from '@goorm-dev/gds-components';
import { ChevronRightIcon } from '@goorm-dev/gds-icons';
import { STATUS_TEXT } from './InstitutionsTable.constants';
import Link from 'next/link';

export const getTableColoums = () => {
    return [
        {
            accessorKey: 'name',
            header: <div>운영 기관 명</div>,
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
            header: <div>필수 자료 제출</div>,
            cell: cellHelper(({ rowData }) => {
                /** TODO: 상태값 DB에도 적용 완료되면 주석 해제 후 tempSubmitFilesStatus 제거 */
                // const { submitFileStatus } = rowData;
                const tempSubmitFilesStatus = 'NOT_SUBMITTED';
                const Icon = STATUS_TEXT[tempSubmitFilesStatus].icon;

                return (
                    <span
                        size="sm"
                        className={`text-${STATUS_TEXT[tempSubmitFilesStatus].color}`}
                    >
                        {tempSubmitFilesStatus === 'NOT_SUBMITTED' && (
                            <Icon className="mr-2" />
                        )}
                        {STATUS_TEXT[tempSubmitFilesStatus].text}
                    </span>
                );
            }),
            maxSize: 159,
            enableSorting: true,
        },
        {
            accessorKey: 'student',
            header: '',
            cell: cellHelper(({ rowData }) => {
                const { submitFileStatus } = rowData;

                return (
                    <Button
                        color="link"
                        onClick={() => alert(rowData.id)}
                        disabled={submitFileStatus === 'NOT_SUBMITTED'}
                    >
                        필수 자료 확인
                    </Button>
                );
            }),
            size: 151,
        },
        {
            accessorKey: 'programCount',
            header: '',
            cell: cellHelper(({ value: programCount, rowData }) => {
                const { submitFileStatus } = rowData;

                if (submitFileStatus === 'NOT_SUBMITTED') {
                    return <></>;
                }

                return (
                    <Button
                        color="link"
                        onClick={() => alert(programCount)}
                        iconSide={'right'}
                        icon={<ChevronRightIcon />}
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
