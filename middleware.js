import { NextResponse } from 'next/server';
import authSdk from '@/server/libs/auth';
import { expireAllCookies, checkAuthentication } from '@/server/utils/auth';
import { checkAuth } from './server/middlewares/auth';

/** @type {import('next/server').NextMiddleware}*/
export async function middleware(req) {
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
    matcher: [
        '/login',
        '/logout',
        '/auth/goorm/callback',
        '/foundation/admin/:path*',
    ],
};
