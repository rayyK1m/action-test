import { NextResponse } from 'next/server';
import authSdk from '@/server/libs/auth';
import { expireAllCookies, checkAuthentication } from '@/server/utils/auth';

export async function middleware(req) {
    // 로그인
    if (req.nextUrl.pathname.startsWith('/login')) {
        const { isAuthenticated } = await checkAuthentication(req);

        if (isAuthenticated) {
            return NextResponse.redirect('/');
        }

        return expireAllCookies(`${process.env.ACCOUNT_HOST}/login`);
    }

    // 로그아웃
    if (req.nextUrl.pathname.startsWith('/logout')) {
        const { isAuthenticated, userData, token } = await checkAuthentication(
            req,
        );

        if (!isAuthenticated) {
            return NextResponse.redirect(`${process.env.MAIN_HOST}`);
        }

        await authSdk.revokeToken(userData.id, token);
        return expireAllCookies(`${process.env.MAIN_HOST}`);
    }

    // SSO 콜백
    if (req.nextUrl.pathname.startsWith('/auth/goorm/callback')) {
        const url = `${
            process.env.ACCOUNT_HOST
        }/auth/goorm/callback?${req.nextUrl.searchParams.toString()}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/logout', '/auth/goorm/callback'],
};
