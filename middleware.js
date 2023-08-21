import { NextResponse } from 'next/server';
import authSdk from '@/server/libs/auth';
import { expireAllCookies, checkAuthentication } from '@/server/utils/auth';
import { checkAuth } from './server/middlewares/auth';

/** @type {import('next/server').NextMiddleware}*/
export async function middleware(req) {
    /** NOTE: 리다이렉트 이슈 해결될때까지 임시 방어 처리 */
    if (req.nextUrl.pathname.endsWith('rjkz%7BCjW')) {
        return NextResponse.redirect('/');
    }

    // ping check
    if (req.nextUrl.pathname.startsWith('/ping')) {
        return NextResponse.json({ result: true });
    }

    // 로그인
    if (req.nextUrl.pathname.startsWith('/login')) {
        const { isAuthenticated } = await checkAuthentication(req);

        if (isAuthenticated) {
            return NextResponse.redirect('/');
        }

        const returnUrl =
            req.nextUrl.searchParams.get('return_url') ||
            req.headers.get('referer');

        return expireAllCookies(
            `${process.env.ACCOUNT_HOST}/login?return_url=${btoa(returnUrl)}`,
        );
    }

    // 로그아웃
    if (req.nextUrl.pathname.startsWith('/logout')) {
        const { isAuthenticated, userData, token } = await checkAuthentication(
            req,
        );

        if (!isAuthenticated) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_MAIN_HOST}`,
            );
        }

        await authSdk.revokeToken(userData.id, token);
        return expireAllCookies(`${process.env.NEXT_PUBLIC_MAIN_HOST}`);
    }

    // 내 정보 수정
    if (req.nextUrl.pathname.startsWith('/change_info')) {
        return NextResponse.redirect(`${process.env.ACCOUNT_HOST}/change_info`);
    }

    // SSO 콜백
    if (req.nextUrl.pathname.startsWith('/auth/goorm/callback')) {
        const url = `${
            process.env.ACCOUNT_HOST
        }/auth/goorm/callback?${req.nextUrl.searchParams.toString()}`;
        return NextResponse.redirect(url);
    }

    // 재단 어드민 권한 체크
    if (req.nextUrl.pathname.startsWith('/foundation/admin')) {
        return await checkAuth({ roles: ['foundation'] })(
            req,
            undefined,
            NextResponse.next,
        );
    }

    return NextResponse.next();
}

export const config = {
    /*
     * lodash, qs 의 build time error 해결을 위한 코드
     * Dynamic Code Evaluation (e. g. 'eval', 'new Function', 'WebAssembly.compile') not allowed in Edge Runtime
     * Learn More: https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
     */
    unstable_allowDynamic: [
        '/node_modules/lodash/**',
        '/node_modules/function-bind/**',
    ],
    matcher: [
        '/ping',
        '/login',
        '/logout',
        '/auth/goorm/callback',
        '/foundation/admin/:path*',
        '/change_info',
        /** NOTE: 리다이렉트 이슈 해결될때까지 임시 방어 처리 */
        '/rjkz%7BCjW',
    ],
};
