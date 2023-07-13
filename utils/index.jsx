import dayjs from 'dayjs';

export const formatDate = (date) => {
    if (!date) return null;
    const formattedDate = dayjs(date).format('MM월 YY일 (ddd) HH:mm');

    return formattedDate;
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
