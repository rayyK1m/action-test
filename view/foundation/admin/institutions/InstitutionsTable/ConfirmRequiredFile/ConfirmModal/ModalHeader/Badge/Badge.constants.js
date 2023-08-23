import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { CheckCircleIcon } from '@goorm-dev/gds-icons';

export const BADGE_COLOR_MAP = /** @type {const } */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: 'primary',
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: 'success',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: 'danger',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: 'warning',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: 'primary',
});

export const BADGE_TEXT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: '제출됨',
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]:
        REQUIRED_FILE_SUBMIT_STATUS.승인.text,
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]:
        REQUIRED_FILE_SUBMIT_STATUS.거절.text,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: '추가 자료 요청됨',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: '추가 자료 제출됨',
});

export const BADGE_ICON_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: CheckCircleIcon,
});
