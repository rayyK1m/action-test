import CampTableButtons from '../CampTableButtons';
import StatusText from '../StatusText';

import { PROGRAM_DIVISION, ROLE } from '@/constants/db';

export const TABLE_HEADER = (division, role) =>
    [
        {
            accessorKey: 'classNumberStr',
            header: '분반',
            cell: (data) => data.getValue(),
            size: 92,
            enableSorting: true,
        },
        {
            accessorKey: 'classroom',
            header: '교육 장소',
            cell: (data) => data.getValue(),
            size: 285,
            enableSorting: true,
        },
        {
            accessorKey: 'classStatus',
            header: '교육 진행',
            cell: (data) => data.getValue(),
            size: 116,
        },
        {
            accessorKey: 'inputCompleted',
            header: '정보 입력・학생 선택',
            cell: (data) => data.getValue(),
            size: 164,
        },
        {
            accessorKey: 'submitPreFileReport',
            header: '사전 자료',
            cell: (data) => data.getValue(),
            size: 116,
        },
        {
            accessorKey: 'submitPostFileReport',
            header: '종료 자료',
            cell: (data) => data.getValue(),
            size: 116,
        },
        {
            accessorKey: 'submitPostReport',
            header: '결과 보고',
            cell: (data) => data.getValue(),
            size: 116,
        },
        {
            accessorKey: 'buttons',
            header: '',
            cell: (data) => data.getValue(),
            /** 기관 admin에서는 "더보기" 버튼이 추가되어, 더 긴 size가 필요하다. */
            size: role === ROLE.INSTITUTION ? 304 : 262,
        },
    ].filter(
        ({ accessorKey }) =>
            division !== PROGRAM_DIVISION.방문형 ||
            accessorKey !== 'inputCompleted',
    );

export const TABLE_DATA = ({ items, onClickMoreButton }) =>
    items.map((item) => ({
        ...item,
        classroom: <p className="text-truncate">{item.classroom}</p>,
        inputCompleted: (
            <StatusText
                type="완료 여부"
                status={item.inputCompleted ? '완료' : '미완료'}
            />
        ),
        submitPreFileReport: (
            <StatusText
                type="제출 여부"
                status={item.submitPreFileReport ? '제출' : '미제출'}
            />
        ),
        submitPostFileReport: (
            <StatusText
                type="제출 여부"
                status={item.submitPostFileReport ? '제출' : '미제출'}
            />
        ),
        submitPostReport: (
            <StatusText
                type="제출 여부"
                status={item.submitPostReport ? '제출' : '미제출'}
            />
        ),
        classStatus: (
            <StatusText type="교육 진행 여부" status={item.classStatus} />
        ),
        buttons: (
            <CampTableButtons
                campId={item.id}
                classNumberStr={item.classNumberStr}
                channelUrl={item.channelUrl}
                onClickDropdownItem={onClickMoreButton}
            />
        ),
    }));

export const DELETE_TYPE = {
    캠프_다중_삭제: 'mutiple-delete',
    캠프_단일_삭제: 'single-delete',
};
