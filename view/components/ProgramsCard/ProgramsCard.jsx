import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import dayjs from 'dayjs';

import { Badge } from '@goorm-dev/gds-components';
import { PERIOD_FORMAT } from '@/constants/common';

import { PRGRAM_APPLY_STATUS } from '@/constants/db';

import styles from './ProgramsCard.module.scss';

export default function ProgramsCard({
    id,
    name,
    thumbnailUrl,
    thumbnailName,
    applyType,
    applyDate,
    educationDate,
}) {
    /** Badge 관련 */
    const { text: badgeText, badgeColor } = PRGRAM_APPLY_STATUS[applyType];

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
        <Link href={`/programs/${id}`}>
            <div className={styles.container}>
                <div
                    className={cn(
                        styles.imageContainer,
                        'position-relative bg-gray-300 rounded mb-2',
                    )}
                >
                    {thumbnailUrl && (
                        <Image
                            src={thumbnailUrl}
                            alt={thumbnailName}
                            fill
                            priority
                        />
                    )}
                </div>

                <Badge
                    color={badgeColor}
                    size="md"
                    className={cn(styles.badge, 'mb-1')}
                >
                    {badgeText}
                </Badge>

                <h6 className={cn('mb-2', styles.title)}>{name}</h6>
                <span className="d-flex mb-1">
                    <p className="text-hint mr-2">신청 기간</p>
                    <p className="text-alternative">
                        {formattedStartApply} - {formattedEndApply}
                    </p>
                </span>
                {applyType !== PRGRAM_APPLY_STATUS.모집_종료.key && (
                    <span className="d-flex">
                        <p className="text-hint mr-2">교육 기간</p>
                        <p className="text-alternative">
                            {formattedStartEducation} - {formattedEndEducation}
                        </p>
                    </span>
                )}
            </div>
        </Link>
    );
}
