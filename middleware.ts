// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import { NextResponse } from 'next/server';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;


//   // Define public routes (won't be protected)
//   const publicRoutes = [
//     '/auth/sign-in',
//     '/auth/sign-up',       // Add if you have registration
//     '/auth/error',         // Add if you have error pages
//     '/api/auth',           // NextAuth API routes
//   ];

//   // Check if current route is public
//   const isPublicRoute = publicRoutes.some((route) => 
//     nextUrl.pathname.startsWith(route)
//   );

//   // Allow public routes and static files
//   if (isPublicRoute || 
//       nextUrl.pathname.startsWith('/_next') ||
//       nextUrl.pathname.includes('.') // static files
//   ) {
//     return;
//   }

//   // Add to your existing middleware
//   const signOutPaths = ['/auth/sign-out']

//   if (signOutPaths.includes(nextUrl.pathname)) {
//     const response = NextResponse.redirect('/auth/sign-in')
//     response.cookies.delete('next-auth.session-token')
//     return response
//   }

//   // Redirect unauthenticated users to login
//   if (!isLoggedIn) {
//     return Response.redirect(new URL('/auth/sign-in', nextUrl));
//   }
// });

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };  

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);
console.log(`out side block /n`)

export default auth((req) => {
  const { nextUrl, cookies } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  console.log(`out side block /n`)

  // Public routes
  const publicRoutes = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/error',
    '/api/auth',
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow public/static routes
  if (
    isPublicRoute ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // static files
  ) {
    return;
  }
  // Handle sign-out and delete cookies
  if (pathname === '/auth/sign-out') {
    const response = NextResponse.redirect(new URL('/auth/sign-in', req.url));

    // Delete all session-related cookies (plain and secure variants)
 console.log('inside block')
    const cookieNames = [
      'authjs.session-token',
      '__Secure-authjs.session-token',
      'authjs.csrf-token',
      '__Host-authjs.csrf-token',
      'authjs.callback-url',
    ];

    for (const name of cookieNames) {
      response.cookies.delete(name);
    }

    return response;
  }

  // Redirect unauthenticated users
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
