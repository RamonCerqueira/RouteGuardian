import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-jwt-key-2026';

// Helper to decode base64url
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

// HMAC-SHA256 signature verification using Web Crypto API (Edge-compatible)
async function verifyJwtSignature(token: string, secret: string): Promise<any | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const payloadStr = base64urlDecode(payloadB64);
    const payload = JSON.parse(payloadStr);

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(`${headerB64}.${payloadB64}`);
    const secretBytes = encoder.encode(secret);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigStr = base64urlDecode(signatureB64);
    const sigBytes = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, dataBytes);

    return isValid ? payload : null;
  } catch (error) {
    console.error('Middleware JWT verification error:', error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ─── Public pages (no auth required) ───────────────────────────────────────
  const isPublicPage =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/cadastro' ||
    pathname === '/pricing' ||
    pathname === '/forgot-password' ||
    pathname === '/reset-password';

  // ─── Public API routes ──────────────────────────────────────────────────────
  const isPublicApi =
    pathname === '/api/auth/login' ||
    pathname === '/api/auth/register' ||
    pathname === '/api/auth/refresh' ||
    pathname === '/api/auth/forgot-password' ||
    pathname === '/api/auth/reset-password' ||
    pathname === '/api/stripe/webhook'; // Stripe sends unsigned (but verified inside)

  // ─── Static assets bypass ───────────────────────────────────────────────────
  if (
    isPublicApi ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // ─── Get token from cookie or Authorization header ──────────────────────────
  let token = req.cookies.get('accessToken')?.value;
  if (!token) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  const decoded = token ? await verifyJwtSignature(token, JWT_SECRET) : null;
  const isApiRoute = pathname.startsWith('/api/');

  // ─── Not authenticated ──────────────────────────────────────────────────────
  if (!decoded) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: 'Não autorizado. Token ausente ou expirado.' },
        { status: 401 }
      );
    }
    if (!isPublicPage) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ─── Authenticated: redirect away from public pages ────────────────────────
  if (isPublicPage) {
    const url = req.nextUrl.clone();
    if (decoded.role === 'DRIVER') {
      url.pathname = '/driver';
    } else {
      url.pathname = '/dashboard';
    }
    return NextResponse.redirect(url);
  }

  // ─── Subscription gate ──────────────────────────────────────────────────────
  const subscriptionStatus = decoded.subscriptionStatus as string | undefined;
  const trialEndsAt = decoded.trialEndsAt as string | undefined;
  const tenantCreatedAt = decoded.tenantCreatedAt as string | undefined;

  const isSubscriptionPage = pathname === '/subscription';
  const isStripeApi = pathname.startsWith('/api/stripe/');
  const isTenantInfoApi = pathname === '/api/tenant/user-count'; // needed before subscription is active

  // Determine if access should be granted
  const isStripeActive = subscriptionStatus === 'ACTIVE';

  // Calculate if trial is valid (before the 8th day / within 7 days of use)
  let isTrialValid = false;
  if (subscriptionStatus !== 'CANCELED') {
    const trialEndTime = trialEndsAt
      ? new Date(trialEndsAt).getTime()
      : tenantCreatedAt
      ? new Date(tenantCreatedAt).getTime() + 7 * 24 * 60 * 60 * 1000
      : Date.now() + 7 * 24 * 60 * 60 * 1000; // fallback to 7 days from now

    isTrialValid = Date.now() < trialEndTime;
  }

  const accessGranted = isStripeActive || isTrialValid;

  if (!accessGranted && !isSubscriptionPage && !isStripeApi && !isTenantInfoApi) {
    // Drivers should still be able to access driver routes (company handles payment)
    if (decoded.role !== 'DRIVER') {
      const url = req.nextUrl.clone();
      url.pathname = '/subscription';
      url.searchParams.set('reason', 'trial_expired');
      return NextResponse.redirect(url);
    }
  }

  // ─── SuperAdmin Protection ───────────────────────────────────────────────
  const isAdminRoute = pathname.startsWith('/admin');
  if (isAdminRoute && decoded.email !== 'admin@guardian.com' && decoded.role !== 'SUPERADMIN') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // ─── RBAC ───────────────────────────────────────────────────────────────────
  const isDriverRoute = pathname.startsWith('/driver');
  const isDashboardRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/routes') ||
    pathname.startsWith('/deliveries') ||
    pathname.startsWith('/clients') ||
    pathname.startsWith('/vehicles') ||
    pathname.startsWith('/users') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/admin');

  if (decoded.role === 'DRIVER' && isDashboardRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/driver';
    return NextResponse.redirect(url);
  }

  if ((decoded.role === 'ADMIN' || decoded.role === 'SUPERVISOR') && isDriverRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth/login|api/auth/register|api/auth/refresh|api/auth/forgot-password|api/auth/reset-password|api/stripe/webhook|_next/static|_next/image|favicon.ico).*)',
  ],
};
