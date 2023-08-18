import { setDateWithTime } from '@/utils';

export const formatTeacherData = (data) => {
    const {
        schoolType,
        startDate,
        startTime,
        endDate,
        endTime,
        applicantCount,
        ...rest
    } = data;

    const start = setDateWithTime(startDate, startTime);
    const end = setDateWithTime(endDate, endTime);

    const formData = {
        ...(schoolType ? { schoolType } : {}),
        educationDate: {
            start,
            end,
        },
        applicantCount: Number(applicantCount),
        ...rest,
    };

    return formData;
};
