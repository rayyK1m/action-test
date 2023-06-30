export const INSTITUTIONS_KEYS = {
    all: ['institutions'],
    list: () => [...INSTITUTIONS_KEYS.all, 'list'],
    detail: (filters) => [...INSTITUTIONS_KEYS.list(), { ...filters }],
};
