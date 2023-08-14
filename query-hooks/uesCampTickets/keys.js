export const campTicketsKeys = {
    all: () => ['campTickets'],

    /**
     * 모집 페이지 - 신청 내역 상세 보기 컴포넌트에서 사용되는 키
     */
    item: () => [...campTicketsKeys.all(), 'item'],
    itemDetail: (filters) => [...campTicketsKeys.item(), { ...filters }],

    /**
     * 모집 페이지 - 신청 내역 페이지에서 사용되는 키
     */
    items: () => [...campTicketsKeys.all(), 'items'],
    itemsDetail: (filters) => [...campTicketsKeys.items(), { ...filters }],

    /**
     * 모집 페이지 - 프로그램 상세 보기 페이지, 신청 프로그램 갯수 받오을 때 사용되는 키
     */
    count: () => [...campTicketsKeys.all(), 'count'],

    /**
     * 운영 기관 어드민 - 프로그램 신청자 관리 페이지에서 사용되는 키
     */
    itemsAdmin: () => [...campTicketsKeys.all(), 'itemsAdmin'],
    itemsAdminDetail: (filters) => [
        ...campTicketsKeys.itemsAdmin(),
        { ...filters },
    ],

    /**
     * 모집 페이지 - 프로그램 상세 보기에서 이미 신청한 프로그램인지를 판단하는 키
     */
    history: () => [...campTicketsKeys.all(), 'history'],
    historyDetail: (filters) => [...campTicketsKeys.history(), { ...filters }],

    /**
     * 운영 기관 어드민 - 캠프 상세 페이지의 캠프 참가자 리스트를 받아오는 키
     */
    participants: () => [...campTicketsKeys.all(), 'participants'],
    participantsDetail: (filters) => [
        ...campTicketsKeys.participants(),
        { ...filters },
    ],
};

export default campTicketsKeys;
