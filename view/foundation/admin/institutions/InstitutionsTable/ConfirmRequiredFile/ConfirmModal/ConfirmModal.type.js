/**
 * @typedef ConfirmModalProps
 * @property {boolean} isOpen
 * @property {() => void} toggle // modal toggle function
 * @property {import('@/query-hooks/useInstitutions/types').InstitutionFoundation} rowData
 */

/**
 * @typedef FormData
 * @property {string} feedback
 */

/**
 * @typedef {ConfirmModalProps & OnlyConfirmModalContextValue} ConfirmModalContextValue
 *
 * @typedef OnlyConfirmModalContextValue
 * @property {FormData} formData
 * @property {(newFormData?: Partial<FormData>) => void} changeFornData
 * @property {boolean} requiredFeedback
 * @property {import('react').Dispatch<import('react').SetStateAction<boolean>>} setRequiredFeedback
 */

export default {};
