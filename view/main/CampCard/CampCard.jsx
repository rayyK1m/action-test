import Image from 'next/image';
import cn from 'classnames';

import styles from './CampCard.module.scss';

const DUMMY_IMAGE =
    'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png';

const DUMMY_TITLE =
    '프로그램 제목 최대 두줄 입니다. 두줄입니다. 프로그램 제목 최대 두줄 입니다. 프로그램 제목 최대 두줄 입니다. 두줄입니다. 프로그램 제목 최대 두줄 입니다.';
const DUMMY_DATE_APPLY = '06월 08일(목) 11:00 - 06월 18일(일) 20:00';
const DUMMY_DATE_EDUCATION = '06월 24일(토) 09:30 - 06월 25일(일) 16:00';

export default function CampCard() {
    return (
        <div className={styles.container}>
            <div
                className={cn(
                    styles.imageContainer,
                    'position-relative bg-gray-300 rounded mb-2',
                )}
            >
                <Image src={DUMMY_IMAGE} alt="캠프 썸네일" fill />
            </div>

            <h6 className={cn('mb-2', styles.title)}>{DUMMY_TITLE}</h6>
            <span className="d-flex mb-1">
                <p className="text-hint mr-2">신청기간</p>
                <p className="text-alternative"> {DUMMY_DATE_APPLY}</p>
            </span>
            <span className="d-flex">
                <p className="text-hint mr-2">교육기간</p>
                <p className="text-alternative"> {DUMMY_DATE_EDUCATION}</p>
            </span>
        </div>
    );
}
