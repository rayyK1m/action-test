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

/**
 * @param {*} query
 * @param {import('axios').AxiosInstance} axiosInstance
 * @returns {Promise<{ programs: Array<import('./types').Program>; totalCount: number; }>}
 */
const getProgramsAdmin = async (query, axiosInstance = axios) => {
    const queryString = qs.stringify(query, { skipNulls: true });
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/admin?${queryString}`,
    );

    return data;
};

const getProgramAdmin = async (programId, axiosInstance = axios) => {
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/admin/${programId}`,
    );
    return data;
};

const patchProgramAdmin = async (query) => {
    const { userId, institutionId, programId, formData } = query;
    const queryString = qs.stringify({ userId, institutionId, programId });
    const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/${programId}/admin?${queryString}`,
        formData,
    );
    return data;
};

const createProgram = async (query) => {
    const { userId, institutionId, formData } = query;
    const queryString = qs.stringify({ userId, institutionId });
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/new?${queryString}`,
        formData,
    );

    return data;
};

const programsApis = {
    getPrograms,
    getProgram,
    getProgramsAdmin,
    getProgramAdmin,
    patchProgramAdmin,
    createProgram,
};

export default programsApis;
