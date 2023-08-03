import { useRouter } from 'next/router';

import EmptyTableCard, {
    EMPTY_IMAGE_TYPE,
} from '@/components/EmptyTableCard/EmptyTableCard';
import Pagination from '@/components/Pagination';

import { useGetPrograms } from '@/query-hooks/usePrograms';
import { PROGRAMS_DEFAULT_QUERY } from '@/pages';

import ProgramsCard from '../ProgramsCard';

import styles from './ProgramsCards.module.scss';

function ProgramsCards({
    campType,
    selectedLocations,
    checkedCategories,
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
        operateLocation: selectedLocations,
        category: checkedCategories,
        search: searchValue,
        institutionId,
        active: isCheckPossibleApply,
    });

    if (total === 0)
        return (
            <EmptyTableCard
                text="검색 결과가 없습니다."
                imageSrc={EMPTY_IMAGE_TYPE.SEARCH}
            />
        );
    return (
        <div>
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
                            thumbnailUrl={thumbnail.url}
                            thumbnailName={thumbnail.filename}
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
        </div>
    );
}

export default ProgramsCards;
