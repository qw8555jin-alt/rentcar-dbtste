import Image from 'next/image';

export default function ComparisonSection() {
  return (
    <>
      {/* 3번 섹션: 왜 저렴한가 (Storytelling -> Cards) */}
      <section className="bg-[var(--color-bg-section)] w-full">
        <div className="section">
          <div className="mb-10 md:mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold text-slate-900 tracking-tight leading-[1.3] break-keep">
              원픽 다이렉트는 <br className="md:hidden" />
              <span className="text-[#0046FF]">왜 저렴할까요?</span>
            </h2>
          </div>

          <div className="why-section">
            <h2 className="why-heading">원픽 다이렉트는 왜 저렴할까요?</h2>
            <p className="why-subheading">중간 거품을 완전히 빼고 고객에게 직거래로 연결합니다.</p>

            <div className="why-grid">
              {/* Problem */}
              <div className="why-card">
                <div className="why-number">1</div>
                <div className="why-title">보이지 않는 거품</div>
                <div className="why-desc">일반 계약 시 차량 가액의 최대 15%가 딜러 수당으로 월 렌트료에 몰래 포함됩니다.</div>
              </div>

              {/* Explanation */}
              <div className="why-card">
                <div className="why-number">2</div>
                <div className="why-title">복잡한 유통 구조</div>
                <div className="why-desc">본사에서 지점, 딜러로 이어지는 다단계 구조. 이 과정의 마진은 모두 고객 부담입니다.</div>
              </div>

              {/* Solution */}
              <div className="why-card" style={{ border: '2px solid var(--color-primary)' }}>
                <div className="why-number" style={{ background: 'var(--color-primary)', color: '#fff' }}>3</div>
                <div className="why-title" style={{ color: 'var(--color-primary)' }}>수수료 0원 다이렉트</div>
                <div className="why-desc">원픽은 딜러를 거치지 않아, 고객님은 차량의 순수 렌트료만 지불하시면 됩니다.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4번 섹션: 실제 견적 비교 (Savings Showcase) */}
      <section className="section--alt w-full">
        <div className="section" style={{ maxWidth: '1024px' }}>
          
          <div className="mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              실제 견적, 얼마나 차이날까요?
            </h2>
          </div>

          <div className="deals-section">
            <h2 className="deals-heading">실제 견적, 얼마나 차이날까요?</h2>
            <p className="deals-subheading">가장 많이 찾는 두 차종의 실제 견적입니다.</p>
            <p className="deals-tagline">선납금 30% 48개월 기준</p>

            <div className="deals-grid">
              
              {/* 벤츠 E클래스 카드 */}
              <div className="deal-card flex flex-col">
                <div className="w-full aspect-[4/3] bg-[#F5F7FA] rounded-xl relative overflow-hidden mb-4">
                  <Image src="/benz_eclass_v2.png" alt="벤츠 E클래스" fill className="object-contain p-4 mix-blend-multiply drop-shadow-xl" />
                </div>
                <div>
                  <div className="deal-chip">인기</div>
                  <div className="deal-title">벤츠 E-Class</div>
                  
                  <div className="deal-row">
                    <span className="deal-label">수수료 15% 포함</span>
                    <span className="deal-value text-slate-400 line-through decoration-slate-300">685,400원</span>
                  </div>
                  <div className="deal-row">
                    <span className="deal-label">원픽만의 견적가</span>
                    <span className="deal-value text-slate-900 text-[15px]">512,300원</span>
                  </div>
                  
                  <div className="deal-saving mt-3 pt-3 border-t border-slate-100 flex justify-between">
                    <span className="text-[13px] text-slate-600">월 절약가능 금액</span>
                    <span>173,100원</span>
                  </div>
                </div>
              </div>

              {/* 제네시스 GV80 카드 */}
              <div className="deal-card flex flex-col">
                <div className="w-full aspect-[4/3] bg-[#F5F7FA] rounded-xl relative overflow-hidden mb-4">
                  <Image src="/genesis_gv80_v2.png" alt="제네시스 GV80" fill className="object-contain p-4 mix-blend-multiply drop-shadow-xl" />
                </div>
                <div>
                  <div className="deal-chip">인기</div>
                  <div className="deal-title">제네시스 GV80</div>
                  
                  <div className="deal-row">
                    <span className="deal-label">수수료 15% 포함</span>
                    <span className="deal-value text-slate-400 line-through decoration-slate-300">653,200원</span>
                  </div>
                  <div className="deal-row">
                    <span className="deal-label">원픽만의 견적가</span>
                    <span className="deal-value text-slate-900 text-[15px]">488,500원</span>
                  </div>
                  
                  <div className="deal-saving mt-3 pt-3 border-t border-slate-100 flex justify-between">
                    <span className="text-[13px] text-slate-600">월 절약가능 금액</span>
                    <span>164,700원</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
