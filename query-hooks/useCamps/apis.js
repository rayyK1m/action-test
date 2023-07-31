import axios from 'axios';
import qs from 'qs';

/**
 * getCamps
 *
 * @description 프로그램 별 캠프 신청자를 조회한다.
 */
export const getCamps = async (programId, filters) => {
    const queryString = qs.stringify(filters, { skipNulls: true });
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/camps/programs/${programId}?${queryString}`,
    );

    return data;
};

const campsApis = {
    getCamps,
};

export default campsApis;
