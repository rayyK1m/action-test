// import axios from 'axios';
// import qs from 'qs';
import { paginateArray, delay } from '../../dummy/utils';

const MOCK_DATA = [
    {
        id: 'prog_oUOrd_1687395960877',
        type: {
            division: '방문형',
            duration: '장기',
        },
        name: '인간을 돕는 드론 에이전트',
        reviewStatus: 1,
        institution: {
            index: 'inst1',
            name: 'inst1',
        },
        campUserTicketCount: 0,
        campCount: 1,
    },
    {
        id: 'prog_oUOrd_1687395960878',
        type: {
            division: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 2,
        institution: {
            index: 'inst2',
            name: 'inst2',
        },
        campUserTicketCount: 31,
        campCount: 2,
    },
    {
        id: 'prog_oUOrd_1687395960879',
        type: {
            division: '집합형',
            duration: '장기',
        },
        name: '제주교대(신화월드) 상반기 새싹캠프 인공지능 올림픽',
        reviewStatus: 3,
        institution: {
            index: 'inst3',
            name: 'inst3',
        },
        campUserTicketCount: 0,
        campCount: 3,
    },
    {
        id: 'prog_oUOrd_1687395960880',
        type: {
            division: '방문형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 2,
        institution: {
            index: 'inst4',
            name: 'inst4',
        },
        campUserTicketCount: 1,
        campCount: 4,
    },
    {
        id: 'prog_oUOrd_1687395960881',
        type: {
            division: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 2,
        institution: {
            index: 'inst5',
            name: 'inst5',
        },
        campUserTicketCount: 5,
        campCount: 5,
    },
    {
        id: 'prog_oUOrd_16873959608851',
        type: {
            division: '집합형',
            duration: '단기',
        },
        name: '카카오엔터프라이즈 2023 스프링 SW 캠프',
        reviewStatus: 2,
        institution: {
            index: 'inst6',
            name: 'inst6',
        },
        campUserTicketCount: 6,
        campCount: 6,
    },
    {
        id: 'prog_iLMBV5kQaSCbuGrbXN3AC',
        type: {
            division: '집합형',
            duration: '장기',
        },
        name: 'program2 - inst1',
        reviewStatus: 1,
        institution: {
            index: 'inst7',
            name: 'inst7',
        },
        campUserTicketCount: 0,
        campCount: 7,
    },
];

export const getProgramsAdmin = async (query) => {
    await delay(500);
    // const queryString = qs.stringify(query, { skipNulls: true });
    // const { data } = await axios.get(
    //     `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/admin?${queryString}`,
    // );

    const FILTERED_MOCK_DATA = MOCK_DATA.filter(
        ({ name = '', institution }) => {
            if (!query?.search) return true;
            const pattern = new RegExp(query?.search);
            return pattern.test(name) || pattern.test(institution?.name || '');
        },
    );

    const PAGINATED_MOCK_DATA = paginateArray(
        FILTERED_MOCK_DATA,
        query.page,
        query.limit,
    );

    return {
        data: PAGINATED_MOCK_DATA,
        totalCount: FILTERED_MOCK_DATA.length,
    };
};
