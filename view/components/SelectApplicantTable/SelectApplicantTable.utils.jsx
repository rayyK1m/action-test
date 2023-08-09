import { cellHelper } from '@goorm-dev/gds-tables';
import { Button, Tooltip } from '@goorm-dev/gds-components';

import { getTargetGroupString, ellipsisedString } from '@/utils';

import useHover from '@/hooks/useHover';

import styles from './SelectApplicantTable.module.scss';

export const getTableColums = () => {
    return [
        {
            accessorKey: 'userName',
            header: <div>이름</div>,
            cell: cellHelper(({ value }) => {
                const [nameRef, isHover] = useHover();
                const needEllipsis = value.length > 5;
                return (
                    <>
                        <div className="d-flex" ref={nameRef}>
                            {ellipsisedString(value, 5)}
                        </div>
                        <Tooltip
                            target={nameRef}
                            isOpen={needEllipsis && isHover}
                            placement="bottom-start"
                        >
                            {value}
                        </Tooltip>
                    </>
                );
            }),
            size: 119,
            maxSize: 119,
            enableSorting: true,
        },
        {
            accessorKey: 'operateLocation',
            header: <div>신청 지역</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 139,
        },
        {
            accessorKey: 'targetGroup',
            header: <div>신청 대상</div>,
            cell: cellHelper(({ value }) => {
                const { elementarySchool, middleSchool, highSchool } = value;
                const [targetGroupRef, isHover] = useHover();
                const targetString = getTargetGroupString(
                    elementarySchool,
                    middleSchool,
                    highSchool,
                );
                return (
                    <>
                        <div
                            className={styles.targetGroup}
                            ref={targetGroupRef}
                        >
                            {targetString}
                        </div>
                        <Tooltip
                            target={targetGroupRef}
                            isOpen={isHover}
                            placement="bottom-start"
                        >
                            {targetString}
                        </Tooltip>
                    </>
                );
            }),
            size: 168,
            maxSize: 248,
        },
        {
            accessorKey: 'schoolName',
            header: <div>소속 학교</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 310,
            maxSize: 450,
            enableSorting: true,
        },
        {
            accessorKey: 'phoneNumber',
            header: <div>연락처</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 145,
        },
        {
            accessorKey: 'viewDetail',
            header: <></>,
            cell: () => <Button color="link">신청 정보 확인</Button>,
            size: 154,
            minSize: 154,
        },
    ];
};