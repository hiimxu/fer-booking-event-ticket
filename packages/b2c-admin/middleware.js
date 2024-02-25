import { NextResponse } from 'next/server';

export function middleware(request) {
    const currentUser = false;

    if (currentUser) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.redirect(new URL('/auth', request.url));
}

export const config = {
    matcher: ['/auth'],
};
