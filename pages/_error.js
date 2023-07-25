import ErrorPage from '@/components/ErrorPage';
import React from 'react';

const CustomErrorPage = ({ statusCode }) => {
    /**
     * production일 경우에만 아래 컴포넌트가 렌더링됨
     * 일반적으로 특정 처리가 필요한 경우(401, 403...)에는 리다이렉트 시키므로 이 페이지에는 처리되지 않은 서버 에러 발생 시 보여짐
     */
    return (
        <ErrorPage
            statusCode={statusCode}
            message="서버에서 알 수 없는 오류가 발생했습니다."
        />
    );
};

/**
 * @param {import('next').NextPageContext} context
 */
CustomErrorPage.getInitialProps = ({ res, err }) => {
    const errorName = err.name || err.response?.data.code;

    switch (errorName) {
        case 'UnauthorizedError':
            res.writeHead(302, { Location: `/login` });
            res.end();
            break;
        case 'ForbiddenError':
            res.writeHead(302, { Location: `/403` });
            res.end();
            break;
        default:
            break;
    }

    return { statusCode: err.statusCode || 500 };
};

export default CustomErrorPage;
