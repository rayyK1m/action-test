import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

export const TEXT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: '필수 자료 제출하기',
    [REQUIRED_FILE_SUBMIT_STATUS.승인됨.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.거절됨.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: '필수 자료 제출 내역',
});

export const COLOR_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: 'basic',
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: 'primary',
    [REQUIRED_FILE_SUBMIT_STATUS.승인됨.key]: 'basic',
    [REQUIRED_FILE_SUBMIT_STATUS.거절됨.key]: 'danger',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: 'warning',
});

export const TOOLTIP_ISSHOW_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.승인됨.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.거절됨.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: true,
});

export const TOOLTIP_TEXT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]:
        '필수 자료 제출 후 승인되면 프로그램을 등록할 수 있어요.',
    [REQUIRED_FILE_SUBMIT_STATUS.거절됨.key]:
        '자료를 수정해서 다시 제출해주세요.',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]:
        '자료를 추가해서 다시 제출해주세요.',
});
