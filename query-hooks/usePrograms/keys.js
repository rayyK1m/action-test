const programsKeys = {
    all: () => ['programs'],
    list: () => [...programsKeys.all(), 'list'],
    detail: (filters) => [...programsKeys.list(), { ...filters }],
};

export default programsKeys;
