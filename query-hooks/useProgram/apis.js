// @ts-check
import axios from 'axios';

/**
 * @param {{ id: string }} query
 * @returns {Promise<{ item: import('./types').Program }>}
 */
export const getProgramDetail = async ({ id }) => {
    /** @type {{ data: { item: import('./types').Program }}} */
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/programs/${id}`,
    );

    return data;
};
