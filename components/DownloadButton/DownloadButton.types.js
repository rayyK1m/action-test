/**
 * @typedef AttachedFile
 * @property {string} filename
 * @property {string} url
 */

/** @typedef {Array<AttachedFile>} AttachedFiles  */

/**
 * @typedef {Omit<import('react').ComponentProps<'a'>, 'href'> & Parameters<import('@goorm-dev/gds-components').Button>[0] & Parameters<import('@goorm-dev/gds-components').TextButton>[0] & OnlyDownloadButtonProps} DownloadButtonProps
 *
 * @typedef OnlyDownloadButtonProps
 * @property {string} filename 파일 이름
 * @property {boolean} isText default = false / true일 때는 TextButton으로 렌더링
 * @property {keyof JSX.IntrinsicElements | import("react").JSXElementConstructor<any>} tag
 * @property {string | AttachedFile | AttachedFiles} href 파일 경로 | 파일 경로 리스트
 */

export default {};
