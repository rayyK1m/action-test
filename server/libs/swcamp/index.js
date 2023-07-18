import ExternalResponseError from '@/server/utils/error/ExternalResponseError';
import axios from 'axios';
import qs from 'qs';

import { removeEmptyValues } from '@/utils';
import ForbiddenError from '@/server/utils/error/ForbiddenError';

const swcampInstance = axios.create({
    baseURL: process.env.SWCAMP_API_HOST,
    headers: {
        // TODO: api server용 토큰이 있다면 추가하기
    },
});

const getAuthHeader = (userId) => {
    return { 'x-user-id': userId };
};

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
    search,
    campType: division,
    category,
    operateLocation,
    institutionId,
}) => {
    const removedEmptyQuery = removeEmptyValues({
        page,
        limit,
        search,
        division,
        category,
        operateLocation,
        institutionId,
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
        console.log(err);
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

const createProgram = async () => {
    try {
        const { data } = await swcampInstance.post('/');
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
            // NOTE: 디버깅에 필요한 데이터 넣어두기
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
        console.log(err.response.data);
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
            // NOTE: 디버깅에 필요한 데이터 넣어두기
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

export const getInstitution = async (institutionId) => {
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
        const { data } = await swcampInstance.get(`/api/v1/swcamp-users`, {
            headers: { ...getAuthHeader(userId) },
        });
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
    createProgram,

    /**
     * Institution
     */
    getInstitutions,
    getInstitution,

    /**
     * Camp
     */
    // ...

    /**
     * CampTicket
     */

    getCampTickets,
    getCampTicket,
    cancelCampTicket,
    getCampTicketsCount,
    createCampTicket,

    /**
     * UserData
     */
    getUserInfo,
};

export default swcampSdk;
