import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

const CreateCampSubmitActionContext = createContext();
const CreateCampInfoContext = createContext();
const CreateCampStudentsContext = createContext();

import { useCreateCamp } from '@/query-hooks/useCamps';
import { checkIsInfoTemporary, parseData } from './CreateCampContainer.utils';

export const useCreateCampSubmitActionContext = () => {
    const submitActions = useContext(CreateCampSubmitActionContext);
    if (!submitActions) {
        throw new Error('CreateCampContextProvider 없이 사용할 수 없습니다.');
    }

    return submitActions;
};
export const useCreateCampInfoContext = () => {
    const campInfoContext = useContext(CreateCampInfoContext);

    if (!campInfoContext) {
        throw new Error('CreateCampContextProvider 없이 사용할 수 없습니다.');
    }

    return campInfoContext;
};
export const useCreateCampStudentsContext = () => {
    const studentsContext = useContext(CreateCampStudentsContext);

    if (!studentsContext) {
        throw new Error('CreateCampContextProvider 없이 사용할 수 없습니다.');
    }

    return studentsContext;
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

    const returnPath = `/institution/admin/program/${campInfo.programId}/camp?division=${campInfo?.type?.division}`;
    const createCamp = useCreateCamp(returnPath);

    const updateCampInfo = useCallback((formData) => {
        setCampInfo(formData);
    }, []);
    const updateStudents = useCallback((students) => {
        setStudents(students);
    }, []);
    const submitAction = useMemo(
        () => ({
            submit() {
                const parsedTicketIds = students.flat();
                const isDraft = checkIsInfoTemporary(campInfo);

                createCamp.mutate({
                    ...parseData(campInfo),
                    campTicketIdList: parsedTicketIds,
                    isDraft,
                });
            },
        }),
        [campInfo, students],
    );

    return (
        <CreateCampSubmitActionContext.Provider value={submitAction}>
            <CreateCampInfoContext.Provider
                value={{ campInfo, updateCampInfo }}
            >
                <CreateCampStudentsContext.Provider
                    value={{ students, updateStudents }}
                >
                    {children}
                </CreateCampStudentsContext.Provider>
            </CreateCampInfoContext.Provider>
        </CreateCampSubmitActionContext.Provider>
    );
}
export default CreateCampContextProvider;
