import { useGetInstitutions } from '@/query-hooks/useInstitutions';
import { INSTITUTIONS_DEFAULT_QUERY } from '@/pages/institutions';

function InstitutionsCount({ isCheckPossibleApply, searchValue, page }) {
    /**
     * [query-hooks] 운영기관 리스트 탐색
     */
    const {
        data: { total },
    } = useGetInstitutions({
        ...INSTITUTIONS_DEFAULT_QUERY,
        search: searchValue,
        page,
        active: isCheckPossibleApply,
    });

    return (
        <>
            <h6 className="text-dark">전체 운영 기관</h6>
            <h6 className="text-primary ml-1">{total}</h6>
        </>
    );
}

export default InstitutionsCount;
