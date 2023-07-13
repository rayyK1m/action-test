import swcampSdk from '@/server/libs/swcamp';

const getCampTickets = async (req, res) => {
    const { page = 1, limit = 5, sort, reviewStatus } = req.query;
    const { items, total } = await swcampSdk.getCampTickets({
        userId: req.session?.id,
        page,
        limit,
        sort,
        reviewStatus,
    });

    return res.json({ items, total });
};

const campTicketsCtrl = {
    getCampTickets,
};
export default campTicketsCtrl;
