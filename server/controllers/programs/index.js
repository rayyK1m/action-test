import swcampSdk from '@/server/libs/swcamp';
import { getPrgramApplyStatus } from '@/server/utils/common';

import { PRGRAM_APPLY_STATUS } from '@/constants/db';

const getPrograms = async (req, res) => {
    const {
        page = 1,
        limit = 4,
        search,
        campType,
        category,
        operateLocation,
        institutionId,
    } = req.query;
    const { items, total } = await swcampSdk.getPrograms({
        page,
        limit,
        search,
        campType,
        category,
        operateLocation,
        institutionId,
    });

    /**
     * 프로그램 모집 상태 정보가 포함된 program 리스트
     *
     * @param {Object} extendedItems
     * @param {Object} extendedItems.applyStatus - 프로그램 모집 상태에 대한 정보
     * @param {type} extendedItems.applyStatus.type - 프로그램 모집 상태
     * @param {type} extendedItems.applyStatus.isPossibleApply - '모집중', '모집예정'만 true
     */
    const extendedItems = items.map((item) => {
        const {
            applyDate: { start, end },
        } = item;
        const { type } = getPrgramApplyStatus(
            new Date(start),
            new Date(end),
        ).find((entry) => entry.condition);

        return {
            ...item,
            applyStatus: {
                type,
                isPossibleApply:
                    type === PRGRAM_APPLY_STATUS.모집_예정.key ||
                    type === PRGRAM_APPLY_STATUS.모집_중.key,
            },
        };
    });

    return res.json({
        items: extendedItems,
        total,
    });
};

const getProgram = async (req, res) => {
    const { id } = req.query;

    const data = await swcampSdk.getProgram({
        programId: id,
    });

    return res.json(data);
};

const programsCtrl = { getPrograms, getProgram };

export default programsCtrl;
