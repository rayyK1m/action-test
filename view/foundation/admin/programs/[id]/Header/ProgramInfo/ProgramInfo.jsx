import { useRouter } from 'next/router';
import { useGetProgramAdmin } from '@/query-hooks/usePrograms';

import styles from './ProgramInfo.module.scss';
import { Badge } from '@goorm-dev/gds-components';
import {
    CheckCircleIcon,
    ChevronRightIcon,
    ErrorCircleIcon,
} from '@goorm-dev/gds-icons';
import { PROGRAM_REVIEW_STATUS } from '@/constants/db';
import Link from 'next/link';

function ProgramInfo() {
    const router = useRouter();
    const { id: programId } = router.query;
    const { data: program } = useGetProgramAdmin(programId);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link
                    className={styles.item}
                    href={`/foundation/admin/programs/${programId}/applicant`}
                >
                    <span>신청자</span> <b>{program.campTicketCount}명</b>
                    <ChevronRightIcon />
                </Link>
                <div className={styles.divider} />
                <Link
                    className={styles.item}
                    href={`/foundation/admin/programs/${programId}/camps?page=1&limit=10&sort=-createdAt&division=방문형&institutionId=inst1`}
                >
                    <span>캠프</span> <b>{program.campCount}개</b>
                    <ChevronRightIcon />
                </Link>
            </div>
            {program.reviewStatus === PROGRAM_REVIEW_STATUS.승인.key && (
                <Badge size="lg" color="success" leftIcon={CheckCircleIcon}>
                    승인됨
                </Badge>
            )}
            {program.reviewStatus === PROGRAM_REVIEW_STATUS.거절.key && (
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
