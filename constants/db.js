export const ROLE = {
    FOUNDATION: 'foundation',
    INSTITUTION: 'institution',
    TEACHER: 'teacher',
    STUDENT: 'student',
};

export const PROGRAM_DIVISION = {
    방문형: '방문형',
    집합형: '집합형',
};

export const PRGRAM_APPLY_STATUS = {
    모집_예정: {
        key: '모집_예정',
        text: '모집 예정',
        badgeColor: 'warning',
    },
    모집_중: {
        key: '모집_중',
        text: '모집 중',
        badgeColor: 'primary',
    },
    모집_종료: {
        key: '모집_종료',
        text: '모집 종료',
        badgeColor: 'info',
    },
};

export const PROGRAM_REVIEW_STATUS = {
    심사중: {
        text: '심사중',
        key: 'IN_PROGRESS',
        value: 'IN_PROGRESS',
    },
    승인: {
        text: '승인',
        key: 'APPROVE',
        value: 'APPROVE',
    },
    거절: {
        text: '거절',
        key: 'REJECT',
        value: 'REJECT',
    },
};

export const CAMP_REVIEW_STATUS = {
    심사중: {
        text: '심사중',
        key: 'IN_PROGRESS',
        value: 'IN_PROGRESS',
    },
    승인: {
        text: '승인',
        key: 'APPROVE',
        value: 'APPROVE',
    },
    거절: {
        text: '거절',
        key: 'REJECT',
        value: 'REJECT',
    },
    취소: {
        text: '신청 취소',
        key: 'CANCEL',
        value: 'CANCEL',
    },
};

export const REQUIRED_FILE_SUBMIT_STATUS = {
    제출: {
        text: '제출',
        key: 'SUBMIT',
        value: 'SUBMIT',
    },
    미제출: {
        text: '미제출',
        key: 'NOT_SUBMITTED',
        value: 'NOT_SUBMITTED',
    },
};

export const PROGRAM_CATEGORIES = [
    '드론',
    '메타버스',
    '인공지능 로봇',
    '프로그램 언어',
    '해커톤 대회',
    'VR',
    '기타',
];

export const PROGRAM_LOCATION_CATEGORIES = {
    '강원, 충청권': [
        '강원특별자치도',
        '충청남도',
        '충청북도',
        '세종특별자치시',
        '대전광역시',
    ],
    경기도: ['경기도'],
    경상권: ['경상남도', '경상북도', '대구광역시', '부산광역시', '울산광역시'],
    '서울, 인천': ['서울특별시', '인천광역시'],
    '호남, 제주': ['광주광역시', '전라남도', '전라북도', '제주특별자치도'],
};

/**
 * @return [ '강원특별자치도', '경기도', '세종특별자치시', '경상남도', ... ]
 */
export const PROGRAM_OPERATION_LOCATIONS = Object.values(
    PROGRAM_LOCATION_CATEGORIES,
).reduce((acc, val) => acc.concat(val), []);
