import cn from 'classnames';
import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import CustomAlert from '@/components/CustomAlert/CustomAlert';

import { formatDate } from '@/utils';

import styles from './ProgramInfoCard.module.scss';
import { PROGRAM_DIVISION } from '@/constants/db';
import ProgramInfoCardLoading from './ProgramInfoCard.loading';

function ProgramInfoCard({ program, notice, className }) {
    const location =
        program?.type.division === PROGRAM_DIVISION.방문형
            ? '각 학교에서 진행'
            : program?.educationLocation?.name;
    return (
        <>
            <div className={cn(styles.info, className)}>
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
                    <li>{`교육 장소 : ${location}`}</li>
                </ul>
            </div>
            <CustomAlert className={styles.notice} leftIcon={NoticeCircleIcon}>
                {notice}
            </CustomAlert>
        </>
    );
}

ProgramInfoCard.Loading = ProgramInfoCardLoading;

export default ProgramInfoCard;
