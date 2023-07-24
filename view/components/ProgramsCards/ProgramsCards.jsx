import { useRouter } from 'next/router';

import EmptyTableCard from '@/components/EmptyTableCard/EmptyTableCard';
import Pagination from '@/components/Pagination';

import { useGetPrograms } from '@/query-hooks/usePrograms';
import { PROGRAMS_DEFAULT_QUERY } from '@/pages';

import ProgramsCard from '../ProgramsCard';

import { DROP_DOWNS } from '../ProgramsContainer/ProgramsContainer.constants';

import styles from './ProgramsCards.module.scss';

function ProgramsCards({
    campType,
    filterList,
    searchValue,
    page,
    setPage,
    isCheckPossibleApply,
}) {
    const {
        query: { institutionId },
    } = useRouter();

    /** [query hooks] 프로그램 리스트 조회 */
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
        active: isCheckPossibleApply,
    });

    if (total === 0)
        return <EmptyTableCard text="검색 결과가 없습니다." type="NO_SEARCH" />;
    return (
        <>
            <div className={styles.container}>
                {items.map(
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
                            id={id}
                            name={name}
                            thumbnail={thumbnail}
                            applyType={applyStatus}
                            applyDate={applyDate}
                            educationDate={educationDate}
                        />
                    ),
                )}
            </div>

            <Pagination
                itemLimit={PROGRAMS_DEFAULT_QUERY.limit}
                itemTotalCount={total}
                page={page}
                onPageChangeHandler={(page) => setPage(page * 1)}
            />
        </>
    );
}

export default ProgramsCards;
