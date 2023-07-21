import { PRGRAM_APPLY_STATUS } from '@/constants/db';

/**
 * 신청(지원) 가능한 프로그램 판단 유무
 *
 * @param {Date} start
 * @param {Date} end
 * @returns {string} '모집 중' | '모집 예정' | '모집 종료'
 */
export const getPrgramApplyStatus = (start, end) => [
    {
        condition: new Date() < start,
        type: PRGRAM_APPLY_STATUS.모집_예정.key,
    },
    {
        condition: start <= new Date() && end >= new Date(),
        type: PRGRAM_APPLY_STATUS.모집_중.key,
    },
    {
        condition: new Date() > end,
        type: PRGRAM_APPLY_STATUS.모집_종료.key,
    },
];
