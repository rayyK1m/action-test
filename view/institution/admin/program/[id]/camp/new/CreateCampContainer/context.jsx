import React, { createContext, useContext, useMemo, useState } from 'react';

const CreateCampSubmitActionContext = createContext();
const CreateCampUpdateActionContext = createContext();

export const useCreateCampSubmitActionContext = () => {
    const submitActions = useContext(CreateCampSubmitActionContext);
    if (!submitActions) {
        throw new Error('CreateCampContextProvider 없이 사용할 수 없습니다.');
    }

    return submitActions;
};
export const useCreateCampUpdateActionContext = () => {
    const updateActions = useContext(CreateCampUpdateActionContext);

    if (!updateActions) {
        throw new Error('CreateCampContextProvider 없이 사용할 수 없습니다.');
    }

    return updateActions;
};

/**
 * 별도 state 값을 사용하지 않고 actions만 공유하는 Context로,
 * 사용자는 각 스텝 컴포넌트가 언마운트 될 때, 데이터가 변경될 때 모두 update actions을 수행하여 state를 업데이트할 수 있음.
 *
 * 메모이제이션을 적절히 활용하기 위헤 update와 submit actions을 분리함.
 */
function CreateCampContextProvider({ children }) {
    const [campInfo, setCampInfo] = useState({});
    const [students, setStudents] = useState([]); // targetUserIdList {Array<string>}

    const updateActions = useMemo(
        () => ({
            updateCampInfo(formData) {
                setCampInfo(formData);
            },
            updateStudents(students) {
                setStudents(students);
            },
        }),
        [],
    );

    const submitAction = useMemo(
        () => ({
            submit() {
                // TODO: 임시 저장 검증 필요 - 필수 입력 폼이 하나라도 비워져 있거나 선택된 학생이 0 명일 경우
                console.log(campInfo, students);
            },
        }),
        [campInfo, students],
    );

    return (
        <CreateCampUpdateActionContext.Provider value={updateActions}>
            <CreateCampSubmitActionContext.Provider value={submitAction}>
                {children}
            </CreateCampSubmitActionContext.Provider>
        </CreateCampUpdateActionContext.Provider>
    );
}
export default CreateCampContextProvider;
