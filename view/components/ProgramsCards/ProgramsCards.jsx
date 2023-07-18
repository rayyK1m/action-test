import { useState } from 'react';
import { useRouter } from 'next/router';

import { Checkbox, BasicPagination } from '@goorm-dev/gds-components';

import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';

import { useGetPrograms } from '@/query-hooks/usePrograms';
import { PROGRAMS_DEFAULT_QUERY } from '@/pages';
import { PAGINATION_LIMIT_COUNT } from '@/constants/common';

import ProgramsCard from '../ProgramsCard';

import { DROP_DOWNS } from '../ProgramsContainer/ProgramsContainer.constants';

import styles from './ProgramsCards.module.scss';

function ProgramsCards({ campType, filterList, searchValue, page, setPage }) {
    const {
        query: { institutionId },
    } = useRouter();

    /**
     * useGetPrograms (query hooks)
     * 프로그램 리스트 조회
     */
    const {
        data: { items, total },
    } = useGetPrograms({
        ...PROGRAMS_DEFAULT_QUERY,
        campType,
        page,
        operateLocation: filterList[DROP_DOWNS.LOCATIONS],
        category: filterList[DROP_DOWNS.CATEGORIES],
        search: searchValue,
        institutionId,
    });

    /** 신청 가능한 프로그램 체크 여부 */
    const [isCheckPossibleApply, setIsCheckPossibleApply] = useState(false);

    if (total === 0)
        return (
            <EmptyTableCard
                text="검색 결과가 없습니다."
                useBg
                type="NO_SEARCH"
            />
        );
    return (
        <>
            <div className="mb-4">
                <ul className="d-flex justify-content-between align-items-center">
                    <li className="d-flex">
                        <h6 className="text-dark">전체 프로그램</h6>
                        <h6 className="text-primary ml-1">{total}</h6>
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

            <div className={styles.container}>
                {items
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
                            <ProgramsCard
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
            {total > PROGRAMS_DEFAULT_QUERY.limit && (
                <BasicPagination
                    size="md"
                    scrollMove={false}
                    page={page}
                    pageCount={Math.ceil(total / PROGRAMS_DEFAULT_QUERY.limit)}
                    limitCount={PAGINATION_LIMIT_COUNT}
                    className="justify-content-center"
                    onPageChangeHandler={(page) => setPage(page * 1)}
                />
            )}
        </>
    );
}

export default ProgramsCards;
