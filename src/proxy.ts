import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function safeNext(next: string | null) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/check'
  }

  return next
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.toLowerCase() === '/admin' && pathname !== '/admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  const isProtectedRoute =
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/check' ||
    pathname === '/report' ||
    pathname === '/reports' ||
    pathname.startsWith('/reports/')
  const isLoginRoute = pathname === '/login'

  if (!isProtectedRoute && !isLoginRoute) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes redirect to login if not authenticated.
  // /report/[slug] is intentionally public; only the bare /report route (sessionStorage flow) requires auth.
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', `${pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(url)
  }

  // If logged in and trying to access login page, redirect to check.
  if (user && isLoginRoute) {
    const url = request.nextUrl.clone()
    url.pathname = safeNext(request.nextUrl.searchParams.get('next'))
    url.search = ''
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
