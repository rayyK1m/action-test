export const CAMP_KEYS = {
    typeKey: 'type',
    categoryKey: 'category',
    difficultyKey: 'difficulty',
    managerNameKey: 'managerName',
    managerPhoneNumberKey: 'managerPhoneNumber',
    managerEmailKey: 'managerEmail',
    schoolCodeKey: 'schoolCode',
    schoolNameKey: 'schoolName',
    schoolTypeKey: 'schoolType',
    operateLocationKey: 'operateLocation',
    mainEducatorKey: 'mainEducator',
    subEducatorKey: 'subEducator',
    elementaryTargetKey: 'elementarySchool',
    middleTargetKey: 'middleSchool',
    highTargetKey: 'highSchool',
    applicantCountKey: 'applicantCount',
    classKey: 'class', // 분반
    learningTimeKey: 'learningTime',
    educationStartDateKey: 'educationStartDate',
    educationEndDateKey: 'educationEndDate',
    educationLocationNameKey: 'educationLocationName',
    educationLocationAddressKey: 'educationLocationAddress',
    /** 프로그램 관련 정보 */
    programNameKey: 'programName',
};

export const CAMP_INFO_KEYS = {
    typeKey: 'type',
    categoryKey: 'category',
    difficultyKey: 'difficulty',
    managerNameKey: 'managerName',
    managerPhoneNumberKey: 'managerPhoneNumber',
    managerEmailKey: 'managerEmail',
    schoolNameKey: 'schoolName',
    schoolTypeKey: 'schoolType',
    operateLocationKey: 'operateLocation',
    mainEducatorKey: 'educator.main',
    subEducatorKey: 'educator.sub',
    elementaryTargetKey: 'targetGroup.elementarySchool',
    middleTargetKey: 'targetGroup.middleSchool',
    highTargetKey: 'targetGroup.highSchool',
    applicantCountKey: 'applicantCount',
    classKey: 'class', // 분반
    learningTimeKey: 'learningTime',
    educationStartDateKey: 'educationDate.start',
    educationEndDateKey: 'educationDate.end',
    educationLocationNameKey: 'educationLocation.name',
    educationLocationAddressKey: 'educationLocation.address',
    /** 프로그램 관련 정보 */
    programNameKey: 'programName',
};

export const SCHOOL = {
    elementarySchool: {
        key: '초등학생',
        value: Array.from({ length: 6 }),
    },
    middleSchool: {
        key: '중학생',
        value: Array.from({ length: 3 }),
    },
    highSchool: {
        key: '고등학생',
        value: Array.from({ length: 3 }),
    },
};
