const programsKeys = {
    all: () => ['programs'],
    item: () => [...programsKeys.all(), 'item'],
};

export default programsKeys;
