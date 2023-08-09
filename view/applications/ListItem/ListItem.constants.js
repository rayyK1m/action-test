import {
    CheckCircleIcon,
    ErrorCircleIcon,
    TimeIcon,
} from '@goorm-dev/gds-icons';
import { CAMP_REVIEW_STATUS } from '@/constants/db';

export const STATUS_BADGE = {
    [CAMP_REVIEW_STATUS.심사중.value]: {
        text: CAMP_REVIEW_STATUS.심사중.text,
        icon: TimeIcon,
        color: 'warning',
    },
    [CAMP_REVIEW_STATUS.승인.value]: {
        text: CAMP_REVIEW_STATUS.승인.text,
        icon: CheckCircleIcon,
        color: 'success',
    },
    [CAMP_REVIEW_STATUS.거절.value]: {
        text: CAMP_REVIEW_STATUS.거절.text,
        icon: ErrorCircleIcon,
        color: 'info',
    },
    [CAMP_REVIEW_STATUS.취소.value]: {
        text: CAMP_REVIEW_STATUS.취소.text,
        icon: ErrorCircleIcon,
        color: 'info',
    },
};
