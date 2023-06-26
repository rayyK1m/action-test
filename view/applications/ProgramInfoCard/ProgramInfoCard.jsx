import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import { Alert } from '@goorm-dev/gds-components';

import { formatDate } from '@/utils';

import styles from './ProgramInfoCard.module.scss';

function ProgramInfoCard({ program }) {
    const {
        title,
        applyDate,
        educationDate,
        learningTime,
        educationLocation,
        price,
        notice,
    } = program;

    const formattedCost = price === 0 ? '무료' : `${price}원`;

    return (
        <>
            <div className={styles.info}>
                <h3 className="mb-0">{title}</h3>
                <ul className={styles.infoList}>
                    <li>{`신청 기간 : ${formatDate(
                        applyDate.start,
                    )} ~ ${formatDate(applyDate.end)}`}</li>
                    <li>{`교육 기간 : ${formatDate(
                        educationDate.start,
                    )} ~ ${formatDate(educationDate.end)}`}</li>
                    <li>{`총 교육 시간 : ${learningTime}시간`} </li>
                    <li>{`교육 장소 : ${educationLocation}`}</li>
                    <li>{`비용 : ${formattedCost}`} </li>
                </ul>
            </div>
            <Alert
                className={styles.notice}
                leftIcon={NoticeCircleIcon}
                color="dark"
            >
                {notice}
            </Alert>
        </>
    );
}

export default ProgramInfoCard;
