import axios from 'axios';
import dayjs from 'dayjs';
import { PERIOD_FORMAT, TIME_ZONE_SEOUL } from '@/constants/common';

export const formatDate = (date) => {
    if (!date) return null;
    const formattedDate = dayjs(date).tz(TIME_ZONE_SEOUL).format(PERIOD_FORMAT);

    return formattedDate;
};

export const addDay = (date, day) => {
    if (!date || !day) return null;
    return dayjs(new Date(date)).add(day, 'day').format();
};

export const setDateWithTime = (date, time) => {
    const h = dayjs(time).get('hour');
    const m = dayjs(time).get('minute');

    return dayjs(date).set('hour', h).set('minute', m).format();
};

/** Input 입력 시 Number 외의 값이 입력되는 것을 방지하기 위한 유틸함수 */
export const formatNumberInput = (e) => {
    e.target.value = e.target.value
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*)\./g, '$1');
};

/** Input 입력 시 핸드폰 번호 형식(000-0000-0000)으로 입력받기 위한 유틸함수 */
export const formatPhoneNumberInput = (e) => {
    e.target.value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
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

export const isEmpty = (value) => {
    /**
     * 서버에서 lodash 사용 시 빌드 오류가 나서 우선 직접 구현한 함수 추가
     */
    if (value == null) {
        return true;
    }

    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
};

/**
 * 서버에서 사용할 Axios 인스턴스를 생성한다.
 * getServerSideProps에서 사용할 수 있으며, context를 넘겨주어 필요한 쿠키를 설정할 수 있다.
 *
 * @param {GetServerSidePropsContext} context
 * @returns {AxiosInstance}
 */
export const createServerAxios = (context) => {
    return axios.create({
        headers: {
            cookie: context.req.headers.cookie,
        },
    });
};

/**
 * 문자열을 받아 url slug에 사용 가능한 형태로 반환한다.
 *
 * @param {Stirng} text
 * @returns {String}
 */
export const slugify = (text) => {
    return (
        text
            .toLowerCase()
            // 영문자, 숫자, 한글, 하이픈(-)을 제외한 모든 문자를 공백으로 변환
            .replace(/[^\w\s가-힣-]/g, '')
            // 공백을 하이픈(-)으로 변환
            .replace(/\s+/g, '-')
            // 연속적인 하이픈은 하나의 하이픈으로 변경
            .replace(/-+/g, '-')
            // 양쪽의 하이픈 제거
            .replace(/^-+|-+$/g, '')
    );
};

/**
 * 문자열과 최대 길이를 받아서 최대 길이를 넘어갈 경우 '...'으로 변경한 값을 반환한다.
 *
 * @param {String} string
 * @param {Number} maxLength
 * @returns {String}
 */
export const ellipsisedString = (string, maxLength) => {
    if (!string) {
        return '';
    }
    if (string.length <= maxLength) {
        return string;
    } else {
        return string.slice(0, maxLength) + '...';
    }
};

/**
 *
 * @param {Array<number>} target 숫자로 구성된 타겟 학생 배열
 * @param {String} joinUnit 구분자
 * @param {String} prefix
 * @returns {String}
 */
export const joinToGradeString = (target, joinUnit, prefix) => {
    const arrayWithGrade = target.map((grade) => `${grade}학년`);

    return prefix + arrayWithGrade.join(joinUnit);
};

/**
 * query 객체를 queryString으로 변환한다.
 *
 * @param {Object} query
 * @returns {String}
 */
export const queryStringify = (query) =>
    Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join('&');

/**
 *
 * @param {Array<number>} elementarySchool 숫자로 구성된 타겟 학생 배열
 * @param {Array<number>} middleSchool 숫자로 구성된 타겟 학생 배열
 * @param {Array<number>} highSchool 숫자로 구성된 타겟 학생 배열
 * @returns {String} ex) '중학교 3학년,\n고등학교 1학년, 2학년'
 */
export const getTargetGroupString = (
    elementarySchool,
    middleSchool,
    highSchool,
) => {
    let elementaryTarget = '';
    let middleTarget = '';
    let highTarget = '';
    if (elementarySchool.length > 0) {
        elementaryTarget = joinToGradeString(
            elementarySchool,
            ', ',
            '초등학생 ',
        );
    }
    if (middleSchool.length > 0) {
        middleTarget = joinToGradeString(middleSchool, ', ', '중학생 ');
    }
    if (highSchool.length > 0) {
        highTarget = joinToGradeString(highSchool, ', ', '고등학생 ');
    }
    const targetString = [elementaryTarget, middleTarget, highTarget]
        .filter((target) => target !== '')
        .join('\n');

    return targetString;
};

/**
 * 인자로 받은 pathname을 파싱하여 /foundation 경로를 포함하고 있는 재단 어드민 페이지인지 확인
 *
 * @param {String} pathname
 * @returns {Boolean}
 */
export const checkIsFoundationPage = (pathname) => {
    const isFoundationPage = pathname.split('/').includes('foundation');

    return isFoundationPage;
};

/** Input maxLength 제한이 적용되지 않는 문제를 해결하기 위한 유틸함수  */
export const numberMaxLength = (e) => {
    if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
};
