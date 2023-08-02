import { PROGRAM_DIVISION } from '@/constants/db';
import { setDateWithTime } from '@/utils';

export const formatData = (data) => {
    const {
        type,
        applyStartDate,
        applyStartTime,
        applyEndDate,
        applyEndTime,
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

    const applyStart = setDateWithTime(applyStartDate, applyStartTime);
    const applyEnd = setDateWithTime(applyEndDate, applyEndTime);
    const educationStart = setDateWithTime(
        educationStartDate,
        educationStartTime,
    );
    const educationEnd = setDateWithTime(educationEndDate, educationEndTime);
    const formData = {
        type,
        targetGroup: {
            elementarySchool,
            middleSchool,
            highSchool,
        },
        applyDate: {
            start: applyStart,
            end: applyEnd,
        },
        educationDate: {
            start: educationStart,
            end: educationEnd,
        },
        attachedFiles: [attachedFiles],
        ...(type === PROGRAM_DIVISION.집합형
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
