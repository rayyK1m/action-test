import axios from 'axios';
import qs from 'qs';

const getCampTickets = async (query) => {
    const queryString = qs.stringify(query, { skipNulls: true });
    const { data } = await axios.get(
        `${process.env.MAIN_HOST}/api/camp-tickets?${queryString}`,
    );

    return {
        campTickets: data?.items || [],
        campType: data?.items[0]?.programDivision,
        totalCount: data?.total || 0,
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

const campTicketsApis = {
    getCampTickets,
    getCampTicket,
    getCampTicketsCount,
    createCampTicket,
    cancelCampTicket,
};
export default campTicketsApis;
