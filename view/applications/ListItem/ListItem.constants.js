import {
    CheckCircleIcon,
    ErrorCircleIcon,
    TimeIcon,
} from '@goorm-dev/gds-icons';
import { PROGRAM_REVIEW_STATUS } from '@/constants/db';

export const STATUS_BADGE = {
    [PROGRAM_REVIEW_STATUS.승인.value]: {
        text: PROGRAM_REVIEW_STATUS.승인.text,
        icon: CheckCircleIcon,
        color: 'primary',
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
