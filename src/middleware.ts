import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;

    // Define public paths
    const publicPaths = ['/login', '/register'];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    if (!session && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (session) {
        try {
            await decrypt(session);
            // If user is logged in and tries to access login/register, redirect to dashboard
            if (isPublicPath) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            // Invalid session
            if (!isPublicPath) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
