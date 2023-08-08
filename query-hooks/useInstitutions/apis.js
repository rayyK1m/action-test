import axios from 'axios';
import qs from 'qs';

const getInstitutions = async (query) => {
    const queryString = qs.stringify(query, { skipNulls: true });

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions?${queryString}`,
    );

    return data;
};

const getInstitution = async (institutionId) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}`,
    );

    return data;
};

/**
 *
 * @param {*} query
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const getInstitutionsFoundation = async (query, config) => {
    const queryString = qs.stringify(query, { skipNulls: true });

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/foundation?${queryString}`,
        { ...config },
    );

    return data;
};

const institutionsApis = {
    getInstitutions,
    getInstitution,
    getInstitutionsFoundation,
};

export default institutionsApis;
