import { useRouter } from 'next/router';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import styles from './ProgramInfo.module.scss';
import { Badge } from '@goorm-dev/gds-components';
import {
    CheckCircleIcon,
    ChevronRightIcon,
    ErrorCircleIcon,
} from '@goorm-dev/gds-icons';

function ProgramInfo() {
    const router = useRouter();
    const { data: program } = useGetProgramAdmin(router.query.id);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.item}>
                    <span>신청자</span> <b>{program.campTicketCount}명</b>
                    <ChevronRightIcon />
                </div>
                <div className={styles.divider} />
                <div className={styles.item}>
                    <span>캠프</span> <b>{program.campCount}개</b>
                    <ChevronRightIcon />
                </div>
            </div>
            {program.reviewStatus === 'APPROVE' && (
                <Badge size="lg" color="success" leftIcon={CheckCircleIcon}>
                    승인됨
                </Badge>
            )}
            {program.reviewStatus === 'REJECT' && (
                <Badge
                    size="lg"
                    /** color link 없어서 커스텀함 */
                    color="link"
                    className={styles.badge_link}
                    leftIcon={ErrorCircleIcon}
                >
                    거절됨
                </Badge>
            )}
        </div>
    );
}

export default ProgramInfo;
