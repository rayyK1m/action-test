import dayjs from 'dayjs';

import swcampSdk from '@/server/libs/swcamp';

import validation from './validation';
import { getPrgramApplyStatus } from './prgrams.utils';

import { ROLE } from '@/constants/db';

const getPrograms = async (req, res) => {
    const {
        page = 1,
        limit = 4,
        sort,
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
     * - active가 true일 경우, 모집중, 모집 예정인 프로그램만 보여준다.
     * - 신청 종료일 >= 오늘 날짜
     * - lt = `>` 이므로, 오늘에서 하루를 뺀 날짜와 비교한다. ex. 신청 종료일(23.07.28) > 어제(23.07.27)
     */
    const endApplyDate = active
        ? `gt:${dayjs().subtract(1, 'day').format('YYYY-MM-DD')}`
        : undefined;

    const { items, total } = await swcampSdk.getPrograms({
        page,
        limit,
        sort,
        search,
        campType,
        category,
        operateLocation,
        institutionId,
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

    const { item } = await swcampSdk.getProgram({
        programId: id,
    });

    const { type: applyStatus } = getPrgramApplyStatus(
        new Date(item.applyDate.start),
        new Date(item.applyDate.end),
    ).find((entry) => entry.condition);

    return res.json({
        item: {
            applyStatus,
            ...item,
        },
    });
};

const getProgramsAdmin = async (req, res) => {
    const { page, limit, search, sort, reviewStatus } = req.query;
    const { id: userId, role, institutionId } = req.session || {};

    const isInstitution = role === ROLE.INSTITUTION;
    const isFoundation = role === ROLE.FOUNDATION && req.query.institutionId;

    const { items, total } = await swcampSdk.getProgramsAdmin({
        ...(isInstitution && { institutionId }),
        ...(isFoundation && { institutionId: req.query.institutionId }),
        userId,
        page,
        limit,
        search,
        sort,
        reviewStatus,
    });

    return res.json({ programs: items, totalCount: total });
};

const getProgramAdmin = async (req, res) => {
    const { id } = req.query;
    const isInstitution = req.session?.role === ROLE.INSTITUTION;

    const { item } = await swcampSdk.getProgramAdmin({
        userId: req.session?.id,
        ...(isInstitution && { institutionId: req.session?.institutionId }),
        programId: id,
    });

    return res.json(item);
};

const patchProgramAdmin = async (req, res) => {
    const { id: programId } = req.query;
    const formData = req.body;
    const data = await swcampSdk.patchProgramAdmin({
        institutionId: req.session?.institutionId,
        userId: req.session?.id,
        programId,
        formData,
    });

    return res.json(data);
};

const createProgram = async (req, res) => {
    const { userId, institutionId } = req.query;
    const formData = req.body;
    const data = await swcampSdk.createProgram({
        userId,
        institutionId,
        formData,
    });

    return res.json(data);
};

const changeProgramReviewStatus = async (req, res) => {
    const { id: programId, institutionId } = req.query;
    const { status } = req.body;

    const { result } = await swcampSdk.changeProgramReviewStatus({
        userId: req.session?.id,
        programId,
        institutionId,
        status,
    });

    return res.json({ result });
};

const programsCtrl = {
    validation,
    getPrograms,
    getProgram,
    getProgramsAdmin,
    getProgramAdmin,
    patchProgramAdmin,
    createProgram,
    changeProgramReviewStatus,
};
export default programsCtrl;
