import ExternalResponseError from '@/server/utils/error/ExternalResponseError';
import axios from 'axios';
import qs from 'qs';

import { INSTITUTIONS } from '@/dummy/institution';
import { delay } from '@/dummy/utils';
import { removeEmptyValues } from '@/utils';

const DELAY_TIME = 1500;

const swcampInstance = axios.create({
    baseURL: process.env.SWCAMP_API_HOST,
    headers: {
        // TODO: api server용 토큰이 있다면 추가하기
    },
});

const getAuthHeader = (userId) => {
    return { 'x-user-id': userId };
};

const getCampTicket = async ({ ticketId }) => {
    try {
        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/${ticketId}/my`,
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

const getPrograms = async ({
    page,
    limit,
    search,
    campType: division,
    category,
    operateLocation,
}) => {
    const removedEmptyQuery = removeEmptyValues({
        page,
        limit,
        search,
        division,
        category,
        operateLocation,
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
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
        });
    }
};

const getProgram = async ({ programId }) => {
    try {
        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/programs/${programId}/open`,
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

const createCampTicket = async ({ type }) => {
    try {
        const { data } = await swcampInstance.post(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/role/${type}`,
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

const getInstitutions = async ({ page, limit, search, active }) => {
    // TODO: 야래 코드는 mock 데이터 핸들링 코드입니다. 추후 API 연결 작업시 지워질 예정입니다.
    await delay(DELAY_TIME);

    const data = INSTITUTIONS;
    const filteredData = data.filter(({ programCount, name }) => {
        const isSearchMatched = !search || name.includes(search);
        const isActiveMatched = !active || programCount > 0;

        return isSearchMatched && isActiveMatched;
    });
    const paginatedData = paginateArray(filteredData, page, limit);

    const newData = { items: paginatedData, total: filteredData.length };

    return newData;
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
    getInstitutions,
    getCampTickets,
    getPrograms,
    createProgram,
    getUserInfo,
    createCampTicket,
    getProgram,
    getCampTicket,
};
export default swcampSdk;
