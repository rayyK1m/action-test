import axios from 'axios';
import qs from 'qs';

const getPrograms = async (query) => {
    const queryString = qs.stringify(query, { skipNulls: true });
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs?${queryString}`,
    );

    return data;
};

const getProgram = async (query) => {
    const { id } = query;

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/${id}`,
    );

    return data;
};

const programsApis = {
    getPrograms,
    getProgram,
};

export default programsApis;
