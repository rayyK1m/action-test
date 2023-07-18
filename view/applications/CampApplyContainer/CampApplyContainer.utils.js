import { setDateWithTime } from '@/utils';

export const formatTeacherData = (data) => {
    const {
        mainEducator,
        subEducator,
        schoolType,
        startDate,
        startTime,
        endDate,
        endTime,
        applicantCount,
        ...rest
    } = data;
    const hasEducatorField = data.mainEducator || data.subEducator;

    const start = setDateWithTime(startDate, startTime);
    const end = setDateWithTime(endDate, endTime);

    const formData = {
        ...(hasEducatorField
            ? {
                  educator: {
                      ...(mainEducator ? { main: mainEducator } : {}),
                      ...(subEducator ? { sub: subEducator } : {}),
                  },
              }
            : {}),
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
