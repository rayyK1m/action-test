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

const campTicketsApis = {
    getCampTickets,
};
export default campTicketsApis;
