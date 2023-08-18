import { REQUIRED_FILE_SUBMIT_STATUS } from '@/constants/db';
import axios from 'axios';
import qs from 'query-string';

const getInstitutions = async (query) => {
    const queryString = qs.stringify(query, { skipNulls: true });

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions?${queryString}`,
    );

    return data;
};

const getInstitution = async (institutionId) => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}`,
    );

    return data;
};

/**
 *
 * @param {string} institutionId
 * @param {import('axios').AxiosInstance} axiosInstance
 * @returns {Promise<import('./types').InstitutionAdmin>}
 */
const getInstitutionAdmin = async (institutionId, axiosInstance = axios) => {
    const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}/institution`,
    );

    return data;
};

/**
 *
 * @param {*} query
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const getInstitutionsFoundation = async (query, config) => {
    const queryString = qs.stringify(query, { skipNulls: true });

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/foundation?${queryString}`,
        { ...config },
    );

    return data;
};

/**
 * @param {{ institutionId: string; fileObject: { [key: string]: Omit<import('./types').FileObject, 'label'> } }} param
 */
const submitReports = async (param) => {
    const { institutionId, fileObject } = param;

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}/reports`,
        fileObject,
    );

    return data;
};

/**
 * @param {{ institutionId: string; fileObject: { [key: string]: Omit<import('./types').FileObject, 'label'> }; reviewStatus: Exclude<import('./types').ReviewStatus, "SUBMIT" | "NOT_SUBMITTED" | "APPROVE" | "REJECT" | "ADDITIONAL"> }} param
 */
const patchReports = async (param) => {
    const { institutionId, fileObject, reviewStatus } = param;
    const queryString = qs.stringify({ reviewStatus }, { skipNulls: true });

    const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}/reports?${queryString}`,
        { fileObject },
    );

    return data;
};

/**
 * @param {{ institutionId: string; fileObject: { [key: string]: Omit<import('./types').FileObject, 'label'> } }} param
 */
const submitExtraReports = async (param) => {
    const { institutionId, fileObject } = param;

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}/extra-reports`,
        fileObject,
    );

    return data;
};

/**
 * @typedef SubmitReportReviewParam
 * @property {string} institutionId
 * @property {Exclude<import('./types').ReviewStatus, 'SUBMIT' | 'NOT_SUBMITTED' | 'ADDITIONAL_SUBMIT'>} reviewStatus
 * @property {string} feedback
 */
/**
 * @param {SubmitReportReviewParam} param
 */
const submitReportReview = async (param) => {
    const { institutionId, reviewStatus, feedback } = param;
    const queryString = qs.stringify({ institutionId }, { skipNulls: true });

    const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/institutions/${institutionId}/review-status?${queryString}`,
        { reviewStatus, feedback },
    );

    return data;
};

const institutionsApis = {
    getInstitutions,
    getInstitution,
    getInstitutionAdmin,
    getInstitutionsFoundation,
    submitReports,
    patchReports,
    submitExtraReports,
    submitReportReview,
};

export default institutionsApis;
