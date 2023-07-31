const campsKeys = {
    all: () => ['camps'],

    /**
     * 캠프 리스트
     */
    items: () => [...campsKeys.all(), 'items'],
    itemsDetail: (filters) => [...campsKeys.items(), { ...filters }],

    /**
     * 프로그램 별 캠프 리스트
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
};

export default campsKeys;
