import ExternalResponseError from '@/server/utils/error/ExternalResponseError';
import axios from 'axios';

const swcampInstance = axios.create({
    baseURL: process.env.SWCAMP_API_HOST,
    headers: {
        // TODO: api server용 토큰이 있다면 추가하기
    },
});

const getProgram = async () => {
    try {
        const { data } = await swcampInstance.get('/sdfsd');
        return data;
    } catch (err) {
        throw new ExternalResponseError({
            message: 'SWCAMP API',
            res: { status: err.response.status, data: err.response.data },
            // NOTE: 디버깅에 필요한 데이터 넣어두기
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

export default { getProgram, createProgram };
