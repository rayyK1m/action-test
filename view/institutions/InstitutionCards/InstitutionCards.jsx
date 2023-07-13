import Pagination from '@/components/Pagination';
import useInstitutions from '@/query-hooks/useInstitutions';
import { INSTITUTIONS_DEFAULT_QUERY } from '@/pages/institutions';

import InstitutionCard from '../InstitutionCard';

import styles from './InstitutionCards.module.scss';

function InstitutionCards({
    isCheckPossibleApply,
    page,
    setPage,
    searchValue,
}) {
    /**
     * [query-hooks] 운영기관 리스트 탐색
     */
    const {
        data: { items, total },
    } = useInstitutions.GET({
        ...INSTITUTIONS_DEFAULT_QUERY,
        search: searchValue,
        page,
        active: isCheckPossibleApply,
    });

    console.log(items);

    return (
        <>
            <div className={styles.container}>
                {items.map(({ index, logo, name, programCount }) => (
                    <InstitutionCard
                        key={index}
                        logo={logo}
                        name={name}
                        programCount={programCount}
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
