import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

import { formatDate } from '@/utils';

import styles from './ProgramInfoCard.module.scss';

function ProgramInfoCard({ program, notice }) {
    return (
        <>
            <div className={styles.info}>
                <h3 className="mb-0">{program?.name}</h3>
                <ul className={styles.infoList}>
                    <li>{`신청 기간 : ${formatDate(
                        program?.applyDate.start,
                    )} ~ ${formatDate(program?.applyDate.end)}`}</li>
                    <li>{`교육 기간 : ${formatDate(
                        program?.educationDate.start,
                    )} ~ ${formatDate(program?.educationDate.end)}`}</li>
                    <li>
                        {`총 교육 차시 : ${program?.learningTime}차시(${program?.type.duration})`}{' '}
                    </li>
                    {program?.educationLocation && (
                        <li>{`교육 장소 : ${program?.educationLocation.name}`}</li>
                    )}
                </ul>
            </div>
            <CustomAlert className={styles.notice} leftIcon={NoticeCircleIcon}>
                {notice}
            </CustomAlert>
        </>
    );
}

export default ProgramInfoCard;
