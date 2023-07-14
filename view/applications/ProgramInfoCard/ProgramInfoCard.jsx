import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

import { formatDate } from '@/utils';

import styles from './ProgramInfoCard.module.scss';

function ProgramInfoCard({ program, notice }) {
    const {
        name,
        applyDate,
        educationDate,
        learningTime,
        type,
        educationLocation,
    } = program;

    return (
        <>
            <div className={styles.info}>
                <h3 className="mb-0">{name}</h3>
                <ul className={styles.infoList}>
                    <li>{`신청 기간 : ${formatDate(
                        applyDate.start,
                    )} ~ ${formatDate(applyDate.end)}`}</li>
                    <li>{`교육 기간 : ${formatDate(
                        educationDate.start,
                    )} ~ ${formatDate(educationDate.end)}`}</li>
                    <li>
                        {`총 교육 차시 : ${learningTime}차시(${type.duration})`}{' '}
                    </li>
                    <li>{`교육 장소 : ${educationLocation.name}`}</li>
                </ul>
            </div>
            <CustomAlert className={styles.notice} leftIcon={NoticeCircleIcon}>
                {notice}
            </CustomAlert>
        </>
    );
}

export default ProgramInfoCard;
