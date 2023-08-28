import { PROGRAM_APPLY_KEYS } from '../program.contants';
import { setDateWithTime } from '@/utils';
import { PROGRAM_DIVISION } from '@/constants/db';

export const getDefaultValues = (program) => {
    return {
        [PROGRAM_APPLY_KEYS.nameKey]: program.name,
        [PROGRAM_APPLY_KEYS.thumbnailKey]: program.thumbnail,
        [PROGRAM_APPLY_KEYS.durationKey]: program.type.duration,
        [PROGRAM_APPLY_KEYS.categoryKey]: program.category,
        [PROGRAM_APPLY_KEYS.difficultyKey]: program.difficulty,
        [PROGRAM_APPLY_KEYS.descriptionKey]: program.description,
        [PROGRAM_APPLY_KEYS.operateLocationKey]: program.operateLocation,
        [PROGRAM_APPLY_KEYS.contactKey]: program.contact,
        [PROGRAM_APPLY_KEYS.applyStartDateKey]: program.applyDate.start,
        [PROGRAM_APPLY_KEYS.applyStartTimeKey]: program.applyDate.start,
        [PROGRAM_APPLY_KEYS.applyEndDateKey]: program.applyDate.end,
        [PROGRAM_APPLY_KEYS.applyEndTimeKey]: program.applyDate.end,
        [PROGRAM_APPLY_KEYS.educationStartDateKey]: program.educationDate.start,
        [PROGRAM_APPLY_KEYS.educationStartTimeKey]: program.educationDate.start,
        [PROGRAM_APPLY_KEYS.educationEndDateKey]: program.educationDate.end,
        [PROGRAM_APPLY_KEYS.educationEndTimeKey]: program.educationDate.end,
        [PROGRAM_APPLY_KEYS.elementaryTargetKey]:
            program.targetGroup.elementarySchool,
        [PROGRAM_APPLY_KEYS.middleTargetKey]: program.targetGroup.middleSchool,
        [PROGRAM_APPLY_KEYS.highTargetKey]: program.targetGroup.highSchool,
        [PROGRAM_APPLY_KEYS.educationLocationNameKey]:
            program.educationLocation?.name,
        [PROGRAM_APPLY_KEYS.educationLocationAddressKey]:
            program.educationLocation?.address,
        [PROGRAM_APPLY_KEYS.curriculumKey]: program.curriculum,
        [PROGRAM_APPLY_KEYS.learningTimeKey]: program.learningTime,
        [PROGRAM_APPLY_KEYS.attachedFilesKey]: program.attachedFiles[0],
        [PROGRAM_APPLY_KEYS.noticeKey]: program.notice,
    };
};

export const formatProgramData = (data, division) => {
    const {
        duration,
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
        type: { duration },
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
