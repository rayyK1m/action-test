import axios from 'axios';
import qs from 'query-string';

const getCamps = async (programId, query, axiosInstance = axios) => {
    const queryString = qs.stringify(query, { skipNulls: true });
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/programs/${programId}?${queryString}`,
    );

    return data;
};

const copyCamp = async ({ campId, institutionId }) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}/copy`,
        { institutionId },
    );

    return data;
};

const deleteCamps = async ({ campIds, institutionId }) => {
    const queryString = qs.stringify(
        {
            institutionId,
            campIds: campIds.join(','),
        },
        { skipNulls: true },
    );

    const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps?${queryString}`,
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

const getCamp = async ({ campId, institutionId }, axiosInstance = axios) => {
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}?institutionId=${institutionId}`,
    );
    return data;
};

const createCamp = async (formData) => {
    const {
        data: { item },
    } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/new`,
        formData,
    );
    return item;
};

const patchCamp = async ({ campId, formData }) => {
    const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}`,
        formData,
    );
    return data;
};

/** 캠프 보고서 제출 */
const submitCampReport = async ({ campId, reportType, formData }) => {
    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/${campId}/reports?reportType=${reportType}`,
        formData,
    );
    return data;
};

const campsApis = {
    getCamp,
    copyCamp,
    patchCamp,
    createCamp,

    getCamps,
    deleteCamps,

    getCampClasses,

    addCampParticipants,
    deleteCampParticipants,

    submitCampReport,
};

export default campsApis;
