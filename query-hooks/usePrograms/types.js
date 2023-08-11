/**
 * @typedef {typeof import('@/constants/db').PROGRAM_REVIEW_STATUS} PROGRAM_REVIEW_STATUS
 * @typedef {PROGRAM_REVIEW_STATUS[keyof PROGRAM_REVIEW_STATUS]['key']} ReviewStatus
 * @typedef {keyof typeof import('@/constants/db').PROGRAM_DIVISION} DivisionType PROGRAM_DIVISION
 * @typedef {keyof typeof import('@/constants/db').PROGRAM_DURATION} DurationType PROGRAM_DURATION
 * @typedef {'강원특별자치도' | '경기도' | '세종특별자치시' | '경상남도' | '경상북도' | '광주광역시' | '대구광역시' | '대전광역시' | '부산광역시' | '서울특별시' | '울산광역시' | '인천광역시' | '전라남도' | '전라북도' | '제주특별자치도' | '충청남도' | '충청북도'} OperateLocation
 */

/**
 * @typedef Program
 * @property {string} id 프로그램 id
 * @property {string} creatorId
 * @property {string} lectureIndex
 * @property {number} lectureSequence
 * @property {string} institutionId 기관 id
 * @property {ReviewStatus} [reviewStatus] 승인 상태
 * @property {{ filename: string; url: string }} [thumbnail]
 * @property {string} name 제목
 * @property {{ division: DivisionType; duration: DurationType }} type 각종 타입
 * @property {string} category 카테고리
 * @property {string} [description] 프로그램 소개
 * @property {OperateLocation} operateLocation 운영 지역
 * @property {string} [contact] 문의처
 * @property {{ start: string; end: string }} applyDate 신청 기간
 * @property {{ elementarySchool?: Array<1 | 2 | 3 | 4 | 5 | 6>; middleSchool?: Array<1 | 2 | 3>; highSchool?: Array<1 | 2 | 3> }} [targetGroup] 신청 대상
 * @property {number} [learningTime] 총 교육 차시 단위: 시간
 * @property {{ start: string; end: string }} educationDate 교육 기간
 * @property {string} [curriculum] 커리큘럼
 * @property {Array<{ url: string; filename: string; }>} attachedFiles 첨부파일
 * @property {string} [notice] 안내 사항
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {{ name?: string; address?: string }} [educationLocation] 교육 장소 (집합형에만 존재)
 * @property {{ id: string; name: string; logo?: { filename: string; url: string; } }} [institution] 기관 정보
 * @property {number} campCount
 */

/**
 * @typedef {Omit<Program, 'lectureIndex' | 'lectureSequence'> & OnlyProgramAdmin} ProgramAdmin
 *
 * @typedef OnlyProgramAdmin
 * @property {{ id: string; name: string; logo?: { filename: string; url: string; } }} [institution] 기관 정보 (이거 필요한 정보인데 안내려주고 있음(기획, 디자인 선행 확인 후 새미에게 데이터 추가 요청)
 * @property {number} campTicketCount
 */

export default {};
