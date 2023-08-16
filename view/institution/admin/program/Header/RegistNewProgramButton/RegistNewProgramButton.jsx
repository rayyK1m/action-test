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

    const isDisabled = !(
        reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key ||
        reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key ||
        reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.승인.key
    );

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
