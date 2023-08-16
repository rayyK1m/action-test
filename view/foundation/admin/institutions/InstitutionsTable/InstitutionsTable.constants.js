import {
    CheckCircleIcon,
    ErrorCircleIcon,
    NoticeCircleIcon,
    SendIcon,
} from '@goorm-dev/gds-icons';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

export const STATUS_TEXT = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.제출.text,
    },
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.text,
    },
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.미제출.text,
        icon: NoticeCircleIcon,
        color: 'warning',
    },
    [REQUIRED_FILE_SUBMIT_STATUS.승인됨.key]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.승인됨.text,
        icon: CheckCircleIcon,
        color: 'success',
    },
    [REQUIRED_FILE_SUBMIT_STATUS.거절됨.key]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.거절됨.text,
        icon: ErrorCircleIcon,
        color: 'danger',
    },
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: {
        text: REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.text,
        icon: SendIcon,
        color: 'hint',
    },
});

export const FOUNDATION_ADMIN_INSTITUTIONS_DEFAULT_QUERY = {
    page: 1,
    limit: 10,
};
