import Link from 'next/link';

import { cellHelper } from '@goorm-dev/gds-tables';
import { Button, Tooltip } from '@goorm-dev/gds-components';

import { PROGRAM_DIVISION } from '@/constants/db';
import {
    ellipsisedString,
    formatPhoneNumber,
    getTargetGroupString,
} from '@/utils';
import { CAMP_TICKET_STATUS_TEXT } from './ApplicantTable.constants';
import useHover from '@/hooks/useHover';

import styles from './ApplicantTable.module.scss';
import useToggle from '@/hooks/useToggle';
import ApplicantTicketInfoPannel from '../ApplicantTicketInfoPannel/ApplicantTicketInfoPannel';

export const getTableColoums = (division) => {
    const baseColumns = [
        {
            accessorKey: 'userName',
            header: <div>신청자 명</div>,
            cell: cellHelper(({ value }) => {
                const [nameRef, isHover] = useHover();
                const needEllipsis = value.length > 5;
                return (
                    <>
                        <div className="d-flex" ref={nameRef}>
                            {ellipsisedString(value, 8)}
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
                            className={styles.targetGroupTooltip}
                        >
                            {targetString}
                        </Tooltip>
                    </>
                );
            }),
            size: 168,
            maxSize: 248,
        },
    ];
    const 방문형 = [
        {
            accessorKey: 'schoolName',
            header: <div>교육 장소</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 340,
            maxSize: 500,
        },
        {
            accessorKey: 'applicantCount',
            header: <div>신청 인원</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 129,
        },
        {
            accessorKey: 'reviewStatus',
            header: <div>승인 상태</div>,
            cell: (info) => {
                const status = info.getValue();
                const Icon = CAMP_TICKET_STATUS_TEXT[status].icon;
                return (
                    <div
                        className={`d-flex align-items-center text-${CAMP_TICKET_STATUS_TEXT[status].color}`}
                    >
                        <Icon className="mr-2" />
                        {CAMP_TICKET_STATUS_TEXT[status].text}
                    </div>
                );
            },
            size: 119,
            enableSorting: true,
        },
        {
            accessorKey: 'viewDetail',
            header: <></>,
            cell: cellHelper(({ rowData }) => {
                const [isOpen, toggle] = useToggle(false);
                return (
                    <>
                        <Button color="link" onClick={toggle}>
                            신청 정보 확인
                        </Button>
                        <ApplicantTicketInfoPannel
                            isOpen={isOpen}
                            onClose={() => toggle(false)}
                            ticketId={rowData.id}
                            title="신청자 관리"
                        />
                    </>
                );
            }),
            size: 151,
        },
    ];
    const 집합형 = [
        {
            accessorKey: 'schoolName',
            header: <div>소속 학교</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 340,
            maxSize: 500,
        },
        {
            accessorKey: 'phoneNumber',
            header: <div>연락처</div>,
            cell: cellHelper(({ value }) => (
                <div>{formatPhoneNumber(value)}</div>
            )),
            size: 140,
        },
        {
            accessorKey: 'reviewStatus',
            header: <div>승인 상태</div>,
            cell: (info) => {
                const status = info.getValue();
                const Icon = CAMP_TICKET_STATUS_TEXT[status].icon;
                return (
                    <div
                        className={`d-flex align-items-center text-${CAMP_TICKET_STATUS_TEXT[status].color}`}
                    >
                        <Icon className="mr-2" />
                        {CAMP_TICKET_STATUS_TEXT[status].text}
                    </div>
                );
            },
            size: 119,
            enableSorting: true,
        },
        {
            accessorKey: 'viewDetail',
            header: <></>,
            cell: cellHelper(({ rowData }) => {
                const [isOpen, toggle] = useToggle(false);
                return (
                    <>
                        <Button color="link" onClick={toggle}>
                            신청 정보 확인
                        </Button>
                        <ApplicantTicketInfoPannel
                            isOpen={isOpen}
                            onClose={() => toggle(false)}
                            ticketId={rowData.id}
                            title="신청자 관리"
                        />
                    </>
                );
            }),
            size: 151,
            minSize: 151,
        },
    ];

    if (division === PROGRAM_DIVISION.방문형) {
        return [...baseColumns, ...방문형];
    }
    return [...baseColumns, ...집합형];
};
