import dayjs from 'dayjs';

import swcampSdk from '@/server/libs/swcamp';
import { getPrgramApplyStatus } from '@/server/utils/common';

import validation from './validation';
import { ROLE } from '@/constants/db';

const getPrograms = async (req, res) => {
    const {
        page = 1,
        limit = 4,
        search,
        campType,
        category,
        operateLocation,
        institutionId,
        active,
    } = req.query;

    /**
     * 신청 가능한 프로그램 보기 기능
     *
     * - active가 true일 경우, 오늘을 기준으로 하루 전, 하루 후의 날짜를 검색 조건으로 필터링
     */
    const startApplyDate = active
        ? `lt:${dayjs().add(1, 'day').format('YYYY-MM-DD')}`
        : undefined;
    const endApplyDate = active
        ? `gt:${dayjs().subtract(1, 'day').format('YYYY-MM-DD')}`
        : undefined;

    const { items, total } = await swcampSdk.getPrograms({
        page,
        limit,
        search,
        campType,
        category,
        operateLocation,
        institutionId,
        startApplyDate,
        endApplyDate,
    });

    /**
     * @param {Object} extendedItems - 프로그램 모집 상태 정보가 포함된, 확장된 program 리스트
     * @param {Object} extendedItems.applyStatus - 프로그램 모집 상태 상태 (모집_중, 모집_예정, 모집_종료)
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
            applyStatus: type,
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

const getProgramsAdmin = async (req, res) => {
    const { page, limit, search, sort } = req.query;
    const isInstitution = req.session?.role === ROLE.INSTITUTION;

    const { items, total } = await swcampSdk.getProgramsAdmin({
        userId: req.session?.id,
        ...(isInstitution && { institutionId: req.session?.institutionId }),
        page,
        limit,
        search,
        sort,
    });

    return res.json({ programs: items, totalCount: total });
};

const programsCtrl = { validation, getPrograms, getProgram, getProgramsAdmin };
export default programsCtrl;
