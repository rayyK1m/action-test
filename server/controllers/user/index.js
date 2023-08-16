import swcampSdk from '@/server/libs/swcamp';

const getUserInfo = async (req, res) => {
    const data = await swcampSdk.getUserInfo({
        userId: req.session?.id,
    });

    return res.json(data);
};

const userCtrl = {
    getUserInfo,
};

export default userCtrl;
