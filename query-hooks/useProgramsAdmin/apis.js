import axios from 'axios';
import qs from 'qs';
import { paginateArray, delay } from '../../dummy/utils';

const MOCK_DATA = [
    {
        id: 'prog_oUOrd_1687395960877',
        type: {
            division: '방문형',
            duration: '장기',
        },
        name: '인간을 돕는 드론 에이전트',
        reviewStatus: 'IN_PROGRESS',
    },
    {
        id: 'prog_oUOrd_1687395960878',
        type: {
            division: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 'ACCEPT',
    },
    {
        id: 'prog_oUOrd_1687395960879',
        type: {
            division: '집합형',
            duration: '장기',
        },
        name: '제주교대(신화월드) 상반기 새싹캠프 인공지능 올림픽',
        reviewStatus: 'REJECT',
    },
    {
        id: 'prog_oUOrd_1687395960880',
        type: {
            division: '방문형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 'ACCEPT',
    },
    {
        id: 'prog_oUOrd_1687395960881',
        type: {
            division: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 'ACCEPT',
    },
    {
        id: 'prog_oUOrd_16873959608851',
        type: {
            division: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 'ACCEPT',
    },
    {
        institutionId: 'inst1',
        reviewStatus: 'IN_PROGRESS',
        name: 'program2 - inst1',
        type: {
            division: '집합형',
            duration: '장기',
        },
        id: 'prog_iLMBV5kQaSCbuGrbXN3AC',
        institution: {
            index: 'inst1',
            name: 'inst1234',
        },
    },
];

export const getProgramsAdmin = async (query) => {
    await delay(2000);
    const queryString = qs.stringify(query, { skipNulls: true });
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/admin?${queryString}`,
    );

    return {
        data: paginateArray(MOCK_DATA, query.page, query.limit),
        totalCount: 7,
    };
};
