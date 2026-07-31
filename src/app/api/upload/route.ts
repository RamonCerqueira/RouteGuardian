import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function getAuthenticatedUser(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;
  return verifyAccessToken(token);
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthenticatedUser(req);
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Não autorizado.' }, { status: 401 });
    }

    const { image } = await req.json();

    if (!image || typeof image !== 'string') {
      return NextResponse.json({ success: false, message: 'Imagem não fornecida.' }, { status: 400 });
    }

    // Handle Data URL base64
    if (image.startsWith('data:image/')) {
      const matches = image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return NextResponse.json({ success: false, message: 'Formato de imagem inválido.' }, { status: 400 });
      }

      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      // Ensure /public/uploads/avatars directory exists
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `avatar-${crypto.randomUUID()}.${ext}`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/avatars/${fileName}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
      });
    }

    // If it's already a valid HTTP URL
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return NextResponse.json({
        success: true,
        url: image,
      });
    }

    return NextResponse.json({ success: false, message: 'Formato de imagem não suportado.' }, { status: 400 });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json({ success: false, message: 'Erro ao fazer upload da imagem.' }, { status: 500 });
  }
}
