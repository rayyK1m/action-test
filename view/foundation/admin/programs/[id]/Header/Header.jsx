import { useRouter } from 'next/router';
import BackButton from './BackButton';
import ButtonGroup from './ButtonGroup';

import styles from './Header.module.scss';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import ProgramInfo from './ProgramInfo';
import { PROGRAM_REVIEW_STATUS } from '@/constants/db';

function Header() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    return (
        <div className={styles.container}>
            <BackButton />
            {program.reviewStatus === PROGRAM_REVIEW_STATUS.심사중.key && (
                <ButtonGroup />
            )}
            {(program.reviewStatus === PROGRAM_REVIEW_STATUS.승인됨.key ||
                program.reviewStatus === PROGRAM_REVIEW_STATUS.거절됨.key) && (
                <ProgramInfo />
            )}
        </div>
    );
}

export default Header;
