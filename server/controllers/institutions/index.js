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
        programCount: item?.programCount || 0,
    });
};

const institutionsCtrl = { getInstitutions, getInstitution, validation };

export default institutionsCtrl;
