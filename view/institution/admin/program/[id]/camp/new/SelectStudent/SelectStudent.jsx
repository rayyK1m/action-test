import React, { useState, useEffect } from 'react';

import { useCreateCampStudentsContext } from '../CreateCampContainer/context';
import SelectApplicantTable from '@/view/components/SelectApplicantTable';

function SelectStudent() {
    const [selectedStudents, setSelectedStudents] = useState({});
    const { updateStudents } = useCreateCampStudentsContext();

    useEffect(() => {
        const selecedCampTickets = Object.values(selectedStudents).map(
            (students) => students.map((student) => student.id),
        );
        updateStudents(selecedCampTickets);
    }, [selectedStudents, updateStudents]);

    return (
        // NOTE: SelectApplicantTable 의 구성은 캠프 수정하기 > 참가자 관리 시안 변경에 따라 영향을 받을 수 있음
        <SelectApplicantTable onSelectedRowChange={setSelectedStudents} />
    );
}

export default SelectStudent;
