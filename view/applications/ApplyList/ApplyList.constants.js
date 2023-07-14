import { CAMP_REVIEW_STATUS } from '@/constants/db';

export const DROPDOWN_MENU = [
    {
        key: 'ALL',
        text: '전체',
        value: 'ALL',
    },
    {
        key: CAMP_REVIEW_STATUS.심사중.key,
        text: CAMP_REVIEW_STATUS.심사중.text,
        value: CAMP_REVIEW_STATUS.심사중.value,
    },
    {
        key: CAMP_REVIEW_STATUS.승인.key,
        text: CAMP_REVIEW_STATUS.승인.text,
        value: CAMP_REVIEW_STATUS.승인.value,
    },
    {
        key: CAMP_REVIEW_STATUS.거절.key,
        text: CAMP_REVIEW_STATUS.거절.text,
        value: CAMP_REVIEW_STATUS.거절.value,
    },
    {
        key: CAMP_REVIEW_STATUS.취소.key,
        text: CAMP_REVIEW_STATUS.취소.text,
        value: CAMP_REVIEW_STATUS.취소.value,
    },
];
