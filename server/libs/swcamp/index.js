import axios from 'axios';
import qs from 'query-string';
import { removeEmptyValues } from '@/utils';

import ForbiddenError from '../../utils/error/ForbiddenError';
import ExternalResponseError from '../../utils/error/ExternalResponseError';
import { getAuthHeader } from '../../utils/auth';
import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';

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

const getCampTicketAdmin = async ({ ticketId, userId, institutionId }) => {
    try {
        const institutionQueryString = institutionId
            ? `institutionId=${institutionId}`
            : '';

        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/${ticketId}/admin?${institutionQueryString}`,
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
    reviewStatus,
}) => {
    const queryString = qs.stringify(
        {
            page,
            limit,
            search,
            sort,
            reviewStatus,
        },
        { skipNulls: true, skipEmptyString: true },
    );
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
    console.log(institutionId, userId);
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

const changeProgramReviewStatus = async ({
    userId,
    programId,
    institutionId,
    status,
}) => {
    try {
        const queryString = qs.stringify(
            { institutionId },
            { skipNulls: true },
        );

        const { data } = await swcampInstance.post(
            `/api/v1/programs/${programId}/review-status?${queryString}`,
            { status },
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

/** 캠프 리스트 조회 (어드민용) */
const getCamps = async ({
    userId,
    programId,
    institutionId,
    page,
    limit,
    sort,
}) => {
    const removedEmptyQuery = removeEmptyValues({
        institutionId,
        page,
        limit,
        sort,
    });
    const queryString = qs.stringify(removedEmptyQuery, { skipNulls: true });
    try {
        const { data } = await swcampInstance.get(
            `/api/v1/camps/programs/${programId}/admin?${queryString}`,
            {
                headers: {
                    ...getAuthHeader(userId),
                },
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

/** 캠프 개별 조회 (어드민용) */
const getCamp = async ({ userId, campId, institutionId }) => {
    try {
        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/camps/${campId}/admin?institutionId=${institutionId}`,
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

/** 캠프 복사 */
const copyCamp = async ({ userId, campId, institutionId }) => {
    const removedEmptyQuery = removeEmptyValues({
        institutionId,
    });

    const queryString = qs.stringify(removedEmptyQuery, { skipNulls: true });

    try {
        const { data } = await swcampInstance.post(
            `/api/v1/camps/${campId}/copy?${queryString}`,
            {},
            {
                headers: {
                    ...getAuthHeader(userId),
                },
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

/** 캠프 삭제 */
const deleteCamps = async ({ userId, campIds, institutionId }) => {
    const removedEmptyQuery = removeEmptyValues({
        campId: campIds,
        institutionId,
    });

    const queryString = qs.stringify(removedEmptyQuery, { skipNulls: true });

    try {
        const { data } = await swcampInstance.delete(
            `/api/v1/camps?${queryString}`,
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

const getCampClasses = async ({ userId, institutionId, programId }) => {
    const { data } = await swcampInstance.get(
        `/api/v1/camps/class/programs/${programId}?institutionId=${institutionId}`,
        {
            headers: { ...getAuthHeader(userId) },
        },
    );

    return data;
};

const addCampParticipants = async ({
    userId,
    institutionId,
    campId,
    campTicketIdList,
}) => {
    try {
        const { data } = await swcampInstance.post(
            `/api/v1/camps/${campId}/students?institutionId=${institutionId}`,
            {
                campTicketIdList,
            },
            {
                headers: {
                    authorization: `bearer ${process.env.SWCAMP_API_TOKEN}`,
                    ...getAuthHeader(userId),
                },
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

const deleteCampParticipants = async ({
    userId,
    institutionId,
    campId,
    campTicketIdList,
}) => {
    try {
        const { data } = await swcampInstance.delete(
            `/api/v1/camps/${campId}/students?institutionId=${institutionId}`,
            {
                headers: {
                    authorization: `bearer ${process.env.SWCAMP_API_TOKEN}`,
                    ...getAuthHeader(userId),
                },
                data: {
                    campTicketIdList,
                },
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

const createCamp = async ({ userId, formData }) => {
    try {
        const { data } = await swcampInstance.post(
            `${process.env.SWCAMP_API_HOST}/api/v1/camps/type/group`,
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

const patchCamp = async ({ userId, institutionId, campId, formData }) => {
    try {
        const { data } = await swcampInstance.patch(
            `${process.env.SWCAMP_API_HOST}/api/v1/camps/${campId}`,
            { ...formData, institutionId },
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

const getCampTicketHistory = async ({ userId, programId }) => {
    try {
        const { data } = await swcampInstance.get(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/programs/${programId}/my`,
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
    containCampId,
}) => {
    try {
        const queryString = qs.stringify(
            {
                page,
                limit,
                search,
                sort,
                reviewStatus,
            },
            { skipNulls: true, skipEmptyString: true },
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

const getCampParticipants = async ({
    userId,
    institutionId,
    campId,
    page,
    limit,
    sort,
    search,
}) => {
    try {
        const queryString = qs.stringify(
            {
                institutionId,
                page,
                limit,
                sort,
                search,
            },
            { skipNulls: true },
        );

        const { data } = await swcampInstance.get(
            `/api/v1/camp-tickets/camps/${campId}?${queryString}`,
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

const changeCampTicketStatus = async ({
    ticketId,
    userId,
    institutionId,
    status,
}) => {
    try {
        const { data } = await swcampInstance.post(
            `${process.env.SWCAMP_API_HOST}/api/v1/camp-tickets/${ticketId}/review-status?institutionId=${institutionId}`,
            status,
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

const moveCampTickets = async ({
    userId,
    institutionId,
    originCampId,
    newCampId,
    campTicketIdList,
}) => {
    try {
        const { data } = await swcampInstance.patch(
            `/api/v1/camp-tickets/move?institutionId=${institutionId}`,
            {
                originCampId,
                newCampId,
                campTicketIdList,
            },
            {
                headers: {
                    authorization: `bearer ${process.env.SWCAMP_API_TOKEN}`,
                    ...getAuthHeader(userId),
                },
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

const getInstitutionAdmin = async ({ institutionId, userId }) => {
    try {
        const { data } = await swcampInstance.get(
            `/api/v1/institutions/${institutionId}/institution`,
            {
                headers: {
                    ...getAuthHeader(userId),
                },
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

export const getInstitutionsFoundation = async ({
    userId,
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

    try {
        const { data } = await swcampInstance.get(
            `/api/v1/institutions/foundation?${queryString}`,
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

const submitReports = async ({ userId, institutionId, fileObject }) => {
    try {
        const { data } = await swcampInstance.post(
            `/api/v1/institutions/${institutionId}/reports`,
            { fileObject },
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

const patchReports = async ({ userId, institutionId, fileObject }) => {
    try {
        const { data } = await swcampInstance.patch(
            `/api/v1/institutions/${institutionId}/reports`,
            { fileObject },
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

const submitExtraReports = async ({ userId, institutionId, fileObject }) => {
    try {
        const { data } = await swcampInstance.post(
            `/api/v1/institutions/${institutionId}/extra-reports`,
            { fileObject },
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

const submitReportReview = async ({
    userId,
    institutionId,
    reviewStatus,
    feedback,
}) => {
    try {
        const body =
            reviewStatus === REQUIRED_FILE_SUBMIT_STATUS.승인.key
                ? { reviewStatus }
                : { reviewStatus, feedback };

        const { data } = await swcampInstance.post(
            `/api/v1/institutions/${institutionId}/review-status`,
            body,
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

const postCampReport = async ({
    /**
     * reportType = "preFileReport" | "postFileReport" | "postReport"
     */
    reportType,
    userId,
    institutionId,
    campId,
    formData,
}) => {
    try {
        const { data } = await swcampInstance.post(
            `/api/v1/camps/${campId}/reports?institutionId=${institutionId}`,
            {
                [reportType]: { ...formData },
            },
            {
                headers: {
                    ...getAuthHeader(userId),
                },
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
    changeProgramReviewStatus,

    /**
     * Institution
     */
    getInstitutions,
    getInstitution,
    getInstitutionAdmin,
    getInstitutionsFoundation,
    submitReports,
    patchReports,
    submitExtraReports,
    submitReportReview,

    /**
     * Camp
     */
    getCamp,
    getCamps,
    copyCamp,
    deleteCamps,
    getCampClasses,
    addCampParticipants,
    deleteCampParticipants,
    createCamp,
    patchCamp,
    postCampReport,

    /**
     * CampTicket
     */
    getCampTickets,
    getCampTicket,
    getCampTicketAdmin,
    cancelCampTicket,
    getCampTicketsCount,
    createCampTicket,
    getCampTicketHistory,
    getCampTicketsByProgram,
    getCampParticipants,
    moveCampTickets,
    changeCampTicketStatus,

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
