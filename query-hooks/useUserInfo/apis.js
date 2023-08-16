import axios from 'axios';

const getUserInfo = async () => {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_HOST}/api/user`,
    );

    return data;
};

const userApis = {
    getUserInfo,
};

export default userApis;
