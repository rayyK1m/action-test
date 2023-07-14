import swcampSdk from '@/server/libs/swcamp';

const createCampTicket = async (req, res) => {
    const { type } = req.query;

    const data = await swcampSdk.createCampTicket({ type });
    return res.json(data);
};

const getCampTicket = async (req, res) => {
    const { id } = req.query;

    const data = swcampSdk.getCampTicket({ ticketId: id });
    return res.json(data);
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

const campTicketsCtrl = {
    createCampTicket,
    getCampTicket,
    getCampTickets,
};
export default campTicketsCtrl;
