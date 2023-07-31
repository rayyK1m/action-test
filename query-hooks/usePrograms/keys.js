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

    /**
     * 운영 기관 어드민 - 프로그램 관리 페이지에서 사용되는 키
     */
    itemsAdmin: () => [...programsKeys.all(), 'itemsAdmin'],
    itemsAdminDetail: (filters) => [
        ...programsKeys.itemsAdmin(),
        { ...filters },
    ],

    /**
     * 운영 기관 어드민 - 단일 프로그램 조회 시 사용
     */
    itemAdmin: () => [...programsKeys.all(), 'itemAdmin'],
    itemAdminDetail: (id) => [...programsKeys.itemAdmin(), id],
};

export default programsKeys;
