import Image from 'next/image';
import cn from 'classnames';
import dayjs from 'dayjs';

import { Badge } from '@goorm-dev/gds-components';
import { PERIOD_FORMAT } from '@/constants/common';

import { APPLY_STATUS } from '../CampCards/CampCards.constants';
import { BADGE_INFO } from './CampCard.constant';

import styles from './CampCard.module.scss';

export default function CampCard({
    name,
    thumbnail,
    applyType,
    applyDate,
    educationDate,
}) {
    /** Badge 관련 */
    const { text: badgeText, color: badgeColor } = BADGE_INFO[applyType];

    /** Date 관련 */
    const { start: startApplyDate, end: endApplyDate } = applyDate || {};
    const { start: startEducationDate, end: endEducationDate } =
        educationDate || {};

    /** Date Format 관련 */
    const formattedStartApply = dayjs(startApplyDate).format(PERIOD_FORMAT);
    const formattedEndApply = dayjs(endApplyDate).format(PERIOD_FORMAT);
    const formattedStartEducation =
        dayjs(startEducationDate).format(PERIOD_FORMAT);
    const formattedEndEducation = dayjs(endEducationDate).format(PERIOD_FORMAT);

    return (
        <div className={styles.container}>
            <div
                className={cn(
                    styles.imageContainer,
                    'position-relative bg-gray-300 rounded mb-2',
                )}
            >
                <Image
                    src={thumbnail}
                    alt="캠프 썸네일"
                    fill
                    priority
                    sizes="500px"
                />
                <div className={cn(styles.dim, 'position-absolute')} />
                <Badge
                    color={badgeColor}
                    className={cn(styles.badge, 'position-absolute')}
                >
                    {badgeText}
                </Badge>
            </div>

            <h6 className={cn('mb-2', styles.title)}>{name}</h6>
            <span className="d-flex mb-1">
                <p className="text-hint mr-2">신청기간</p>
                <p className="text-alternative">
                    {formattedStartApply} - {formattedEndApply}
                </p>
            </span>
            {applyType !== APPLY_STATUS.CLOSED && (
                <span className="d-flex">
                    <p className="text-hint mr-2">교육기간</p>
                    <p className="text-alternative">
                        {formattedStartEducation} - {formattedEndEducation}
                    </p>
                </span>
            )}
        </div>
    );
}
