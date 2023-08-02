import React, { Suspense, useCallback } from 'react';

import { useCreateCampUpdateActionContext } from '../CreateCampContainer/context';
import SelectApplicantTable from '@/view/components/SelectApplicantTable';

import styles from './SelectStudent.module.scss';

function SelectStudent() {
    const { updateStudents } = useCreateCampUpdateActionContext();

    const handleChangeSelectedRows = useCallback(
        (selectedStudents) => {
            const selecedStudentIds = selectedStudents.map(
                (student) => student.userId,
            );
            updateStudents(selecedStudentIds);
        },
        [updateStudents],
    );

    return (
        // TODO: loading fallback
        // NOTE: SelectApplicantTable 의 구성은 캠프 수정하기 > 참가자 관리 시안 변경에 따라 영향을 받을 수 있음
        <Suspense fallback={<div>loading</div>}>
            <SelectApplicantTable
                onSelectedRowChange={handleChangeSelectedRows}
            />
        </Suspense>
    );
}

export default SelectStudent;
