import swcampSdk from '@/server/libs/swcamp';
import validation from './validation';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

const getInstitutions = async (req, res) => {
    const { page, limit = 16, search, active = false } = req.query;

    const { items, total } = await swcampSdk.getInstitutions({
        page,
        limit,
        search,
        active,
    });

    return res.json({ items, total });
};

const getInstitution = async (req, res) => {
    const { institutionId } = req.query;
    const { item } = await swcampSdk.getInstitution(institutionId);

    return res.json({
        name: item?.name || '이름 없음',
        institutionId: item?.id,
        logo: item?.logo,
    });
};

const getInstitutionAdmin = async (req, res) => {
    const { institutionId } = req.query;
    const { item } = await swcampSdk.getInstitutionAdmin({
        institutionId,
        userId: req.session?.id,
    });

    return res.json({
        ...item,
        reports: {
            ...(item?.reports && item.reports),
            reviewStatus:
                item?.reports?.reviewStatus ||
                REQUIRED_FILE_SUBMIT_STATUS.미제출.key,
            fileObject: item?.reports?.fileObject || {
                ['institution-A']: {
                    label: '참여 인력 업무 분장',
                },
                ['institution-B']: {
                    label: '안전 관리 계획서',
                },
            },
        },
        name: item?.name || '이름 없음',
    });
};

const getInstitutionsFoundation = async (req, res) => {
    const { page, limit, search, sort } = req.query;

    const { items, total } = await swcampSdk.getInstitutionsFoundation({
        userId: req.session?.id,
        page,
        limit,
        search,
        sort,
    });

    return res.json({ items, totalCount: total });
};

const submitReports = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const fileObject = req.body;
    const data = await swcampSdk.submitReports({
        userId,
        institutionId,
        fileObject,
    });
    return res.json(data);
};

const patchReports = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const fileObject = req.body;
    const data = await swcampSdk.patchReports({
        userId,
        institutionId,
        fileObject,
    });
    return res.json(data);
};

const submitExtraReports = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const fileObject = req.body;
    const data = await swcampSdk.submitExtraReports({
        userId,
        institutionId,
        fileObject,
    });
    return res.json(data);
};

const submitReportReview = async (req, res) => {
    const { institutionId } = req.query;
    const { id: userId } = req.session || {};

    const { reviewStatus, feedback } = req.body;
    const data = await swcampSdk.submitReportReview({
        userId,
        institutionId,
        reviewStatus,
        feedback,
    });
    return res.json(data);
};

const institutionsCtrl = {
    getInstitutions,
    getInstitution,
    getInstitutionAdmin,
    getInstitutionsFoundation,
    submitReports,
    patchReports,
    submitExtraReports,
    submitReportReview,
    validation,
};

export default institutionsCtrl;
