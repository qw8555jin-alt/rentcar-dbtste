import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { identityVerificationId } = await request.json();

    if (!identityVerificationId) {
      return NextResponse.json({ error: 'Missing identityVerificationId' }, { status: 400 });
    }

    // 포트원 V2 API: 본인인증 단건 조회
    const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET || '';
    const response = await fetch(`https://api.portone.io/identity-verifications/${encodeURIComponent(identityVerificationId)}`, {
      method: 'GET',
      headers: {
        'Authorization': `PortOne ${PORTONE_API_SECRET}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to verify with PortOne' }, { status: response.status });
    }

    const verification = await response.json();

    if (verification.status !== 'VERIFIED') {
      return NextResponse.json({ error: 'Not verified' }, { status: 403 });
    }

    const { verifiedCustomer } = verification;

    // 정상 검증된 이름과 연락처 반환
    return NextResponse.json({
      success: true,
      name: verifiedCustomer.name,
      phone: verifiedCustomer.phoneNumber,
      identityVerificationId,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
