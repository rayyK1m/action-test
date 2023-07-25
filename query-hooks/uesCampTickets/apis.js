import axios from 'axios';
import qs from 'qs';
import _omit from 'lodash/omit';
import { paginateArray, delay } from '../../dummy/utils';

const getCampTickets = async ({ query }, axiosInstance = axios) => {
    const queryString = qs.stringify(query, { skipNulls: true });
    const {
        data: { campTickets, campType, totalCount },
    } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets?${queryString}`,
    );

    return {
        campTickets,
        campType,
        totalCount,
    };
};

const getCampTicket = async (query) => {
    const { id, userId } = query;

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/${id}?userId=${userId}`,
    );
    return data;
};

const getCampTicketsCount = async () => {
    const { data } = await axios.get('/api/camp-tickets/active-count');
    return data;
};

const createCampTicket = async (query) => {
    const { role, userId, formData } = query;
    const queryString = qs.stringify({ role, userId });

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/new?${queryString}`,
        formData,
    );

    return data;
};

const cancelCampTicket = async (query) => {
    const { id, userId } = query;

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camp-tickets/${id}/cancel?userId=${userId}`,
    );
    return data;
};

const mockDataAdmin = {
    items: [
        {
            programId: 'prog_LnvpyHKQEaBferti94Tkf',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 2,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1, 2, 3, 4],
                middleSchool: [1, 2],
                highSchool: [3],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 2,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1, 2],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 3,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [6],
                middleSchool: [1, 2, 3],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 4,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
        {
            programId: 'prog_QoJVpViAmSFG2bzmdVSze2',
            institutionId: 'inst1',
            programDivision: '방문형',
            reviewStatus: 1,
            userId: 'teacher1',
            userName: '김학생',
            operateLocation: '경기도',
            schoolIndex: 'school1',
            educator: {
                sub: [],
            },
            targetGroup: {
                elementarySchool: [1],
                middleSchool: [],
                highSchool: [],
            },
            expectedUserCount: 14,
            educationDate: {
                start: '2023-01-01T00:00:00.000Z',
                end: '2023-01-20T00:00:00.000Z',
            },
            createdAt: '2023-07-06T09:17:51.064Z',
            updatedAt: '2023-07-06T09:17:51.064Z',
            id: 'camp-ticket_fkyo9Ip-VXW8NIPp_-M0S',
            __v: 0,
            program: {
                thumbnail: '1',
                name: 'program9123',
                type: {
                    division: '방문형',
                    duration: '장기',
                },
                applyDate: {
                    start: '2023-03-01T00:00:00.000Z',
                    end: '2024-05-01T00:00:00.000Z',
                },
                educationDate: {
                    start: '2023-01-01T00:00:00.000Z',
                    end: '2023-12-01T00:00:00.000Z',
                },
                createdAt: '2023-07-06T09:16:56.404Z',
                updatedAt: '2023-07-06T09:17:19.883Z',
                id: 'prog_LnvpyHKQEaBferti94Tkf',
            },
            email: 'email4@email.com',
            phoneNumber: '010-1234-5678',
        },
    ],
    total: 12,
};
export const getCampticketsAdmin = async (query) => {
    const { programId } = query;

    const queryString = qs.stringify(_omit(query, 'programId'), {
        skipNulls: true,
    });

    const { data } = axios.get(
        `${process.env.MAIN_HOST}/api/v1/camps/tickets/programs/${programId}/admin?${queryString}`,
    );

    return (
        {
            items: paginateArray(mockDataAdmin.items, query?.page || 1, 10),
            totalCount: mockDataAdmin.total,
            programDivision: '집합형',
        } || null
    );
};

const campTicketsApis = {
    getCampTickets,
    getCampTicket,
    getCampTicketsCount,
    createCampTicket,
    cancelCampTicket,
    getCampticketsAdmin,
};
export default campTicketsApis;
