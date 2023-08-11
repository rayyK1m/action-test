/**
 * @typedef {'모집_예정' | '모집_중' | '모집_종료'} ApplyStatus
 * @typedef {typeof import('@/constants/db').PROGRAM_REVIEW_STATUS} PROGRAM_REVIEW_STATUS
 * @typedef {PROGRAM_REVIEW_STATUS[keyof PROGRAM_REVIEW_STATUS]['key']} ReviewStatus
 * @typedef {keyof typeof import('@/constants/db').PROGRAM_DIVISION} DivisionType PROGRAM_DIVISION
 * @typedef {keyof typeof import('@/constants/db').PROGRAM_DURATION} DurationType PROGRAM_DURATION
 * @typedef {'강원특별자치도' | '경기도' | '세종특별자치시' | '경상남도' | '경상북도' | '광주광역시' | '대구광역시' | '대전광역시' | '부산광역시' | '서울특별시' | '울산광역시' | '인천광역시' | '전라남도' | '전라북도' | '제주특별자치도' | '충청남도' | '충청북도'} OperateLocation
 */

/**
 * @typedef Program
 * @property {string} creatorId
 * @property {string} institutionId
 * @property {ApplyStatus} [applyStatus] 모집 상태
 * @property {ReviewStatus} [reviewStatus] 승인 상태
 * @property {string} [thumbnail]
 * @property {string} name 제목
 * @property {{ division: DivisionType; duration: DurationType }} type 각종 타입
 * @property {string} category 카테고리
 * @property {number} price 비용
 * @property {string} [description] 프로그램 소개
 * @property {OperateLocation} operateLocation 운영 지역
 * @property {string} [contact] 문의처
 * @property {{ start: string; end: string }} applyDate 신청 기간
 * @property {{ elementarySchool?: Array<1 | 2 | 3 | 4 | 5 | 6>; middleSchool?: Array<1 | 2 | 3>; highSchool?: Array<1 | 2 | 3> }} [targetGroup] 신청 대상
 * @property {number} [learningTime] 총 교육 차시 단위: 시간
 * @property {{ start: string; end: string }} educationDate 교육 기간
 * @property {string} [curriculum] 커리큘럼
 * @property {Array<{ filename: string; url: string; }>} attachedFiles 첨부파일
 * @property {string} [notice] 안내 사항
 * @property {{ name?: string; address?: string }} [educationLocation] 교육 장소
 * @property {{ id: string; name: string; logo?: { url: string; } }} [institution] 기관 정보
 */

export default {};
