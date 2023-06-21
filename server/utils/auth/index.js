import { NextResponse } from 'next/server';
import { validateToken } from '@/server/libs/auth';

/**
 * request 기준으로 인증 상태 확인 및 유저 데이터를 리턴하는 함수
 *
 * @param {Object} request - next request
 * @returns {Object} - 인증 상태와 사용자 데이터를 포함하는 객체
 *  - isAuthenticated (boolean): 인증 상태를 나타내는 값. 인증된 경우 true, 그렇지 않은 경우 false
 *  - userData (Object): 인증된 경우 포함되는 사용자 데이터 객체
 *  - token (string): 세션에 사용되는 쿠키값
 */
export const checkAuthentication = async (request) => {
    const cookieValue =
        request.cookies.get?.(process.env.COOKIE_NAME)?.value ||
        request.cookies[process.env.COOKIE_NAME];

    // cookie가 없을 경우
    if (!cookieValue) {
        return { isAuthenticated: false };
    }

    const { isValid, userData } = await validateToken(cookieValue);

    // 토큰이 유효하지 않을 경우
    if (!isValid) {
        return { isAuthenticated: false };
    }

    return { isAuthenticated: true, userData, token: cookieValue };
};

/**
 * 모든 쿠키를 만료시키고, 지정된 URL로 리다이렉트하는 함수
 *
 * @param {string} redirectUrl - 리다이렉트할 URL
 * @returns {NextResponse} - 리다이렉트 응답 객체
 */
export const expireAllCookies = (redirectUrl) => {
    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set(process.env.COOKIE_NAME, '', {
        httpOnly: true,
        path: '/',
        domain: process.env.COOKIE_DOMAIN,
        maxAge: -1,
        secure: true,
        sameSite: 'lax',
    });
    return res;
};

export const withSessionRoute = (handler) => async (req, res) => {
    const { isAuthenticated, userData } = await checkAuthentication(req);

    if (isAuthenticated) {
        req.session = {
            id: userData.id,
            name: userData.name,
        };
    }

    return handler(req, res);
};

export const withSessionSsr = (handler) => async (context) => {
    const { isAuthenticated, userData } = await checkAuthentication(
        context.req,
    );

    if (isAuthenticated) {
        context.req.session = {
            id: userData.id,
            name: userData.name,
        };
    }

    return handler(context);
};
