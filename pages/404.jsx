import ErrorPage from '@/components/ErrorPage';
import React from 'react';

const Error404Page = () => {
    return (
        <ErrorPage
            statusCode={404}
            message="페이지가 존재하지 않습니다. 경로를 확인해주세요."
        />
    );
};

export default Error404Page;
