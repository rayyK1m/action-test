import { CAMP_TYPE, PROGRAM_REVIEW_STATUS } from '@/constants/db';

export const DROPDOWN_MENU = {
    [CAMP_TYPE.방문형]: [
        {
            index: 0,
            key: 'ALL',
            text: '전체',
        },
        {
            index: 1,
            key: PROGRAM_REVIEW_STATUS.심사중.key,
            text: PROGRAM_REVIEW_STATUS.심사중.text,
        },
        {
            index: 2,
            key: PROGRAM_REVIEW_STATUS.승인.key,
            text: PROGRAM_REVIEW_STATUS.승인.text,
        },
        {
            index: 3,
            key: PROGRAM_REVIEW_STATUS.거절.key,
            text: PROGRAM_REVIEW_STATUS.거절.text,
        },
    ],
    [CAMP_TYPE.집합형]: [
        {
            index: 0,
            key: 'ALL',
            text: '전체',
        },
        {
            index: 1,
            key: PROGRAM_REVIEW_STATUS.승인.key,
            text: PROGRAM_REVIEW_STATUS.승인.text,
        },
        {
            index: 2,
            key: PROGRAM_REVIEW_STATUS.거절.key,
            text: PROGRAM_REVIEW_STATUS.거절.text,
        },
        {
            index: 3,
            key: 'CANCEL',
            text: '캠프 취소',
        },
    ],
};
