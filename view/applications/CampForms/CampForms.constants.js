// schoolName이 schoolIndex로 명시되어 있는 상황 <-> 상황에 따라 변경될 수 있음
export const CAMP_APPLY_KEYS = {
    userNameKey: 'userName',
    schoolNameKey: 'schoolName',
    schoolCodeKey: 'schoolCode',
    operateLocationKey: 'operateLocation',
    schoolTypeKey: 'schoolType',
    elementaryTargetKey: 'elementarySchool',
    middleTargetKey: 'middleSchool',
    highTargetKey: 'highSchool',
    applicantCountKey: 'applicantCount',
    phoneNumberKey: 'phoneNumber', // 집합형 : 신청인 정보 - 연락처
    startDateKey: 'startDate',
    startTimeKey: 'startTime',
    endDateKey: 'endDate',
    endTimeKey: 'endTime',
};

export const PROGRAM_KEYS = {
    institutionKey: 'institution',
    nameKey: 'programName',
    typeKey: 'type',
    learningTimeKey: 'learningTime',
    difficultyKey: 'difficulty',
};

export const USER_KEYS = {
    phoneNumberKey: 'phoneNumber',
    emailKey: 'email',
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
