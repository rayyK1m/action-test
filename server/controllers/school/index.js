import swcampSdk from '@/server/libs/swcamp';

const getSchools = async (req, res) => {
    const { name, userId } = req.query;

    const { items, total } = await swcampSdk.getSchools({ name, userId });
    return res.json({ items, total });
};

const schoolCtrl = {
    getSchools,
};

export default schoolCtrl;
