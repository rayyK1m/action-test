import { useQuery } from '@tanstack/react-query';
import userApis from './apis';

const useGetUserInfo = () => {
    return useQuery({
        queryKey: 'user',
        queryFn: () => userApis.getUserInfo(),
    });
};

export { useGetUserInfo };
