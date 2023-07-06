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
