import ExternalResponseError from '@/server/utils/error/ExternalResponseError';
import axios from 'axios';

import { INSTITUTIONS } from '@/dummy/institution';
import { PROGRAMS } from '@/dummy/programs';
import { delay, paginateArray } from '@/dummy/utils';

const DELAY_TIME = 1500;

const swcampInstance = axios.create({
    baseURL: process.env.SWCAMP_API_HOST,
    headers: {
        // TODO: api server용 토큰이 있다면 추가하기
    },
});

const getPrograms = async ({
    page,
    limit,
    search,
    campType,
    category,
    operateLocation,
}) => {
    // TODO: 야래 코드는 mock 데이터 핸들링 코드입니다. 추후 API 연결 작업시 지워질 예정입니다.

    await delay(DELAY_TIME);

    const data = PROGRAMS;
    const filteredData = data.filter(
        ({
            name,
            type,
            category: originatlCategory,
            operateLocation: originalOperateLocation,
        }) => {
            const isNameMatched = !search || name.includes(search);
            const isCampTypeMatched = !campType || type.camp === campType;
            const isCategoryMatched =
                !category || originatlCategory === category;
            const isOperateLocationMatched =
                !operateLocation || originalOperateLocation === operateLocation;

            return (
                isNameMatched &&
                isCampTypeMatched &&
                isCategoryMatched &&
                isOperateLocationMatched
            );
        },
    );
    const paginatedData = paginateArray(filteredData, page, limit);
    const newData = { items: paginatedData, total: filteredData.length };

    return newData;
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
export default { getInstitutions, getPrograms, createProgram };
