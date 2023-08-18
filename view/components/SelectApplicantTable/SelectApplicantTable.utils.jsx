import { cellHelper } from '@goorm-dev/gds-tables';
import { Button, Tooltip } from '@goorm-dev/gds-components';

import { getTargetGroupString, ellipsisedString } from '@/utils';

import useHover from '@/hooks/useHover';
import useToggle from '@/hooks/useToggle';

import styles from './SelectApplicantTable.module.scss';
import ApplicantTicketInfoPannel from '@/view/institution/admin/program/[id]/applicant/ApplicantTicketInfoPannel/ApplicantTicketInfoPannel';
import { useRouter } from 'next/router';

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
                const needEllipsis = targetString.length > 15;

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
                            isOpen={needEllipsis && isHover}
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
            cell: cellHelper(({ rowData }) => {
                const [isOpen, toggle] = useToggle(false);
                const router = useRouter();
                const isCampPage = !!router.query.campTabId;
                return (
                    <>
                        <Button color="link" onClick={toggle}>
                            신청 정보 확인
                        </Button>
                        <ApplicantTicketInfoPannel
                            isOpen={isOpen}
                            onClose={() => toggle(false)}
                            ticketId={rowData.id}
                            title={
                                isCampPage ? '참가자 추가하기' : '캠프 생성하기'
                            }
                        />
                    </>
                );
            }),
            size: 154,
            minSize: 154,
        },
    ];
};
