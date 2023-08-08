import swcampSdk from '@/server/libs/swcamp';

const getSchools = async (req, res) => {
    const { name } = req.query;

    const { items, total } = await swcampSdk.getSchools({
        name,
        userId: req.session?.id,
    });
    return res.json({ items, total });
};

const schoolCtrl = {
    getSchools,
};

export default schoolCtrl;
