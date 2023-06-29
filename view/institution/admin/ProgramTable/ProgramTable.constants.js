import {
    CheckCircleIcon,
    ErrorCircleIcon,
    TimeIcon,
} from '@goorm-dev/gds-icons';
import { CAMP_TYPE, PROGRAM_REVIEW_STATUS } from '@/constants/db';

export const CAMP_TYPE_BADGE = {
    [CAMP_TYPE.방문형]: {
        color: 'primary',
    },
    [CAMP_TYPE.집합형]: {
        color: 'success',
    },
};

export const STATUS_TEXT = {
    [PROGRAM_REVIEW_STATUS.승인.value]: {
        text: PROGRAM_REVIEW_STATUS.승인.text,
        icon: CheckCircleIcon,
        color: 'success',
    },
    [PROGRAM_REVIEW_STATUS.거절.value]: {
        text: PROGRAM_REVIEW_STATUS.거절.text,
        icon: ErrorCircleIcon,
        color: 'info',
    },
    [PROGRAM_REVIEW_STATUS.심사중.value]: {
        text: PROGRAM_REVIEW_STATUS.심사중.text,
        icon: TimeIcon,
        color: 'warning',
    },
};
