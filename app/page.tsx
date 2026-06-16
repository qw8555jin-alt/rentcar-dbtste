import dynamic from 'next/dynamic';
import HeroSection from '../components/HeroSection';
import SectionSkeleton from '../components/Skeleton';

export const revalidate = 3600; // 1시간마다 ISR 재생성

// 아래 섹션들은 초기 렌더링 속도 향상을 위해 지연 로딩(Lazy Loading) 및 Skeleton 처리합니다.
const ConceptSection = dynamic(() => import('../components/ConceptSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const ComparisonSection = dynamic(() => import('../components/ComparisonSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const TargetSection = dynamic(() => import('../components/TargetSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const ProcessSection = dynamic(() => import('../components/ProcessSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const TestimonialSection = dynamic(() => import('../components/TestimonialSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const InfoSection = dynamic(() => import('../components/InfoSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const InstallmentVsRentSection = dynamic(() => import('../components/InstallmentVsRentSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const GiftSection = dynamic(() => import('../components/GiftSection'), { ssr: true, loading: () => <SectionSkeleton /> });
const LeadForm = dynamic(() => import('../components/LeadForm'));
const LiveStatusWidgets = dynamic(() => import('../components/LiveStatusWidgets'));
const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

export default function Home() {
  return (
    <main className="page min-h-screen pb-0">
      <HeroSection />
      <InfoSection />
      <TargetSection />
      <InstallmentVsRentSection />
      <ConceptSection />
      <ComparisonSection />
      <ProcessSection />
      <GiftSection />
      <TestimonialSection />
      
      {/* 최종 CTA (빠른 상담 신청 폼) */}
      <section className="bg-[var(--color-bg-section)] relative z-30 w-full pb-20 md:pb-32">
        <div className="section" style={{ maxWidth: '768px' }}>
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-slate-900 mb-6">최적가 1분 무료 견적</h2>
            <p className="text-[16px] md:text-[20px] text-slate-500 tracking-tight">수수료 0% 직판 요율로 안심하고 비교해보세요.</p>
          </div>
          
          <div style={{ marginBottom: '60px' }}>
            <LiveStatusWidgets />
          </div>

          <div className="text-center px-4" style={{ marginBottom: '60px' }}>
            <p className="text-[14px] md:text-[16px] text-red-500 font-bold bg-red-50 py-4 px-6 md:px-8 rounded-2xl inline-block shadow-sm">
              ⚠️ 상담 신청 후 고객님의 차량비용 절감을 위해<br className="md:hidden" />
              모르는 번호도 꼭 받아주세요.<br />
              <span className="text-[12px] md:text-[14px] font-medium opacity-80 mt-1 block">(장기부재 시 혜택이 다음 순번에게 넘어갑니다)</span>
            </p>
          </div>

          <div className="card-primary p-6 md:p-10 relative">
            <div className="p-0 md:p-2">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
