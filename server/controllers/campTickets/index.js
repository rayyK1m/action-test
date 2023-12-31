import { PROGRAM_DIVISION, CAMP_REVIEW_STATUS } from '@/constants/db';
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

const getCampTicketAdmin = async (req, res) => {
    const { id } = req.query;
    const { item } = await swcampSdk.getCampTicketAdmin({
        ticketId: id,
        userId: req.session?.id,
        institutionId: req.session?.institutionId,
    });

    return res.json(item);
};

const getCampTickets = async (req, res) => {
    const userId = req.session.id;
    const { page = 1, limit = 5, sort, reviewStatus } = req.query;

    const { items, total } = await swcampSdk.getCampTickets({
        userId,
        page,
        limit,
        sort,
        ...(reviewStatus !== 'ALL' && { reviewStatus }),
    });

    return res.json({
        campTickets: items || [],
        totalCount: total || 0,
        campType: items[0]?.programDivision || null,
    });
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

const getCampTicketHistory = async (req, res) => {
    const { id } = req.query;

    const data = await swcampSdk.getCampTicketHistory({
        userId: req.session?.id,
        programId: id,
    });

    return res.json(data);
};

const getCampTicketsByProgram = async (req, res) => {
    const {
        programId,
        page,
        limit,
        search,
        sort,
        reviewStatus,
        containCampId,
    } = req.query;

    const { items, total } = await swcampSdk.getCampTicketsByProgram({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,
        programId,

        page,
        limit,
        sort,
        reviewStatus:
            reviewStatus === 'ALL'
                ? `${CAMP_REVIEW_STATUS.심사중.value},${CAMP_REVIEW_STATUS.승인.value},${CAMP_REVIEW_STATUS.거절.value}`
                : reviewStatus,
        ...(search && { search }),
        containCampId,
    });

    return res.json({
        campApplicants: items || [],
        totalCount: total || 0,
        programDivision:
            items[0]?.program?.type.division || PROGRAM_DIVISION.방문형,
    });
};

const getCampParticipants = async (req, res) => {
    const { campId, page, limit, sort, search } = req.query;

    const { items, total } = await swcampSdk.getCampParticipants({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,

        campId,
        page,
        limit,
        sort,
        ...(search && { search }),
    });

    return res.json({
        campParticipants: items || [],
        totalCount: total || 0,
    });
};

const moveCampTickets = async (req, res) => {
    const { originCampId, newCampId, campTicketIdList } = req.body;

    const { result } = await swcampSdk.moveCampTickets({
        userId: req.session?.id,
        institutionId: req.session?.institutionId,

        originCampId,
        newCampId,
        campTicketIdList,
    });

    return res.json(result);
};

const changeCampTicketStatus = async (req, res) => {
    const { id } = req.query;
    const status = req.body;

    const data = await swcampSdk.changeCampTicketStatus({
        ticketId: id,
        userId: req.session?.id,
        institutionId: req.session?.institutionId,
        status,
    });
    return res.json(data);
};

const campTicketsCtrl = {
    createCampTicket,
    getCampTicket,
    getCampTicketAdmin,
    getCampTickets,
    cancelCampTicket,
    getCampTicketsCount,
    getCampTicketHistory,
    getCampTicketsByProgram,
    getCampParticipants,
    moveCampTickets,
    changeCampTicketStatus,
};

export default campTicketsCtrl;
