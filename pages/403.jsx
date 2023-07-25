import ErrorPage from '@/components/ErrorPage';
import React from 'react';

const Error403Page = () => {
    // console.log('CustomErrorPage', statusCode);

    return <ErrorPage statusCode={403} message="권한을 확인해주세요." />;
};

export default Error403Page;
