import { NoticeCircleIcon } from '@goorm-dev/gds-icons';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

export const STATUS_TEXT = {
    [REQUIRED_FILE_SUBMIT_STATUS.제출.value]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.제출.text,
        color: 'hint',
    },
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.value]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.미제출.text,
        icon: NoticeCircleIcon,
        color: 'warning',
    },
};

export const FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY = {
    page: 1,
    limit: 10,
};
