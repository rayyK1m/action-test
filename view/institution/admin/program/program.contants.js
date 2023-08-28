export const PROGRAM_APPLY_KEYS = {
    nameKey: 'name', // 프로그램 명
    categoryKey: 'category', // 프로그램 카테고리
    thumbnailKey: 'thumbnail', // 프로그램 썸네일
    difficultyKey: 'difficulty', // 프로그램 수준
    operateLocationKey: 'operateLocation', // 운영 지역
    learningTimeKey: 'learningTime', // 총 교육 차시
    attachedFilesKey: 'attachedFiles', // 프로그램 교안 첨부파일
    durationKey: 'duration',
    priceKey: 'price', // 비용
    descriptionKey: 'description', // 프로그램 소개
    contactKey: 'contact', // 문의처(기관)
    curriculumKey: 'curriculum', // 커리큘럼
    noticeKey: 'notice', // 안내 사항
    elementaryTargetKey: 'elementarySchool', // 신청 가능 대상 - 초등학생
    middleTargetKey: 'middleSchool', // 신청 가능 대상 - 중학생
    highTargetKey: 'highSchool', // 신청 가능 대상 - 고등학생
    educationLocationNameKey: 'educationLocationName',
    educationLocationAddressKey: 'educationLocationAddress',
    // 신청 기간
    applyStartDateKey: 'applyStartDate',
    applyStartTimeKey: 'applyStartTime',
    applyEndDateKey: 'applyEndDate',
    applyEndTimeKey: 'applyEndTime',
    // 교육 일정
    educationStartDateKey: 'educationStartDate',
    educationStartTimeKey: 'educationStartTime',
    educationEndDateKey: 'educationEndDate',
    educationEndTimeKey: 'educationEndTime',
};

export const SCHOOL = {
    elementarySchool: {
        key: '초등학생',
        applyKey: PROGRAM_APPLY_KEYS.elementaryTargetKey,
        value: Array.from({ length: 6 }),
    },
    middleSchool: {
        key: '중학생',
        applyKey: PROGRAM_APPLY_KEYS.middleTargetKey,
        value: Array.from({ length: 3 }),
    },
    highSchool: {
        key: '고등학생',
        applyKey: PROGRAM_APPLY_KEYS.highTargetKey,
        value: Array.from({ length: 3 }),
    },
};
