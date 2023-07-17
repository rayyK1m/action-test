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
    const { id } = query;

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/campTickets/${id}`,
    );
    return data;
};

const getCampTicketsCount = async () => {
    const { data } = await axios.get('/api/camp-tickets/active-count');
    return data;
};

const createCampTicket = async (query) => {
    const { type, formData } = query;
    // const { data } = await axios.post(
    //     `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/campTickets/${type}`,
    //     formData,
    // );
    return true;
};

const campTicketsApis = {
    getCampTickets,
    getCampTicket,
    getCampTicketsCount,
    createCampTicket,
};
export default campTicketsApis;
