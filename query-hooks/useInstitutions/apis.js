import axios from 'axios';
import qs from 'qs';

export const getInstitutions = async (query) => {
    const queryString = qs.stringify(query, { skipNulls: true });

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions?${queryString}`,
    );

    return data;
};

export const getInstitution = async (institutionId) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}`,
    );

    return data;
};

const institutionsApis = {
    getInstitutions,
    getInstitution,
};

export default institutionsApis;
