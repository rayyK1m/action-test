import swcampSdk from '@/server/libs/swcamp';
import validation from './validation';

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
            /** TODO: temp 값임 DB도 완벽히 적용되면 제거 */
            // reviewStatus: 'SUBMIT',
            reviewStatus: 'NOT_SUBMITTED',
            // reviewStatus: 'APPROVE',
            // reviewStatus: 'REJECT',
            // reviewStatus: 'ADDITIONAL',
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

const institutionsCtrl = {
    getInstitutions,
    getInstitution,
    getInstitutionAdmin,
    getInstitutionsFoundation,
    validation,
};

export default institutionsCtrl;
