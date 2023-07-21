import dayjs from 'dayjs';
import { PERIOD_FORMAT, TIME_ZONE_SEOUL } from '@/constants/common';

export const formatDate = (date) => {
    if (!date) return null;
    const formattedDate = dayjs(date).tz(TIME_ZONE_SEOUL).format(PERIOD_FORMAT);

    return formattedDate;
};

export const setDateWithTime = (date, time) => {
    const h = dayjs(time).get('hour');
    const m = dayjs(time).get('minute');

    return dayjs(date).set('hour', h).set('minute', m).format();
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
 * 같은 페이지 라우트 내부에서 필터링 등의 이유로 shallow 라우팅이 필요할 때 사용
 *
 * @param {import('next/router').NextRouter} router
 * @param {Object} query
 */
export const routerPushShallow = (router, query) => {
    router.push(
        {
            query: {
                ...router.query,
                ...query,
            },
        },
        undefined,
        { shallow: true },
    );
};

export const convertImageToBase64 = (file, fileType) => {
    const mediaType = fileType || file?.type;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            const dataUrl = `data:${mediaType};base64,${base64String}`;
            resolve(dataUrl);
        };
        reader.onerror = () => {
            reject(new Error('이미지 변환에 실패헸습니다'));
        };
        reader.readAsDataURL(file);
    });
};

/**
 *
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
