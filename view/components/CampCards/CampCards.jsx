import { useState, useMemo } from 'react';

import { Checkbox, BasicPagination } from '@goorm-dev/gds-components';

import usePrograms from '@/query-hooks/usePrograms';
import { PROGRAMS_DEFAULT_QUERY } from '@/pages';
import { PAGINATION_LIMI_COUNT } from '@/constants/common';

import CampCardsEmpty from './CampCards.empty';
import CampCard from '../CampCard';

import { APPLY_STATUS } from './CampCards.constants';
import { DROP_DOWNS } from '../ProgramsContainer/ProgramsContainer.constants';

import styles from './CampCards.module.scss';

const getApplyStatus = (start, end) => [
    {
        condition: new Date() < start,
        type: APPLY_STATUS.UPCOMING,
    },
    {
        condition: start <= new Date() && end >= new Date(),
        type: APPLY_STATUS.IN_PROGRESS,
    },
    {
        condition: new Date() > end,
        type: APPLY_STATUS.CLOSED,
    },
];

function CampCards({ campType, filterList, searchValue, page, setPage }) {
    /** query-hooks 포르그램 리스트 탐색 */
    const {
        data: { items: programList, total: totalProgramCount },
    } = usePrograms.GET({
        ...PROGRAMS_DEFAULT_QUERY,
        campType,
        page,
        operateLocation: filterList[DROP_DOWNS.LOCATIONS],
        category: filterList[DROP_DOWNS.CATEGORIES],
        search: searchValue,
    });

    /** 신청 가능한 프로그램 체크 여부 */
    const [isCheckPossibleApply, setIsCheckPossibleApply] = useState(false);

    /**
     * 프로그램 모집 상태 정보가 포함된 program 리스트
     * @param {Object} extendedProgramList
     * @param {Object} extendedProgramList.applyStatus - 프로그램 모집 상태에 대한 정보
     * @param {type} applyStatus.type - 프로그램 모집 상태
     * @param {type} applyStatus.isPossibleApply - '모집중', '모집예정'만 true
     */
    const extendedProgramList = useMemo(
        () =>
            programList.map((programInfo) => {
                const {
                    applyDate: { start, end },
                } = programInfo;

                const { type } = getApplyStatus(
                    new Date(start),
                    new Date(end),
                ).find((entry) => entry.condition);

                return {
                    ...programInfo,
                    applyStatus: {
                        type,
                        isPossibleApply:
                            type === APPLY_STATUS.UPCOMING ||
                            type === APPLY_STATUS.IN_PROGRESS,
                    },
                };
            }),
        [programList],
    );

    if (totalProgramCount === 0) return <CampCardsEmpty />;
    return (
        <>
            <div className="mb-4">
                <ul className="d-flex justify-content-between align-items-center">
                    <li className="d-flex">
                        <h6 className="text-dark">전체 프로그램</h6>
                        <h6 className="text-primary ml-1">
                            {totalProgramCount}
                        </h6>
                    </li>
                    <li className="d-flex">
                        <Checkbox
                            value={isCheckPossibleApply}
                            onChange={() =>
                                setIsCheckPossibleApply((prev) => !prev)
                            }
                        />
                        <p>신청 가능한 프로그램 보기</p>
                    </li>
                </ul>
            </div>

            <div className={styles.campCardContainer}>
                {extendedProgramList
                    /**
                     * 필터링: 신청 가능 vs 신청 불가능
                     */
                    .filter(({ applyStatus }) =>
                        isCheckPossibleApply
                            ? applyStatus.isPossibleApply
                            : true,
                    )
                    .map(
                        ({
                            id,
                            name,
                            thumbnail,
                            applyStatus,
                            applyDate,
                            educationDate,
                        }) => (
                            <CampCard
                                key={id}
                                name={name}
                                thumbnail={thumbnail}
                                applyType={applyStatus.type}
                                applyDate={applyDate}
                                educationDate={educationDate}
                            />
                        ),
                    )}
            </div>
            {totalProgramCount > PROGRAMS_DEFAULT_QUERY.limit && (
                <BasicPagination
                    size="md"
                    scrollMove={false}
                    page={page}
                    pageCount={Math.ceil(
                        totalProgramCount / PROGRAMS_DEFAULT_QUERY.limit,
                    )}
                    limitCount={PAGINATION_LIMI_COUNT}
                    className="justify-content-center"
                    onPageChangeHandler={(page) => setPage(page * 1)}
                />
            )}
        </>
    );
}

export default CampCards;
