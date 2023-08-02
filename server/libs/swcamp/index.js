import axios from 'axios';
import qs from 'qs';
import { removeEmptyValues } from '@/utils';
import ForbiddenError from '@/server/utils/error/ForbiddenError';

import { delay, paginateArray } from '@/dummy/utils';
import { CAMPS } from '@/dummy/camps';

import ExternalResponseError from '../../utils/error/ExternalResponseError';
import { getAuthHeader } from '../../utils/auth';

const DELAY_TIME = 500;

const swcampInstance = axios.create({
    baseURL: process.env.SWCAMP_API_HOST,
    headers: {
        authorization: `bearer ${process.env.SWCAMP_API_TOKEN}`,
    },
});

const getCampTicket = async ({ userId, ticketId }) => {
    try {
        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/${ticketId}/my`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );

        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getPrograms = async ({
    page,
    limit,
    sort,
    search,
    campType: division,
    category,
    operateLocation,
    institutionId,
    endApplyDate,
}) => {
    const removedEmptyQuery = removeEmptyValues({
        page,
        limit,
        sort,
        search,
        division,
        category,
        operateLocation,
        institutionId,
        'applyDate.end': endApplyDate,
    });
    const queryString = qs.stringify(removedEmptyQuery, { skipNulls: true });

    try {
        const { data } = await swcampInstance.get(
            `/api/v1/programs/open?${queryString}`,
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getProgramsAdmin = async ({
    userId,
    institutionId,
    page,
    limit,
    search,
    sort,
}) => {
    const removedEmptyQuery = removeEmptyValues({
        page,
        limit,
        search,
        sort,
    });
    const queryString = qs.stringify(removedEmptyQuery, { skipNulls: true });
    const institutionQueryString = institutionId
        ? `institutionId=${institutionId}&`
        : '';

    try {
        const { data } = await swcampInstance.get(
            `/api/v1/programs/admin?${institutionQueryString}${queryString}`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );

        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getProgramAdmin = async ({ userId, institutionId, programId }) => {
    try {
        const institutionQueryString = institutionId
            ? `institutionId=${institutionId}`
            : '';
        const { data } = await swcampInstance.get(
            `/api/v1/programs/${programId}/admin?${institutionQueryString}`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );

        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getProgram = async ({ programId }) => {
    try {
        const { data } = await swcampInstance.get(
            `/api/v1/programs/${programId}/open`,
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const createProgram = async ({ userId, institutionId, formData }) => {
    try {
        const { data } = await swcampInstance.post(
            `${process.env.SWCAMP_API_HOST}/api/v1/programs?institutionId=${institutionId}`,
            formData,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
            // NOTE: 디버깅에 필요한 데이터 넣어두기
        });
    }
};

const patchProgramAdmin = async ({
    institutionId,
    userId,
    programId,
    formData,
}) => {
    try {
        const { data } = await swcampInstance.patch(
            `${process.env.SWCAMP_API_HOST}/api/v1/programs/${programId}?institutionId=${institutionId}`,
            formData,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
            // NOTE: 디버깅에 필요한 데이터 넣어두기
        });
    }
};

const getCampTickets = async ({ userId, page, limit, sort, reviewStatus }) => {
    const queryString = qs.stringify(
        {
            page,
            limit,
            ...(sort && { sort }),
            ...(reviewStatus && { reviewStatus }),
        },
        { skipNulls: true },
    );
    try {
        const { data } = await swcampInstance.get(
            `/api/v1/camp-tickets/my?${queryString}`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        switch (err.response.status) {
            case 403:
                throw new ForbiddenError({
                    message: err.response.message,
                    code: err.response.code,
                });
        }
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const cancelCampTicket = async ({ userId, ticketId }) => {
    try {
        const { data } = await swcampInstance.post(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/${ticketId}/cancel`,
            {},
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getCampTicketsCount = async ({ userId }) => {
    try {
        const { data } = await swcampInstance.get(
            '/api/v1/camp-tickets/active-count',
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const createCampTicket = async ({ role, userId, formData }) => {
    try {
        const { data } = await swcampInstance.post(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/role/${role}`,
            formData,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
            // NOTE: 디버깅에 필요한 데이터 넣어두기
        });
    }
};

const getCamps = async ({ programId, institutionId, page, limit }) => {
    await delay(DELAY_TIME);

    const data = CAMPS;
    const filteredData = data.filter(({ institutionId: dataInstitutionId }) =>
        institutionId ? institutionId === dataInstitutionId : true,
    );
    const paginatedData = paginateArray(filteredData, page, limit);
    const newData = { items: paginatedData, total: filteredData.length };

    return newData;
};

const getCampTicketHistory = async ({ userId, programId }) => {
    try {
        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/programs/${programId}`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
        // return true;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getCampTicketsByProgram = async ({
    userId,
    institutionId,
    programId,
    page,
    limit,
    search,
    sort,
    reviewStatus,
}) => {
    try {
        const queryString = qs.stringify(
            {
                page,
                limit,
                search,
                ...(sort && { sort }),
                ...(reviewStatus && { reviewStatus }),
            },
            { skipNulls: true },
        );
        const institutionQueryString = institutionId
            ? `institutionId=${institutionId}&`
            : '';
        const { data } = await swcampInstance.get(
            `/api/v1/camp-tickets/programs/${programId}/admin?${institutionQueryString}${queryString}`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );

        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getInstitutions = async ({ page, limit, search, active }) => {
    const removedEmptyQuery = removeEmptyValues({
        page,
        limit,
        search,
        active,
    });
    const queryString = qs.stringify(removedEmptyQuery);

    try {
        const { data } = await swcampInstance.get(
            `/api/v1/institutions/public?${queryString}`,
        );

        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getInstitution = async (institutionId) => {
    try {
        const { data } = await swcampInstance.get(
            `/api/v1/institutions/${institutionId}/public`,
        );

        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getUserInfo = async ({ userId }) => {
    try {
        const res = await fetch(
            `${process.env.SWCAMP_API_HOST}/api/v1/swcamp-users`,
            {
                headers: {
                    authorization: `bearer ${process.env.SWCAMP_API_TOKEN}`,
                    ...getAuthHeader(userId),
                },
            },
        );
        const data = await res.json();
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response?.status, data: err.response?.data },
        });
    }
};

const getSchools = async ({ name, userId }) => {
    try {
        const { data } = await swcampInstance.get(
            `/api/v1/school?name=${name}`,
            {
                headers: { ...getAuthHeader(userId) },
            },
        );
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const swcampSdk = {
    /**
     * Program
     */
    getPrograms,
    getProgram,
    getProgramAdmin,
    patchProgramAdmin,
    getProgramsAdmin,
    createProgram,

    /**
     * Institution
     */
    getInstitutions,
    getInstitution,

    /**
     * Camp
     */
    getCamps,

    /**
     * CampTicket
     */
    getCampTickets,
    getCampTicket,
    cancelCampTicket,
    getCampTicketsCount,
    createCampTicket,
    getCampTicketHistory,
    getCampTicketsByProgram,

    /**
     * UserData
     */
    getUserInfo,

    /**
     * School
     */
    getSchools,
};

export default swcampSdk;
