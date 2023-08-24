import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge, Button } from '@goorm-dev/gds-components';

import { CAMP_REVIEW_STATUS } from '@/constants/db';
import { formatDate } from '@/utils';

import TicketInfoPannel from '../TicketInfoPannel/TicketInfoPannel';

import { STATUS_BADGE } from './ListItem.constants';

import styles from './ListItem.module.scss';

function ListItem({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        id,
        program: { id: programId, thumbnail, name, applyDate, educationDate },
        channelIndex,
        reviewStatus,
    } = data;

    const { start: applyStart, end: applyEnd } = applyDate;
    const { start: educationStart, end: educationEnd } = educationDate;
    const formattedApplyStart = formatDate(applyStart);
    const formattedApplyEnd = formatDate(applyEnd);
    const formattedEducationStart = formatDate(educationStart);
    const formattedEducationEnd = formatDate(educationEnd);
    const disableChannelLink = reviewStatus !== CAMP_REVIEW_STATUS.승인.value;
    return (
        <div className={styles.container}>
            <Link href={`/programs/${programId}`}>
                <Image
                    src={thumbnail.url}
                    alt="camp-thumbnail"
                    width={320}
                    height={180}
                    className={styles.image}
                />
            </Link>

            <div className={styles.contents}>
                <Badge
                    size="sm"
                    color={STATUS_BADGE[reviewStatus].color}
                    leftIcon={STATUS_BADGE[reviewStatus].icon}
                    className="mb-3"
                >
                    {STATUS_BADGE[reviewStatus].text}
                </Badge>
                <h5 className="mb-2">
                    <Link href={`/programs/${programId}`}>{name}</Link>
                </h5>
                <div className="subtitle-2 mb-1">
                    <span className="text-gray-600">신청 기간</span>
                    <span className="text-gray-700 ml-2">
                        {` ${formattedApplyStart} ~ ${formattedApplyEnd}`}
                    </span>
                </div>
                <div className="subtitle-2 text-gray-600 mb-0">
                    <span className="text-gray-600">교육 기간</span>
                    <span className="text-gray-700 ml-2">
                        {` ${formattedEducationStart} ~ ${formattedEducationEnd}`}
                    </span>
                </div>
            </div>

            <div className={styles.buttons}>
                <Button
                    size="lg"
                    color="link"
                    theme="light"
                    className="mr-1"
                    onClick={() => setIsOpen(true)}
                >
                    신청 정보 확인
                </Button>

                <Button
                    size="lg"
                    color="primary"
                    onClick={() =>
                        window.open(
                            `https://${channelIndex}${process.env.SWCAMP_CHANNEL_DOMAIN}`,
                        )
                    }
                    disabled={disableChannelLink}
                >
                    채널 이동
                </Button>
            </div>

            <TicketInfoPannel
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                ticketId={id}
            />
        </div>
    );
}

export default ListItem;
