export const delay = (ms) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 페이지네이션 유틸
 * @template T
 * @param {Array<T>} array
 * @param {number} page
 * @param {number} limit
 * @returns {Array<T>}
 */
export const paginateArray = (array, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
};

export const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};
