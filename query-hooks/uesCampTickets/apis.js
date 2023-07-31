import axios from 'axios';
import qs from 'qs';

const getCampTickets = async ({ query }, axiosInstance = axios) => {
    const queryString = qs.stringify(query, { skipNulls: true });
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
        skipNulls: true,
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
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/programs/${programId}`,
    );

    return data;
};

const campTicketsApis = {
    getCampTickets,
    getCampTicket,
    getCampTicketsCount,
    createCampTicket,
    cancelCampTicket,
    getCampticketsAdmin,
    getCampTicketHistory,
};
export default campTicketsApis;
