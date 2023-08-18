/**
 *
 * @param {{ type: 'elementarySchool' | 'middleSchool' | 'highSchool'; gradeList: Array<number>; }} props
 */
const Grade = ({ type, gradeList }) => {
    const sortedGradeList = [...gradeList].sort();
    /**
     * @param {number} grade
     * @returns
     */
    const renderGrade = (grade, index) => `${index ? ', ' : ''}${grade}학년`;

    switch (type) {
        case 'elementarySchool':
            return <>초등학생 {sortedGradeList.map(renderGrade)}</>;
        case 'middleSchool':
            return <>중학생 {sortedGradeList.map(renderGrade)}</>;
        case 'highSchool':
            return <>고등학생 {sortedGradeList.map(renderGrade)}</>;
        default:
            return <></>;
    }
};

export default Grade;
