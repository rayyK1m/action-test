import cn from 'classnames';

import { UncontrolledTooltip } from '@goorm-dev/gds-components';

import ProgramTypeBadge from '@/view/components/ProgramTypeBadge';
import { ellipsisedString } from '@/utils';

import CampTableButtons from '../CampTableButtons';
import StatusText from '../StatusText';

import styles from './CampManageContainer.module.scss';

import { ROLE, PROGRAM_DIVISION } from '@/constants/db';

export const getCampsBreadcrumbs = (program, role) => {
    const {
        id: programId,
        name,
        type: { division, duration },
    } = program;

    return [
        {
            children: '프로그램 관리',
            to:
                role === ROLE.INSTITUTION
                    ? '/institution/admin'
                    : '/foundation/admin/programs',
        },
        {
            children: (
                <>
                    <span>{ellipsisedString(name, 20)}</span>
                    <ProgramTypeBadge
                        className="ml-1"
                        division={division}
                        duration={duration}
                    />
                </>
            ),
            to:
                role === ROLE.INSTITUTION
                    ? `/institution/admin/program/${programId}`
                    : `/foundation/admin/programs/${programId}`,
        },
        {
            children: '캠프 관리',
            active: true,
        },
    ];
};

export const getTableHeader = (division, role) =>
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

export const getTableData = ({
    items,
    onClickMoreButton,
    classRoomRef = [],
    isShowTooltips,
}) => {
    return items.map((item, index) => ({
        ...item,
        classroom: (
            <>
                {isShowTooltips[index]?.isShow && (
                    <UncontrolledTooltip target={`tooltip-${index}`}>
                        {item.classroom}
                    </UncontrolledTooltip>
                )}

                <p
                    id={`tooltip-${index}`}
                    ref={(el) => (classRoomRef.current[index] = el)}
                    className={cn(
                        'text-truncate',
                        isShowTooltips[index]?.isShow && styles.pointerCursor,
                    )}
                >
                    {item.classroom}
                </p>
            </>
        ),
        inputCompleted: (
            <>
                {!item.inputCompleted && (
                    <UncontrolledTooltip target="input-unfinished">
                        캠프 정보 입력·학생 선택이 최종 완료되지 않은
                        상태입니다. 캠프 상세를 클릭하여 확인해 주세요.
                    </UncontrolledTooltip>
                )}
                <div id="input-unfinished" className={styles.pointerCursor}>
                    <StatusText
                        type="완료 여부"
                        status={item.inputCompleted ? '완료' : '미완료'}
                    />
                </div>
            </>
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
};
