export const PROGRAMS_KEYS = {
    all: ['programs'],
    list: () => [...PROGRAMS_KEYS.all, 'list'],
    detail: (filters) => [...PROGRAMS_KEYS.list(), { ...filters }],
};
