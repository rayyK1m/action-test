const programsKeys = {
    all: () => ['programs'],

    /**
     * 단일 프로그램 (Program)
     */
    item: () => [...programsKeys.all(), 'item'],
    itemDetail: (id) => [...programsKeys.item(), id],

    /**
     * 프로그램 리스트 (Programs)
     */
    items: () => [...programsKeys.all(), 'items'],
    itemsDetail: (filters) => [...programsKeys.items(), { ...filters }],
};

export default programsKeys;
