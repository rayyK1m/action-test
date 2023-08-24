import Pagination from '@/components/Pagination';
import EmptyTableCard, {
    EMPTY_IMAGE_TYPE,
} from '@/components/EmptyTableCard/EmptyTableCard';

import { useGetInstitutions } from '@/query-hooks/useInstitutions';
import { INSTITUTIONS_DEFAULT_QUERY } from '@/pages/institutions';

import InstitutionCard from '../InstitutionCard';

import styles from './InstitutionCards.module.scss';

function InstitutionCards({
    isCheckPossibleApply,
    page,
    setPage,
    searchValue,
}) {
    /** [query-hooks] 운영기관 리스트 탐색 */
    const {
        data: { items, total },
    } = useGetInstitutions({
        ...INSTITUTIONS_DEFAULT_QUERY,
        search: searchValue,
        page,
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
        <>
            <div className={styles.container}>
                {items.map(({ id, logo, name, programCount }) => (
                    <InstitutionCard
                        key={id}
                        logoUrl={logo?.url}
                        name={name}
                        programCount={programCount}
                        institutionId={id}
                    />
                ))}
            </div>
            <Pagination
                itemLimit={INSTITUTIONS_DEFAULT_QUERY.limit}
                itemTotalCount={total}
                page={page}
                onPageChangeHandler={(page) => setPage(page * 1)}
            />
        </>
    );
}

export default InstitutionCards;
