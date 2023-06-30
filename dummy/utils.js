export const delay = (ms) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const paginateArray = (array, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
};

export const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};
