import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return response;
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => request.cookies.getAll(), setAll(items: CookieToSet[]) { items.forEach(({name,value}) => request.cookies.set(name,value)); response = NextResponse.next({request}); items.forEach(({name,value,options}) => response.cookies.set(name,value,options)); } },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !user) return NextResponse.redirect(new URL('/admin/login', request.url));
  return response;
}
export const config = { matcher: ['/admin/:path*'] };
