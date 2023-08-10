import { Checkbox, Skeleton } from '@goorm-dev/gds-components';

import cn from 'classnames';
import styles from './Grade.module.scss';

/**
 * @typedef {import('react').ComponentProps<'ul'> & OnlyGradeProps}GradeProps
 *
 * @typedef OnlyGradeProps
 * @property {'elementarySchool' | 'middleSchool' | 'highSchool'} type
 * @property {boolean} [isLoading]
 * @property {Array<number>} approveList
 *
 */

/**
 * @param {GradeProps} props
 */
function Grade({ type, isLoading = false, approveList = [], ...props }) {
    const maxGrade = type === 'elementarySchool' ? 6 : 3;
    const gradeList = approveList
        .reduce((acc, cur) => {
            acc[cur - 1] = true;
            return acc;
        }, Array.from({ length: maxGrade }))
        .map((isApprove) => ({ isApprove }));

    return (
        <ul {...props} className={styles.list}>
            {gradeList.map(({ isApprove }, index) => {
                const grade = index + 1;
                return (
                    <li key={grade} className={cn(styles.item)}>
                        {isLoading ? (
                            <div className="position-relative pl-2 d-flex align-items-center">
                                <Skeleton
                                    className={styles.checkBoxSkeleton}
                                    width="16px"
                                    height="16px"
                                />
                            </div>
                        ) : (
                            <Checkbox
                                /** onChange 없이 checked사용하면 Warning 뜸 */
                                onChange={new Function()}
                                disabled={!isApprove}
                                checked={isApprove}
                            />
                        )}
                        <span
                            className={cn({
                                [styles.itemText_isDisabled]:
                                    isLoading || !isApprove,
                            })}
                        >
                            {grade}학년
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

export default Grade;
