import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-jwt-key-2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-super-secret-refresh-key-2026';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  tenantId: string;
  subscriptionStatus?: string;
  trialEndsAt?: string; // ISO string — allows middleware to check expiry without a DB hit
  tenantCreatedAt?: string;
}

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('Access JWT verification failed:', error);
    return null;
  }
}

export function signRefreshToken(payload: { userId: string }): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyRefreshToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
  } catch (error) {
    console.error('Refresh JWT verification failed:', error);
    return null;
  }
}
