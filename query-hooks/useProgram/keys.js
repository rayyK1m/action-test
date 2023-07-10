const programKeys = {
    all: () => ['program'],
    detail: ({ id }) => [...programKeys.all(), { id }],
};

export default programKeys;
