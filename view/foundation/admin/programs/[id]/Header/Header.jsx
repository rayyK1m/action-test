import { useRouter } from 'next/router';
import BackButton from './BackButton';
import ButtonGroup from './ButtonGroup';

import styles from './Header.module.scss';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';
import ProgramInfo from './ProgramInfo';

function Header() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    return (
        <div className={styles.container}>
            <BackButton />
            {program.reviewStatus === 'IN_PROGRESS' && <ButtonGroup />}
            {(program.reviewStatus === 'APPROVE' ||
                program.reviewStatus === 'REJECT') && <ProgramInfo />}
        </div>
    );
}

export default Header;
