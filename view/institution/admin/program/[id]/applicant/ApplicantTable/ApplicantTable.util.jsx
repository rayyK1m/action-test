import Link from 'next/link';

import { cellHelper } from '@goorm-dev/gds-tables';
import { Button, Tooltip } from '@goorm-dev/gds-components';

import { PROGRAM_DIVISION } from '@/constants/db';
import { CAMP_TICKET_STATUS_TEXT } from './ApplicantTable.constants';
import useHover from '@/hooks/useHover';

import styles from './ApplicantTable.module.scss';

const joinToGradeString = (target, joinUnit, prefix) => {
    const arrayWithGrade = target.map((grade) => `${grade}학년`);

    return prefix + arrayWithGrade.join(joinUnit);
};

export const getTableColoums = (division) => {
    const baseColumns = [
        {
            accessorKey: 'userName',
            header: <div>신청자 명</div>,
            cell: cellHelper(({ value }) => (
                <div className="d-flex">{value}</div>
            )),
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
                let targetString = '';
                if (elementarySchool.length > 0) {
                    targetString += joinToGradeString(
                        elementarySchool,
                        ', ',
                        '초등학생 ',
                    );
                }
                if (middleSchool.length > 0) {
                    targetString += joinToGradeString(
                        middleSchool,
                        ', ',
                        '\n중학생 ',
                    );
                }
                if (highSchool.length > 0) {
                    targetString += joinToGradeString(
                        highSchool,
                        ', ',
                        '\n고등학생 ',
                    );
                }
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
            cell: () => <Button color="link">신청 정보 보기</Button>,
            size: 151,
        },
    ];
    const 집합형 = [
        {
            accessorKey: 'schoolIndex',
            header: <div>소속 학교</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
            size: 340,
            maxSize: 500,
        },
        {
            accessorKey: 'phoneNumber',
            header: <div>연락처</div>,
            cell: cellHelper(({ value }) => <div>{value}</div>),
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
            cell: () => <Button color="link">신청 정보 보기</Button>,
            size: 151,
            minSize: 151,
        },
    ];

    if (division === PROGRAM_DIVISION.방문형) {
        return [...baseColumns, ...방문형];
    }
    return [...baseColumns, ...집합형];
};
