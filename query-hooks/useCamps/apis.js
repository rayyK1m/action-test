import axios from 'axios';
import qs from 'query-string';

export const getCamps = async (programId, filters) => {
    const queryString = qs.stringify(filters, { skipNulls: true });
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/programs/${programId}?${queryString}`,
    );

    return data;
};

export const getCamp = async (campId, axiosInstance = axios) => {
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}`,
    );
    return data;
};

const getCampClasses = async (programId, axiosInstance = axios) => {
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/class?programId=${programId}`,
    );

    return data;
};

const addCampParticipants = async ({ campId, targets }) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}/participants`,
        {
            campTicketIdList: targets,
        },
    );

    return { result: data };
};

const deleteCampParticipants = async ({ campId, targets, meta }) => {
    const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}/participants`,
        {
            data: {
                campTicketIdList: targets,
            },
        },
    );

    return { result: data, ...meta };
};

export const createCamp = async (formData) => {
    const {
        data: { item },
    } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/new`,
        formData,
    );
    return item;
};

export const patchCamp = async ({ campId, formData }) => {
    const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}`,
        formData,
    );
    return data;
};

/** 캠프 보고서 제출 */
export const submitCampReport = async ({ campId, reportType, formData }) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}/reports?reportType=${reportType}`,
        formData,
    );
    return data;
};

const campsApis = {
    getCamps,
    getCamp,
    getCampClasses,
    addCampParticipants,
    patchCamp,
    deleteCampParticipants,
    createCamp,
    submitCampReport,
};

export default campsApis;
