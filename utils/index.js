import dayjs from 'dayjs';
import { PERIOD_FORMAT, TIME_ZONE_SEOUL } from '@/constants/common';

export const formatDate = (date) => {
    if (!date) return null;
    const formattedDate = dayjs(date).tz(TIME_ZONE_SEOUL).format(PERIOD_FORMAT);

    return formattedDate;
};

/**
 * @param {String} sort -name,reviewStatus
 * @returns {{ id: String, desc: Boolean }[]} [{ id: name, desc: true }, { id: reviewStatus, desc: fales }]
 */
export const convertSort = (sort) => {
    if (!sort) {
        return [];
    }
    const sorts = sort.split(',');

    return sorts.map((sort) => {
        const isDesc = sort.includes('-');
        const sortId = sort.replace('-', '');
        return { id: sortId, desc: isDesc };
    });
};

/**
 * Object에서 empty value를 제거한다.
 * @param {Object} obj - empty value를 제거할 Object
 * @returns {Object} - empty value가 제거된 Object
 */
export const removeEmptyValues = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.filter(Boolean).map(removeEmptyValues);
    }

    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (value !== '' && value !== undefined && value !== null) {
            acc[key] = removeEmptyValues(value);
        }
        return acc;
    }, {});
};
