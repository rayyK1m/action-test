import swcampSdk from '@/server/libs/swcamp';

const createCampTicket = async (req, res) => {
    const { role, userId } = req.query;
    const formData = req.body;

    const data = await swcampSdk.createCampTicket({ role, userId, formData });
    return res.json(data);
};

const getCampTicket = async (req, res) => {
    const { id, userId } = req.query;

    const { item } = await swcampSdk.getCampTicket({ ticketId: id, userId });
    return res.json(item);
};

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

const cancelCampTicket = async (req, res) => {
    const { id, userId } = req.query;
    const data = await swcampSdk.cancelCampTicket({ ticketId: id, userId });
    return res.json(data);
};

const getCampTicketsCount = async (req, res) => {
    const { count } = await swcampSdk.getCampTicketsCount({
        userId: req.session?.id,
    });

    return res.json({ count });
};

const campTicketsCtrl = {
    createCampTicket,
    getCampTicket,
    getCampTickets,
    cancelCampTicket,
    getCampTicketsCount,
};
export default campTicketsCtrl;
