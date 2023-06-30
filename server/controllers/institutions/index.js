import swcampSdk from '@/server/libs/swcamp';

const getInstitutions = async (req, res) => {
    const { page = 1, limit = 16, search } = req.query;

    const { items, total } = await swcampSdk.getInstitutions({
        page,
        limit,
        search,
    });

    return res.json({ items, total });
};

const getInstitution = async (_, res) => {
    return res.json({ item: [] });
};

export default { getInstitutions, getInstitution };
