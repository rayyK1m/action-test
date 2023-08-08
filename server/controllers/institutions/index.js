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
    getInstitutionsFoundation,
    validation,
};

export default institutionsCtrl;
