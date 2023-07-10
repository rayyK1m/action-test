import axios from 'axios';
import qs from 'qs';
import { paginateArray, delay } from '../../dummy/utils';

const mockData = {
    campTickets: [
        {
            index: 'c_index1',
            id: 1,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_usRUB_1677058347843/coverImage.jpg?_=1686883839484',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽',
            applyDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            channelIndex: 'goormschool',
            reviewStatus: 2, // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index2',
            id: 2,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_usRUB_1677058347843/coverImage.jpg?_=1686883839484',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽222',
            applyDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            channelIndex: 'edu',
            reviewStatus: 3, // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index3',
            id: 3,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽333',
            applyDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            channelIndex: 'goormscholl',
            reviewStatus: 1, // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index34',
            id: 4,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽333',
            applyDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            channelIndex: 'goormscholl',
            reviewStatus: 1, // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index35',
            id: 5,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽333',
            applyDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            channelIndex: 'goormscholl',
            reviewStatus: 2, // 승인 상태 [거절, 심사중, 승인]
        },
        {
            index: 'c_index36',
            id: 6,
            thumbnail:
                'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lecture/lec_DJrMa_1659488541120/coverImage.png',
            name: '제주교대 (신화월드) 상반기 새싹캠프 인공지능 올림픽333',
            applyDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
            },
            channelIndex: 'goormscholl',
            reviewStatus: 1, // 승인 상태 [거절, 심사중, 승인]
        },
    ],
    campType: '방문형', // [방문형, 집합형] - 둘 중에 하나의 종류로만 캠프가 구성될 수 있으므로 BFF에서 함께 넘겨주면 됨
    totalCount: 6,
};
const getCampTickets = async (query) => {
    await delay(2000);
    const queryString = qs.stringify(query, { skipNulls: true });
    const { data } = await axios.get(
        `${process.env.MAIN_HOST}/api/camp-tickets?${queryString}`,
    );

    let filteredData = mockData.campTickets;
    if (query.status) {
        filteredData = filteredData.filter(
            (campTicket) => campTicket.reviewStatus === query.status,
        );
    }
    return {
        campTickets: paginateArray(filteredData, query?.page || 1, 5),
        campType: mockData.campType,
        totalCount: filteredData.length,
    };
};

const campTicketsApis = {
    getCampTickets,
};
export default campTicketsApis;
