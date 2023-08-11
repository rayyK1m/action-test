/**
 * @typedef Logo
 * @property {string} filename
 * @property {string} url
 */

/**
 * @typedef {typeof import('@/constants/db').REQUIRED_FILE_SUBMIT_STATUS} REQUIRED_FILE_SUBMIT_STATUS
 * 기관 자료 승인 상태
 * @typedef {REQUIRED_FILE_SUBMIT_STATUS[keyof REQUIRED_FILE_SUBMIT_STATUS]['key']} ReviewStatus
 */

/**
 * @typedef FileMap
 * @property {string} label
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef Reports
 * @property {ReviewStatus} reviewStatus
 * @property {string} feedback
 * @property {{ [key: string]: FileMap }} fileObject
 */

/**
 * @typedef InstitutionAdmin
 * @property {string} id
 * @property {string} index
 * @property {string} name
 * @property {string} code
 * @property {Logo} logo
 * @property {Reports} reports
 */

export default {};
