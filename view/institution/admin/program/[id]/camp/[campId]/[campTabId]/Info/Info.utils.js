import _isEmpty from 'lodash/isEmpty';
import { PROGRAM_DIVISION } from '@/constants/db';
import {
    CAMP_INFO_KEYS,
    CAMP_KEYS,
} from '../../../CampForms/CampForms.constants';
import { matchedKey, relationField } from './Info.constants';
import { setDateWithTime } from '@/utils';

export const getDefaultValues = ({ isEdit, data }) => {
    const { program, camp } = data;

    if (!isEdit)
        return {
            ...camp,
            [CAMP_INFO_KEYS.programNameKey]: program.name,
            [CAMP_KEYS.categoryKey]: camp.category || program.category,
        };

    const {
        type: { division },
    } = program;

    const defaultData = {
        [CAMP_KEYS.typeKey]: {
            division: camp.type.division,
            duration: camp.type.duration,
        },
        [CAMP_KEYS.categoryKey]: camp.category || program.category,
        [CAMP_KEYS.programNameKey]: program.name,
        [CAMP_KEYS.operateLocationKey]: camp.operateLocationKey,
        [CAMP_KEYS.managerNameKey]: camp?.managerName,
        [CAMP_KEYS.managerEmailKey]: camp?.managerEmail,
        [CAMP_KEYS.managerPhoneNumberKey]: camp?.managerPhoneNumber,
        [CAMP_KEYS.mainEducatorKey]: camp?.educator.main,
        [CAMP_KEYS.subEducatorKey]: camp?.educator.sub,
        [CAMP_KEYS.elementaryTargetKey]: camp?.targetGroup.elementarySchool,
        [CAMP_KEYS.middleTargetKey]: camp?.targetGroup.middleSchool,
        [CAMP_KEYS.highTargetKey]: camp?.targetGroup.highSchool,
        [CAMP_KEYS.applicantCountKey]: camp?.applicantCount,
        [CAMP_KEYS.educationStartDateKey]: camp.educationDate.start,
        [CAMP_KEYS.educationStartTimeKey]: camp.educationDate.start,
        [CAMP_KEYS.educationEndDateKey]: camp.educationDate.end,
        [CAMP_KEYS.educationEndTimeKey]: camp.educationDate.end,
    };
    return division === PROGRAM_DIVISION.집합형
        ? {
              ...defaultData,
              [CAMP_KEYS.educationLocationNameKey]: camp.educationLocation.name,
              [CAMP_KEYS.educationLocationAddressKey]:
                  camp.educationLocation.address,
          }
        : {
              ...defaultData,
              [CAMP_KEYS.schoolNameKey]: camp.schoolName,
              [CAMP_KEYS.schoolCodeKey]: camp.schoolCodeKey,
              [CAMP_KEYS.schoolTypeKey]: camp?.schoolType,
          };
};

const formatData = (data) => {
    const {
        targetGroup = '',
        educationDate = '',
        educationLocation = '',
        mainEducator = '',
        subEducator = '',
        ...rest
    } = data;
    return {
        ...(targetGroup
            ? {
                  targetGroup: {
                      elementarySchool: targetGroup[0],
                      middleSchool: targetGroup[1],
                      highSchool: targetGroup[2],
                  },
              }
            : {}),
        ...(educationDate
            ? {
                  educationDate: {
                      start: setDateWithTime(
                          educationDate[0],
                          educationDate[1],
                      ),
                      end: setDateWithTime(educationDate[2], educationDate[3]),
                  },
              }
            : {}),
        ...(educationLocation
            ? {
                  educationLocation: {
                      name: educationLocation[0],
                      address: educationLocation[1],
                  },
              }
            : {}),
        ...(mainEducator ? { 'educator.main': mainEducator } : {}),
        ...(subEducator ? { 'educator.sub': [subEducator] } : {}),
        ...rest,
    };
};

/**
 * 기존 값과 변경된 값이 객체로 보내야 하는 키 값일 때 객체의 형태로 파싱해주기 위한 유틸 함수
 */
export const parseData = ({ fields, getValues }) => {
    const dirtyKeys = Object.keys(fields).map((key) =>
        relationField[key] ? relationField[key] : key,
    );
    const data = dirtyKeys.reduce((acc, key) => {
        if (matchedKey[key]) {
            return { ...acc, [key]: getValues(matchedKey[key]) };
        }
        return { ...acc, [key]: getValues(key) };
    }, {});

    return formatData(data);
};

/** 정보 입력이 미입력 상태인지 확인 */
export const checkIsInfoTemporary = (formData) => {
    const { elementarySchool, middleSchool, highSchool, ...restFormData } =
        formData;
    const isTargetGroupEmpty = _isEmpty(
        [elementarySchool, middleSchool, highSchool].flat(),
    );

    const isRestDataInValid = Object.values(restFormData).reduce(
        (acc, value) => {
            return acc || !value;
        },
        false,
    );

    return isTargetGroupEmpty || isRestDataInValid;
};
