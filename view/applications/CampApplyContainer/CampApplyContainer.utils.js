import { setDateWithHourAndMinute } from '@/utils';

export const formatTeacherData = (data) => {
    const { schoolType, startDate, endDate, applicantCount, ...rest } = data;

    const formData = {
        ...(schoolType ? { schoolType } : {}),
        educationDate: {
            start: startDate,
            end: setDateWithHourAndMinute(endDate, 23, 59),
        },
        applicantCount: Number(applicantCount),
        ...rest,
    };

    return formData;
};
