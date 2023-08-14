const campsKeys = {
    all: () => ['camps'],

    item: () => [...campsKeys.all(), 'item'],
    itemDetail: (campId) => [...campsKeys.item(), campId],

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

    /**
     * 프로그램 별 캠프 분반 정보
     */
    classes: (programId) => [...campsKeys.all(), 'classes', programId],
};

export default campsKeys;
