import { useRouter } from 'next/router';

import { Checkbox } from '@goorm-dev/gds-components';

import { useGetPrograms } from '@/query-hooks/usePrograms';

import { PROGRAMS_DEFAULT_QUERY } from '@/pages';
import { DROP_DOWNS } from '../ProgramsContainer/ProgramsContainer.constants';

function ProgramsCountAndApplyableCheckbox({
    campType,
    page,
    filterList,
    searchValue,
    isCheckPossibleApply,
    setIsCheckPossibleApply,
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
        <ul className="d-flex justify-content-between align-items-center">
            <li className="d-flex">
                <h6 className="text-dark">전체 프로그램</h6>
                <h6 className="text-primary ml-1">{total}</h6>
            </li>
            <li className="d-flex">
                <Checkbox
                    value={isCheckPossibleApply}
                    onChange={() => setIsCheckPossibleApply((prev) => !prev)}
                />
                <p>신청 가능한 프로그램 보기</p>
            </li>
        </ul>
    );
}

export default ProgramsCountAndApplyableCheckbox;
