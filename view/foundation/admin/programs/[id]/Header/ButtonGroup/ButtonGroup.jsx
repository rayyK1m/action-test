import { useRouter } from 'next/router';
import styles from './ButtonGroup.module.scss';
import { useChangeProgramReviewStatus } from '@/query-hooks/usePrograms';
import { Button } from '@goorm-dev/gds-components';
import { CheckCircleIcon } from '@goorm-dev/gds-icons';
import { PROGRAM_REVIEW_STATUS } from '@/constants/db';

function ButtonGroup() {
    const router = useRouter();
    const changeProgramReviewStatus = useChangeProgramReviewStatus();

    /**
     * @param {Parameters<ReturnType<useChangeProgramReviewStatus>['mutate']>[0]['status']} status
     */
    const changeStatus = (status) => () => {
        changeProgramReviewStatus.mutate({
            programId: router.query.id,
            status,
        });
    };

    return (
        <div className={styles.container}>
            <Button
                size="lg"
                color="danger"
                onClick={changeStatus(PROGRAM_REVIEW_STATUS.거절.key)}
            >
                거절하기
            </Button>
            <Button
                size="lg"
                color="success"
                icon={<CheckCircleIcon />}
                onClick={changeStatus(PROGRAM_REVIEW_STATUS.승인.key)}
            >
                승인하기
            </Button>
        </div>
    );
}

export default ButtonGroup;
