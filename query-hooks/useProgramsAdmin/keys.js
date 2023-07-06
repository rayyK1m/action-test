export const programAdminKeys = {
    all: () => ['programsAdmin'],
    list: () => [...programAdminKeys.all(), 'list'],
    detail: (filters) => [...programAdminKeys.list(), { ...filters }],
};

export default programAdminKeys;
