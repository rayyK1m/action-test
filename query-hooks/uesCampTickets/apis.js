import axios from 'axios';
import qs from 'query-string';

const getCampTickets = async ({ query }, axiosInstance = axios) => {
    const queryString = qs.stringify(query, { skipNull: true });
    const {
        data: { campTickets, campType, totalCount },
    } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets?${queryString}`,
    );

    return {
        campTickets,
        campType,
        totalCount,
    };
};

const getCampTicket = async (query) => {
    const { id, userId } = query;

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/${id}?userId=${userId}`,
    );
    return data;
};

const getCampTicketAdmin = async ({ id }) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/${id}/admin`,
    );
    return data;
};

const getCampTicketsCount = async () => {
    const { data } = await axios.get('/api/camp-tickets/active-count');
    return data;
};

const createCampTicket = async (query) => {
    const { role, userId, formData } = query;
    const queryString = qs.stringify({ role, userId });

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/new?${queryString}`,
        formData,
    );

    return data;
};

const cancelCampTicket = async (query) => {
    const { id, userId } = query;

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/${id}/cancel?userId=${userId}`,
    );
    return data;
};

export const getCampticketsAdmin = async (query, serverAxios = axios) => {
    const queryString = qs.stringify(query, {
        skipNull: true,
    });

    const {
        data: { campApplicants, totalCount, programDivision },
    } = await serverAxios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/programs/admin?${queryString}`,
    );

    return {
        campApplicants,
        totalCount,
        programDivision,
    };
};

const getCampTicketHistory = async (query, axiosInstance = axios) => {
    const { programId } = query;
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/programs/${programId}/my`,
    );

    return data;
};

const changeCampTicketStatus = async (query) => {
    const { status, id } = query;
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/${id}/status`,
        { status },
    );

    return data;
};

const getCampParticipants = async (query, axiosInstance = axios) => {
    const queryString = qs.stringify(query, {
        skipNull: true,
    });
    const {
        data: { campParticipants, totalCount },
    } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/participants?${queryString}`,
    );

    return {
        campParticipants,
        totalCount,
    };
};

const moveCampTickets = async ({ originCampId, newCampId, targets, meta }) => {
    const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/move`,
        {
            originCampId,
            newCampId,
            campTicketIdList: targets,
        },
    );

    return { result: data, ...meta };
};

const campTicketsApis = {
    getCampTickets,
    getCampTicket,
    getCampTicketAdmin,
    getCampTicketsCount,
    createCampTicket,
    cancelCampTicket,
    getCampticketsAdmin,
    getCampTicketHistory,
    getCampParticipants,
    moveCampTickets,
    changeCampTicketStatus,
};
export default campTicketsApis;
