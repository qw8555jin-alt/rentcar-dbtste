import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef';

function encryptAES256GCM(text: string): string {
  try {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${encrypted}:${authTag}`;
  } catch (e) {
    console.error("Encryption failed", e);
    return "";
  }
}

async function sendSolapiAlimtalk(phone: string, name: string) {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.warn("Solapi API keys are not configured. Skipping Alimtalk.");
    return;
  }

  // 실제 연동 시 Solapi API 호출 로직 구현
  console.log(`[SOLAPI] Sending Alimtalk to ${phone} for ${name}...`);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. 능동적 동의 체크 검증
    if (!data.isConsentChecked) {
      return NextResponse.json({ error: 'Privacy policy consent is required' }, { status: 400 });
    }

    // 2. 포트원 인증 ID 확인
    if (!data.identityVerificationId) {
      return NextResponse.json({ error: 'Verification is required' }, { status: 400 });
    }

    // 3. 민감 정보 암호화 (AES-256-GCM)
    const nameEncrypted = encryptAES256GCM(data.name);
    const phoneEncrypted = encryptAES256GCM(data.phone);

    // 4. DB 저장 로직 (Prisma 연결 전이므로 Mocking)
    console.log("Saving lead to DB:", {
      carId: data.carId,
      identityVerificationId: data.identityVerificationId,
      nameEncrypted,
      phoneEncrypted,
    });
    
    // 5. 알림톡 발송 (Solapi)
    await sendSolapiAlimtalk(data.phone, data.name);

    return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Submit lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
