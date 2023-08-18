export const ROLE = /** @type {const} */ ({
    FOUNDATION: 'foundation',
    INSTITUTION: 'institution',
    TEACHER: 'teacher',
    STUDENT: 'student',
});

export const PROGRAM_DIVISION = /** @type {const} */ ({
    방문형: '방문형',
    집합형: '집합형',
});

export const PROGRAM_DIFFICULTY = /** @type {const} */ ({
    기초: '기초',
    심화: '심화',
});

export const EDUCATION_STATUS = /** @type {const} */ ({
    교육_예정: {
        key: '교육_예정',
        text: '교육 예정',
    },
    교육_진행_중: {
        key: '교육_진행_중',
        text: '교육 진행 중',
    },
    교육_종료: {
        key: '교육_종료',
        text: '교육 종료',
    },
});

export const PROGRAM_DURATION = /** @type {const} */ ({
    지속: '지속',
    단기: '단기',
});

export const PRGRAM_APPLY_STATUS = /** @type {const} */ ({
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
});

export const PROGRAM_REVIEW_STATUS = /** @type {const} */ ({
    심사중: {
        text: '심사 중',
        key: 'IN_PROGRESS',
        value: 'IN_PROGRESS',
    },
    승인: {
        text: '승인됨',
        key: 'APPROVE',
        value: 'APPROVE',
    },
    거절: {
        text: '거절됨',
        key: 'REJECT',
        value: 'REJECT',
    },
});

export const CAMP_REVIEW_STATUS = /** @type {const} */ ({
    심사중: {
        text: '심사 중',
        key: 'IN_PROGRESS',
        value: 'IN_PROGRESS',
    },
    승인: {
        text: '승인됨',
        key: 'APPROVE',
        value: 'APPROVE',
    },
    거절: {
        text: '거절됨',
        key: 'REJECT',
        value: 'REJECT',
    },
    취소: {
        text: '신청 취소됨',
        key: 'CANCEL',
        value: 'CANCEL',
    },
});

export const REQUIRED_FILE_SUBMIT_STATUS = /** @type {const} */ ({
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
    승인: {
        text: '승인됨',
        key: 'APPROVE',
        value: 'APPROVE',
    },
    거절: {
        text: '거절됨',
        key: 'REJECT',
        value: 'REJECT',
    },
    추가_자료_요청: {
        text: '추가 자료 요청',
        key: 'ADDITIONAL',
        value: 'ADDITIONAL',
    },
    추가_자료_제출: {
        text: '추가 자료 제출',
        key: 'ADDITIONAL_SUBMIT',
        value: 'ADDITIONAL_SUBMIT',
    },
});

export const PROGRAM_CATEGORIES = /** @type {const} */ ([
    '드론',
    '메타버스',
    '인공지능 로봇',
    '프로그램 언어',
    '해커톤 대회',
    'VR',
    '기타',
]);

export const PROGRAM_SCHOOL_TYPE = /** @type {const} */ ([
    '늘봄학교',
    '특성화/마이스터고등학교',
    '일반학교',
    '기타',
]);

export const PROGRAM_LOCATION_CATEGORIES = /** @type {const} */ ({
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
});

/**
 * @return [ '강원특별자치도', '경기도', '세종특별자치시', '경상남도', ... ]
 */
export const PROGRAM_OPERATION_LOCATIONS = Object.values(
    PROGRAM_LOCATION_CATEGORIES,
).flat();

export const CAMP_FILE_LIST = /** @type {const} */ ({
    사전_제출: {
        id: 'preFileReport',
        children: {
            안전_관리_체크리스트: {
                id: '안전_관리_체크리스트',
                label: '안전 관리 체크리스트',
                maxFileSize: 30,
                isRequired: true,
            },
            안전_관리_서약서: {
                id: '안전_관리_서약서',
                label: '안전 관리 서약서',
                maxFileSize: 30,
                isRequired: true,
            },
            성범죄조회_동의서: {
                id: '성범죄조회_동의서',
                label: '성범죄조회 동의서',
                maxFileSize: 30,
                isRequired: true,
            },
            기타: {
                id: '기타',
                label: '기타',
                maxFileSize: 30,
                isRequired: false,
            },
        },
    },
    종료_제출: {
        id: 'postFileReport',
        children: {
            결과_보고서: {
                id: '결과_보고서',
                label: '결과 보고서',
                maxFileSize: 30,
                isRequired: true,
            },
            기타: {
                id: '기타',
                label: '기타',
                maxFileSize: 30,
                isRequired: false,
            },
        },
    },
    결과_보고: {
        id: 'postReport',
        children: {
            신청_인원: {
                id: '신청_인원',
                label: '신청 인원',
                placeholder: '예) 15',
                isRequired: true,
            },
            참여_인원: {
                id: '참여_인원',
                label: '참여 인원',
                placeholder: '예) 15',
                isRequired: true,
            },
            이수_인원: {
                id: '이수_인원',
                label: '이수 인원',
                placeholder: '예) 15',
                isRequired: true,
            },
            설문_참여_인원: {
                id: '설문_참여_인원',
                label: '설문 참여 인원',
                placeholder: '예) 15',
                isRequired: true,
            },
        },
    },
});

/** 캠프 관리 페이지 default query */
export const CAMPS_DEFAULT_QUERY = /** @type {const} */ ({
    page: 1,
    limit: 10,
    sort: '-createdAt',
});

/** 기본 필수 자료 제출 키 => label === key */
export const DEFAULT_FILE_KEY = /** @type {const} */ ({
    참여_인력_업무_분장: '참여 인력 업무 분장',
    안전_관리_계획서: '안전 관리 계획서',
});

/** 기본 필수 자료 제출 목록 */
export const DEFAULT_FILE_OBJECT = /** @type {const} */ ({
    'institution-A': {
        label: DEFAULT_FILE_KEY.참여_인력_업무_분장,
    },
    'institution-B': {
        label: DEFAULT_FILE_KEY.안전_관리_계획서,
    },
});
