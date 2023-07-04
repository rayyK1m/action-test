const institutionsKeys = {
    all: () => ['institutions'],
    list: () => [...institutionsKeys.all(), 'list'],
    detail: (filters) => [...institutionsKeys.list(), { ...filters }],
};

export default institutionsKeys;
