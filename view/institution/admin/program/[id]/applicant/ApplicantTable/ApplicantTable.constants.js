import {
    CheckCircleIcon,
    ErrorCircleIcon,
    TimeIcon,
} from '@goorm-dev/gds-icons';
import { PROGRAM_DIVISION, CAMP_TICKET_REVIEW_STATUS } from '@/constants/db';

export const CAMP_TICKET_STATUS_TEXT = {
    [CAMP_TICKET_REVIEW_STATUS.승인.value]: {
        text: CAMP_TICKET_REVIEW_STATUS.승인.text,
        icon: CheckCircleIcon,
        color: 'success',
    },
    [CAMP_TICKET_REVIEW_STATUS.거절.value]: {
        text: CAMP_TICKET_REVIEW_STATUS.거절.text,
        icon: ErrorCircleIcon,
        color: 'info',
    },
    [CAMP_TICKET_REVIEW_STATUS.심사중.value]: {
        text: CAMP_TICKET_REVIEW_STATUS.심사중.text,
        icon: TimeIcon,
        color: 'warning',
    },
    [CAMP_TICKET_REVIEW_STATUS.취소.value]: {
        text: CAMP_TICKET_REVIEW_STATUS.취소.text,
        icon: ErrorCircleIcon,
        color: 'info',
    },
};

export const DROPDOWN_MENU = {
    [PROGRAM_DIVISION.방문형]: [
        {
            index: 0,
            key: 'ALL',
            text: '전체',
        },
        {
            index: 1,
            key: CAMP_TICKET_REVIEW_STATUS.심사중.key,
            value: CAMP_TICKET_REVIEW_STATUS.심사중.value,
            text: CAMP_TICKET_REVIEW_STATUS.심사중.text,
        },
        {
            index: 2,
            key: CAMP_TICKET_REVIEW_STATUS.승인.key,
            value: CAMP_TICKET_REVIEW_STATUS.승인.value,
            text: CAMP_TICKET_REVIEW_STATUS.승인.text,
        },
        {
            index: 3,
            key: CAMP_TICKET_REVIEW_STATUS.거절.key,
            value: CAMP_TICKET_REVIEW_STATUS.거절.value,
            text: CAMP_TICKET_REVIEW_STATUS.거절.text,
        },
    ],
    [PROGRAM_DIVISION.집합형]: [
        {
            index: 0,
            key: 'ALL',
            text: '전체',
        },
        {
            index: 1,
            key: CAMP_TICKET_REVIEW_STATUS.승인.key,
            value: CAMP_TICKET_REVIEW_STATUS.승인.value,
            text: CAMP_TICKET_REVIEW_STATUS.승인.text,
        },
        {
            index: 2,
            key: CAMP_TICKET_REVIEW_STATUS.거절.key,
            value: CAMP_TICKET_REVIEW_STATUS.거절.value,
            text: CAMP_TICKET_REVIEW_STATUS.거절.text,
        },
        {
            index: 3,
            key: CAMP_TICKET_REVIEW_STATUS.취소.key,
            value: CAMP_TICKET_REVIEW_STATUS.취소.value,
            text: CAMP_TICKET_REVIEW_STATUS.취소.text,
        },
    ],
};
