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

const getInstitution = async (_, res) => {
    return res.json({ item: [] });
};

export default { validation, getInstitutions, getInstitution };
