const institutionsKeys = {
    // NOTE: 사용법 통일을 위해 parameter가 없어도, 함수 형태로 작성해준다.
    all: () => ['institutions'],

    // NOTE: 단일 아이템의 query key는 "item"으로 통일한다. (detail x, id x)
    /**
     * 기관 (institution)
     */
    item: () => [...institutionsKeys.all(), 'item'],
    itemDetail: (id) => [...institutionsKeys.item(), id],

    // NOTE: 리스트 아이템의 query key는 "items"으로 통일한다. (list x)
    /**
     * 기관 리스트 (institutions)
     */
    items: () => [...institutionsKeys.all(), 'items'],
    itemsDetail: (filters) => [...institutionsKeys.items(), { ...filters }],

    /**
     * 기관 리스트[재단용]
     */
    itemsFoundation: () => [...institutionsKeys.all(), 'itemsFoundation'],
    itemsFoundationDetail: (filters) => [
        ...institutionsKeys.itemsFoundation(),
        { ...filters },
    ],
};

export default institutionsKeys;
