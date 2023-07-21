import { Checkbox } from '@goorm-dev/gds-components';

function ProgramsCountAndApplyableCheckboxLoading() {
    return (
        <ul className="d-flex justify-content-between align-items-center">
            <li className="d-flex">
                <h6 className="text-dark">전체 프로그램</h6>
                <h6 className="text-primary ml-1">-</h6>
            </li>
            <li className="d-flex">
                <Checkbox disabled />
                <p className="text-gray-400">신청 가능한 프로그램 보기</p>
            </li>
        </ul>
    );
}

export default ProgramsCountAndApplyableCheckboxLoading;
