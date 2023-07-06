export const campTicketsKeys = {
    all: () => ['campTickets'],
    list: () => [...campTicketsKeys.all(), 'list'],
    detail: (filters) => [...campTicketsKeys.list(), { ...filters }],
};

export default campTicketsKeys;
