import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../src/lib/jwt';

// Helper to decode base64url (replicated from middleware for validation test)
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

// HMAC-SHA256 signature verification using Web Crypto API (replicated from middleware for validation test)
async function verifyJwtSignatureWebCrypto(token: string, secret: string): Promise<any | null> {
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

    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      sigBytes,
      dataBytes
    );

    return isValid ? payload : null;
  } catch (error) {
    console.error('WebCrypto verification error:', error);
    return null;
  }
}

async function runTests() {
  console.log('🧪 Iniciando testes de Autenticação e JWT...\n');

  const payload = {
    userId: 'test-user-id-123',
    email: 'test@guardian.com',
    role: 'ADMIN',
    tenantId: 'test-tenant-id-abc'
  };

  const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-jwt-key-2026';

  // 1. Test Access Token
  console.log('1. Testando assinatura e validação do Access Token (jsonwebtoken)...');
  const accessToken = signAccessToken(payload);
  console.log(`   Access Token Gerado: ${accessToken.slice(0, 30)}...`);
  
  const verifiedAccess = verifyAccessToken(accessToken);
  if (verifiedAccess && verifiedAccess.userId === payload.userId && verifiedAccess.role === payload.role) {
    console.log('   ✅ Access Token validado com sucesso.');
  } else {
    throw new Error('❌ Falha ao validar o Access Token.');
  }

  // 2. Test Refresh Token
  console.log('\n2. Testando assinatura e validação do Refresh Token...');
  const refreshToken = signRefreshToken({ userId: payload.userId });
  console.log(`   Refresh Token Gerado: ${refreshToken.slice(0, 30)}...`);
  
  const verifiedRefresh = verifyRefreshToken(refreshToken);
  if (verifiedRefresh && verifiedRefresh.userId === payload.userId) {
    console.log('   ✅ Refresh Token validado com sucesso.');
  } else {
    throw new Error('❌ Falha ao validar o Refresh Token.');
  }

  // 3. Test Invalid Token
  console.log('\n3. Testando rejeição de token inválido...');
  const invalidToken = accessToken + 'corrupted';
  const verifiedInvalid = verifyAccessToken(invalidToken);
  if (verifiedInvalid === null) {
    console.log('   ✅ Token corrompido foi rejeitado com sucesso.');
  } else {
    throw new Error('❌ Token corrompido foi aceito incorretamente.');
  }

  // 4. Test Web Crypto Verification (Middleware)
  console.log('\n4. Testando validação compatível com Next.js Middleware (Web Crypto)...');
  const decodedPayload = await verifyJwtSignatureWebCrypto(accessToken, JWT_SECRET);
  if (decodedPayload && decodedPayload.userId === payload.userId && decodedPayload.role === payload.role) {
    console.log('   ✅ Assinatura verificada pelo Web Crypto API com sucesso.');
  } else {
    throw new Error('❌ Web Crypto falhou ao verificar a assinatura do token.');
  }

  console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO! A criptografia e assinatura de tokens estão 100% corretas.');
}

runTests().catch(err => {
  console.error('\n❌ Ocorreu um erro durante os testes:', err);
  process.exit(1);
});
