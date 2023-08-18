import { useGetInstitutionAdmin } from '@/query-hooks/useInstitutions';
import { Dropdown, DropdownToggle } from '@goorm-dev/gds-components';
import { PlusIcon } from '@goorm-dev/gds-icons';
import CustomDropdownMenu from '@/components/CustomDropdownMenu';
import Link from 'next/link';
import CustomDropdownItem from '@/components/CustomDropdownItem';
import useToggle from '@/hooks/useToggle';

import styles from './RegistNewProgramButton.module.scss';
import { PROGRAM_DIVISION, REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import useSession from '@/query-hooks/useSession';

function RegistNewProgramButton() {
    const { data: userData } = useSession.GET();
    const [isOpenDropdown, toggleDropdown] = useToggle();
    const { data: instituionAdmin } = useGetInstitutionAdmin(
        userData.institutionId,
    );

    const {
        reports: { reviewStatus },
    } = instituionAdmin;

    const isDisabled = false;
    /** NOTE
     * 기존에는 원래 필수 자료 승인 이후에 프로그램 등록이 가능하지만,
     * 현재 8/21일 오픈과 동시에 바로 기관이 프로그램 등록을 할 수 있어야 하는 이슈로 인해 프로그램 관리는 항상 abled 상태로 사용
     *
     * revert할 PR 링크
     * https://github.com/goorm-dev/swcamp-site/pull/78
     */
    // !(
    //     reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key ||
    //     reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key ||
    //     reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.승인.key
    // );

    return (
        <Dropdown isOpen={isOpenDropdown} toggle={toggleDropdown}>
            <DropdownToggle
                size="lg"
                color="primary"
                disabled={isDisabled}
                className="d-flex align-items-center"
            >
                <PlusIcon className="mr-2" />새 프로그램 등록하기
            </DropdownToggle>
            <CustomDropdownMenu className="w-100" right>
                <Link
                    href={{
                        pathname: '/institution/admin/program/new',
                        query: {
                            type: PROGRAM_DIVISION.방문형,
                        },
                    }}
                >
                    <CustomDropdownItem>
                        {PROGRAM_DIVISION.방문형}
                    </CustomDropdownItem>
                </Link>
                <Link
                    href={{
                        pathname: '/institution/admin/program/new',
                        query: {
                            type: PROGRAM_DIVISION.집합형,
                        },
                    }}
                >
                    <CustomDropdownItem>
                        {PROGRAM_DIVISION.집합형}
                    </CustomDropdownItem>
                </Link>
            </CustomDropdownMenu>
        </Dropdown>
    );
}

export default RegistNewProgramButton;
