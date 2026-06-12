import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieName = 'ab-test-variant';
  let variant = request.cookies.get(cookieName)?.value;

  if (!variant) {
    // 50%의 확률로 대안 A(기본형)와 대안 B(할인 배지 강조형) 무작위 배정
    variant = Math.random() < 0.5 ? 'variant-A' : 'variant-B';
  }

  const response = NextResponse.next();
  response.cookies.set(cookieName, variant, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일 유지
    httpOnly: true,
  });

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
