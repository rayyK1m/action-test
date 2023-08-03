import React, { useState, useEffect } from 'react';

import { useCreateCampUpdateActionContext } from '../CreateCampContainer/context';
import SelectApplicantTable from '@/view/components/SelectApplicantTable';

import styles from './SelectStudent.module.scss';

function SelectStudent() {
    const [selectedStudents, setSelectedStudents] = useState({});
    const { updateStudents } = useCreateCampUpdateActionContext();

    useEffect(() => {
        const selecedStudentIds = Object.values(selectedStudents).map(
            (students) => students.map((student) => student.userId),
        );
        updateStudents(selecedStudentIds);
    }, [selectedStudents, updateStudents]);

    return (
        // NOTE: SelectApplicantTable 의 구성은 캠프 수정하기 > 참가자 관리 시안 변경에 따라 영향을 받을 수 있음
        <SelectApplicantTable onSelectedRowChange={setSelectedStudents} />
    );
}

export default SelectStudent;
