import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import { CheckCircleIcon } from '@goorm-dev/gds-icons';

export const EDITABLE_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: false,
});

export const CONFIRM_BUTTON_CASE_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: false,
});

export const ALERT_TEXT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]:
        '재단이 자료를 검토 중입니다. 승인이 완료되면 프로그램을 등록할 수 있습니다.',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]:
        '재단이 자료를 검토 중입니다. 승인이 완료되면 프로그램을 등록할 수 있습니다.',
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]:
        '선정된 운영 기관은 사업 추진을 위해 아래 자료를 필수로 한국과학창의재단에 제출해야 합니다. ',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: (
        <>
            <div>
                운영 기관은 하단의 거절 사유를 토대로 자료를 수정하여 다시
                제출해야 합니다.
            </div>
            <div>제출한 자료가 승인되면 프로그램을 등록할 수 있습니다.</div>
        </>
    ),
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]:
        '재단이 요청한 내용을 확인 후 자료를 추가하여 제출해 주세요.',
});

export const BADGE_SHOW_MAP = /** @type {const } */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.미제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_제출.key]: false,
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: true,
});

export const BADGE_COLOR_MAP = /** @type {const } */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: 'primary',
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: 'success',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: 'danger',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: 'warning',
});

export const BADGE_TEXT_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.제출.key]: '제출됨',
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: '승인됨',
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: '거절됨',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: '추가 자료 요청됨',
});

export const BADGE_ICON_MAP = /** @type {const} */ ({
    [REQUIRED_FILE_SUBMIT_STATUS.승인.key]: CheckCircleIcon,
});

export const FEEDBACK_TITLE = {
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: '거절 사유',
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: '추가 자료 요청 사유',
};

export const FEEDBACK_SHOW_MAP = {
    [REQUIRED_FILE_SUBMIT_STATUS.거절.key]: true,
    [REQUIRED_FILE_SUBMIT_STATUS.추가_자료_요청.key]: true,
};
