export const campTicketsKeys = {
    all: () => ['campTickets'],
    item: () => [...campTicketsKeys.all(), 'item'],
    itemDetail: (filters) => [
        ...campTicketsKeys.item(),
        'item',
        { ...filters },
    ],
    items: () => [...campTicketsKeys.all(), 'items'],
    itemsDetail: (filters) => [...campTicketsKeys.items(), { ...filters }],

    /**
     * 하나의 자원에 대해 추가 쿼리 키가 필요할 경우 적절하게 추가합니다.
     */
    itemsAdmin: () => [...campTicketsKeys.all(), 'itemsAdmin'],
    count: () => [...campTicketsKeys.all(), 'count'],
};

export default campTicketsKeys;
