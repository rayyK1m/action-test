import axios from 'axios';
import qs from 'qs';

const getSchools = async (query) => {
    const queryString = qs.stringify(query);
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/school?${queryString}`,
    );

    return data;
};

const schoolApis = {
    getSchools,
};

export default schoolApis;
