import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

export const FEEDBACK_TITLE = {
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: '거절 사유',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: '추가 자료 요청 사유',
};

export const FEEDBACK_SHOW_MAP = {
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: true,
};
