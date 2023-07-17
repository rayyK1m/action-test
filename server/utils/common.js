import { PRGRAM_APPLY_STATUS } from '@/constants/db';

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
