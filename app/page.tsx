import { cookies } from 'next/headers';
import HeroSection from '../components/HeroSection';
import CountdownTimer from '../components/CountdownTimer';
import LiveFeed from '../components/LiveFeed';
import LeadForm from '../components/LeadForm';
import CarCatalog from '../components/CarCatalog';

export default async function Home() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('ab-test-variant')?.value || 'variant-A';

  return (
    <main style={{ paddingBottom: '120px' }}>
      <HeroSection variant={variant} />
      <CountdownTimer />
      
      <div className="container">
        <LeadForm title="🔥 특가 마감 전 빠른 견적 신청" />
        <CarCatalog />
      </div>
      
      <section style={{ padding: '80px 0', textAlign: 'center', background: '#ffffff' }}>
        <div className="container">
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginBottom: '24px' }}>
            수많은 고객이 증명하는 투명성
          </h2>
          <p style={{ color: '#64748b', fontSize: 'var(--text-lg)', marginBottom: '40px' }}>
            대기업 제휴사 평점 4.9/5.0, 누적 상담 10만 건 돌파
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: '1 1 300px', textAlign: 'left' }}>
              <p style={{ color: '#f59e0b', fontSize: '20px', marginBottom: '12px' }}>★★★★★</p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: '20px' }}>
                "다른 곳보다 월 3만 원 저렴하게 계약했습니다. 숨겨진 비용 없이 투명해서 좋았어요."
              </p>
              <p style={{ color: '#94a3b8', fontSize: 'var(--text-sm)' }}>강남구 김*민님 / 그랜저 2.5 가솔린</p>
            </div>
            <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: '1 1 300px', textAlign: 'left' }}>
              <p style={{ color: '#f59e0b', fontSize: '20px', marginBottom: '12px' }}>★★★★★</p>
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: '20px' }}>
                "초기 비용 없이 최신형 제네시스를 타게 되어 만족합니다. 일주일 만에 출고받았어요."
              </p>
              <p style={{ color: '#94a3b8', fontSize: 'var(--text-sm)' }}>부산 이*현님 / G80 2.5 터보</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container" id="bottom-lead-form" style={{ marginTop: '40px' }}>
        <LiveFeed />
        <LeadForm title="🚗 실시간 최적가 견적 신청하기" />
      </div>
    </main>
  );
}
