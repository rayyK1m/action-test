import { PROGRAM_DIVISION } from '@/constants/db';
import { setDateWithHourAndMinute } from '@/utils';

export const formatData = (data, division) => {
    const {
        duration,
        applyStartDate,
        applyEndDate,
        educationStartDate,
        educationStartTime,
        educationEndDate,
        educationEndTime,
        elementarySchool,
        middleSchool,
        highSchool,
        attachedFiles,
        educationLocationName = undefined,
        educationLocationAddress = undefined,
        ...rest
    } = data;

    const formData = {
        type: { division, duration },
        targetGroup: {
            elementarySchool,
            middleSchool,
            highSchool,
        },
        applyDate: {
            start: applyStartDate,
            end: setDateWithHourAndMinute(applyEndDate, 23, 59),
        },
        educationDate: {
            start: educationStartDate,
            end: setDateWithHourAndMinute(educationEndDate, 23, 59),
        },
        attachedFiles: [attachedFiles],
        ...(division === PROGRAM_DIVISION.집합형
            ? {
                  educationLocation: {
                      name: educationLocationName,
                      address: educationLocationAddress,
                  },
              }
            : {}),
        ...rest,
    };

    return formData;
};
