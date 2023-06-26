import dayjs from 'dayjs';

export const formatDate = (date) => {
    if (!date) return null;
    const formattedDate = dayjs(date).format('MM월 YY일 (ddd) HH:mm');

    return formattedDate;
};
