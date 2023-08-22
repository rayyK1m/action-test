import { NextResponse } from 'next/server';
import authSdk from '@/server/libs/auth';
import swcampSdk from '@/server/libs/swcamp';
import UnauthorizedError from '../error/UnauthorizedError';
import ForbiddenError from '@/server/utils/error/ForbiddenError';
import { isEmpty } from '@/utils';

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

    const {
        isValid,
        userData: { id: userId },
    } = await authSdk.validateToken(cookieValue);

    // 토큰이 유효하지 않을 경우
    if (!isValid) {
        return { isAuthenticated: false };
    }

    const { swcampUserData, userData } = await swcampSdk.getUserInfo({
        userId,
    });

    if (!userData) {
        return { isAuthenticated: false };
    }

    const sessionData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        level: userData.level,
        role: swcampUserData.role,
        institutionId: swcampUserData.institutionId || null,
        isInstitution: userData.isInstitution || false,
        isTeacher: userData.isTeacher || false,
    };

    return { isAuthenticated: true, userData: sessionData, token: cookieValue };
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

export const withSessionRoute = (handler) => async (req, res, next) => {
    if (Object.keys(req.cookies).length === 0 && !!req.headers.cookie) {
        req.cookies = JSON.parse(req.headers.cookie || '');
    }

    const { isAuthenticated, userData } = await checkAuthentication(req);

    if (isAuthenticated) {
        req.session = userData;
    }

    return handler(req, res, next);
};

/**
 * @typedef Session
 * @property {string} id
 * @property {string} name
 * @property {'student' | 'teacher' | 'institution' | 'foundation'} role
 */

/**
 *  @param {import('../types').CustomGetServerSideProps<{ session: Session }>} handler
 *  @param {object} options { shouldLogin: Boolean, roles: Array<role>}
 */
export const withSessionSsr =
    (handler, options) =>
    /** @type {import('../types').CustomGetServerSideProps<{ session: Session }>} */
    async (context) => {
        const { isAuthenticated, userData } = await checkAuthentication(
            context.req,
        );

        if (isAuthenticated) {
            context.req.session = userData;
        }

        // TODO: 별도 util로 빠질 수 도 있을 것 같으나 우선 그대로 작성
        const shouldLogin = options?.shouldLogin || false;
        const roles = options?.roles || [];
        if (!isAuthenticated && shouldLogin) {
            throw new UnauthorizedError({});
        }

        if (!isEmpty(roles) && !roles.includes(userData.role)) {
            throw new ForbiddenError({
                userRole: userData.role,
                roles,
            });
        }

        return handler(context);
    };
/**
 *
 * @param {{ shouldLogin: boolean; roles: Array<import('@/query-hooks/useSession').Role> }} options
 * @returns
 */
export const checkAuthSsr =
    ({ shouldLogin = false, roles = [] }) =>
    (handler) =>
        withSessionSsr(async (context) => {
            const userData = context.req.session;
            if (!userData && shouldLogin) {
                throw new UnauthorizedError({});
            }

            if (!isEmpty(roles) && !roles.includes(userData.role)) {
                throw new ForbiddenError({
                    userRole: userData.role,
                    roles,
                });
            }

            return handler(context);
        });

export const getAuthHeader = (userId) => {
    return { 'x-user-id': userId };
};
