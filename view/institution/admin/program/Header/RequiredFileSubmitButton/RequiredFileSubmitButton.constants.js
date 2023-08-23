import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

export const TEXT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: '필수 자료 제출하기',
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: '필수 자료 제출 내역',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: '필수 자료 제출 내역',
});

export const COLOR_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: 'basic',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: 'basic',
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: 'primary',
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: 'basic',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: 'danger',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: 'warning',
});

export const TOOLTIP_ISSHOW_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: true,
});

export const TOOLTIP_TEXT_MAP = /** @type {const} */ ({
    /** NOTE
     * 현재 임시 정책으로 필수 자료를 제출하지 않아도 돼서 문구 변경,
     * 추후 다시 변경될 예정
     */
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]:
        '2학기에는 필수 자료 제출 없이 프로그램 등록할 수 있습니다.',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]:
        '자료를 수정해서 다시 제출해주세요.',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]:
        '자료를 추가해서 다시 제출해주세요.',
});
