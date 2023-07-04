import dayjs from 'dayjs';

const formatNto0N = (number) => {
    if (number / 10 < 1) {
        return `0${number}`;
    } else return `${number}`;
};

/**
 * 년도, 월, 일이 담긴 상수 리스트를 object 형식으로 반환
 * @param {Number} startYear 년도의 시작 년도 (default 현재 년도)
 * @param {Number} length 시작 년도를 포함하여, 구성하고자 하는 년도 리스트의 개수 (default 2개)
 * ex) generateDatList(2022, 3)일 경우 years: [2022, 2023, 2024]
 */
export const generateDateList = (startYear, length = 2) => {
    const year = startYear ?? dayjs(new Date()).year();

    const years = new Array(length + 1)
        .fill({ index: 0, key: 'year', text: '년도' })
        .map((data, idx) => (idx === 0 ? data : year + --idx));
    const months = new Array(13)
        .fill({ index: 1, key: 'month', text: '월' })
        .map((data, idx) => (idx === 0 ? data : formatNto0N(idx)));
    const days = new Array(32)
        .fill({ index: 2, key: 'day', text: '일' })
        .map((data, idx) => (idx === 0 ? data : formatNto0N(idx)));

    return { years, months, days };
};

/**
 * 시간, 분이 담긴 상수 리스트를 object 형식으로 반환
 * @param {Number} minuteTerm 분 단위 간격 (default 5분)
 */
export const generateTimeList = (minuteTerm = 5) => {
    const ampm = ['오전', '오후'];
    const hours = new Array(12).fill().map((data, idx) => formatNto0N(idx + 1));
    const minutes = new Array(60 / minuteTerm - 1)
        .fill()
        .map((data, idx) => formatNto0N(idx * minuteTerm));

    return { ampm, hours, minutes };
};
