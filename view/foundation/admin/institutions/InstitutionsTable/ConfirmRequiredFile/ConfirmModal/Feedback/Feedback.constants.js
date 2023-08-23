import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

export const FEEDBACK_INPUT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: {
        LABEL: '거절 사유',
        PLACEHOLDER:
            '필수 자료를 거절하는 사유와 수정 방향을 구제척으로 입력해 주세요. (최소 10자, 최대 500자)',
    },
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: {
        LABEL: '추가 자료 요청 내용',
        PLACEHOLDER:
            '필수 자료에 추가되어야 하는 내용을 구제척으로 입력해 주세요. (최소 10자, 최대 500자)',
    },
});
