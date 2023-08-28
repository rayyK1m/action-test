import _isEmpty from 'lodash/isEmpty';
import { CAMP_KEYS } from '../../CampForms/CampForms.constants';

export const getDefaultValues = (campInfo, program) => {
    if (_isEmpty(campInfo))
        return {
            programId: program.id,
            [CAMP_KEYS.typeKey]: program.type,
            [CAMP_KEYS.programNameKey]: program.name,
            [CAMP_KEYS.operateLocationKey]: program.operateLocation,
            [CAMP_KEYS.categoryKey]: program.category,
            [CAMP_KEYS.difficultyKey]: program.difficulty,
            [CAMP_KEYS.elementaryTargetKey]: [],
            [CAMP_KEYS.middleTargetKey]: [],
            [CAMP_KEYS.highTargetKey]: [],
            [CAMP_KEYS.learningTimeKey]: program.learningTime,
            [CAMP_KEYS.educationStartDateKey]: program.educationDate.start,
            [CAMP_KEYS.educationStartTimeKey]: program.educationDate.start,
            [CAMP_KEYS.educationEndDateKey]: program.educationDate.end,
            [CAMP_KEYS.educationEndTimeKey]: program.educationDate.end,
            [CAMP_KEYS.educationLocationNameKey]:
                program.educationLocation?.name,
            [CAMP_KEYS.educationLocationAddressKey]:
                program.educationLocation?.address,
        };

    return campInfo;
};
