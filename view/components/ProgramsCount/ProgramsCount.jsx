import { useRouter } from 'next/router';

import { useGetPrograms } from '@/query-hooks/usePrograms';

import { PROGRAMS_DEFAULT_QUERY } from '@/pages';
import { DROP_DOWNS } from '../ProgramsContainer/ProgramsContainer.constants';

function ProgramsCount({
    campType,
    page,
    filterList,
    searchValue,
    isCheckPossibleApply,
}) {
    const {
        query: { institutionId },
    } = useRouter();

    /** [query hooks] 프로그램 리스트 total 조회 */
    const {
        data: { total },
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

    return (
        <>
            <h6 className="text-dark">전체 프로그램</h6>
            <h6 className="text-primary ml-1">{total}</h6>
        </>
    );
}

export default ProgramsCount;
