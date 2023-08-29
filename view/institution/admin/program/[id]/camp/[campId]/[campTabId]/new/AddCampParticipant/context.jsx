import React, { createContext, useCallback, useContext, useState } from 'react';

const CreateParticipantsCountContext = createContext();

export const useParticipantsContext = () => {
    const participants = useContext(CreateParticipantsCountContext);

    if (!participants) {
        throw new Error(
            'CreateCampParticipantsCountext 없이 사용할 수 없습니다.',
        );
    }
    return participants;
};

function CreateParticipantsContextProvider({ children }) {
    const [participantsCount, setParticipantsCount] = useState(0);

    const updateParticipantsCount = useCallback(
        (count) => {
            setParticipantsCount(count);
        },
        [setParticipantsCount],
    );

    return (
        <CreateParticipantsCountContext.Provider
            value={{ participantsCount, updateParticipantsCount }}
        >
            {children}
        </CreateParticipantsCountContext.Provider>
    );
}

export default CreateParticipantsContextProvider;
