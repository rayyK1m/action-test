import Grade from './Grade/Grade';
import styles from './TargetGroup.module.scss';

/**
 *
 * @param {{ targetGroup: { elementarySchool?: Array<1 | 2 | 3 | 4 | 5 | 6>; middleSchool?: Array<1 | 2 | 3>; highSchool?: Array<1 | 2 | 3>; } }} props
 * @returns
 */
const TargetGroup = ({ targetGroup }) => {
    if (!targetGroup) return <></>;

    return (
        <ul className={styles.targetGroupList}>
            {Object.entries(targetGroup).map(([type, gradeList], index) => {
                return (
                    <li key={type}>
                        {!!index && ', '}
                        <Grade
                            type={type}
                            gradeList={gradeList}
                            hasComma={!!index}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default TargetGroup;
