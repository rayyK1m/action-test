import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dayjs from 'dayjs';

import { Badge, Button } from '@goorm-dev/gds-components';
import {
    CheckCircleIcon,
    ErrorCircleIcon,
    TimeIcon,
} from '@goorm-dev/gds-icons';

import styles from './ListItem.module.scss';

const STATUS_BADGE = {
    ACCEPT: {
        value: '승인',
        icon: CheckCircleIcon,
        color: 'primary',
    },
    REJECT: {
        value: '거절',
        icon: ErrorCircleIcon,
        color: 'info',
    },
    IN_PROGRESS: {
        value: '심사중',
        icon: TimeIcon,
        color: 'warning',
    },
};

const PERIOD_FORMAT = 'MM월 DD일(ddd) HH:MM';
function ListItem({ data }) {
    const {
        uuid,
        thumbnail,
        name,
        applyDate,
        educationDate,
        channelIndex,
        approveStatus,
    } = data;
    const router = useRouter();
    const { start: applyStart, end: applyEnd } = applyDate;
    const { start: educationStart, end: educationEnd } = educationDate;

    const disableChannelLink = approveStatus !== 'ACCEPT';
    return (
        <div className={styles.container}>
            <Image
                src={thumbnail}
                alt="camp-thumbnail"
                width={320}
                height={136}
                className={styles.image}
            />

            <div className={styles.contents}>
                <Badge
                    size="sm"
                    color={STATUS_BADGE[approveStatus].color}
                    leftIcon={STATUS_BADGE[approveStatus].icon}
                    className="mb-3"
                >
                    {STATUS_BADGE[approveStatus].value}
                </Badge>
                <h5 className="mb-2">{name}</h5>
                <div className="subtitle-2 mb-1">
                    <span className="text-gray-600">신청 기간</span>
                    <span className="text-gray-700 ml-2">
                        {` ${dayjs(applyStart).format(PERIOD_FORMAT)} ~ ${dayjs(
                            applyEnd,
                        ).format(PERIOD_FORMAT)}`}
                    </span>
                </div>
                <div className="subtitle-2 text-gray-600 mb-0">
                    <span className="text-gray-600">교육 기간</span>
                    <span className="text-gray-700 ml-2">
                        {` ${dayjs(educationStart).format(
                            PERIOD_FORMAT,
                        )} ~ ${dayjs(educationEnd).format(PERIOD_FORMAT)}`}
                    </span>
                </div>
            </div>

            <div className={styles.buttons}>
                <Button
                    size="lg"
                    color="link"
                    theme="light"
                    className="mr-1"
                    onClick={() => router.push(`/application/detail/${uuid}`)}
                >
                    신청 정보 확인
                </Button>

                <Button
                    size="lg"
                    color="primary"
                    onClick={() =>
                        window.open(`https://${channelIndex}.goorm.io`)
                    }
                    disabled={disableChannelLink}
                >
                    채널 이동
                </Button>
            </div>
        </div>
    );
}

export default ListItem;
