const campsKeys = {
    all: () => ['camps'],

    item: () => [...campsKeys.all(), 'item'],
    itemDetail: (campId) => [...campsKeys.item(), campId],

    /**
     * 단일 캠프 (Camp)
     */
    item: () => [...campsKeys.all(), 'item'],
    itemDetail: (campId) => [...campsKeys.item(), campId],

    /**
     * 프로그램에 속한 캠프 리스트 (ProgramCamps)
     */
    itemsProgram: (programId) => [
        ...campsKeys.all(),
        'items',
        'programs',
        programId,
    ],
    itemsProgramDetail: (programId, filters) => [
        ...campsKeys.itemsProgram(programId),
        { ...filters },
    ],

    /**
     * 프로그램 별 캠프 분반 정보
     */
    classes: (programId) => [...campsKeys.all(), 'classes', programId],
};

export default campsKeys;
