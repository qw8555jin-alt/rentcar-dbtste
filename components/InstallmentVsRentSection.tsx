export default function InstallmentVsRentSection() {
  return (
    <section className="bg-[var(--color-bg-section)] w-full">
      <div className="section" style={{ maxWidth: '1024px' }}>
        <div className="compare-section">
          <h2 className="compare-heading">신차 할부 vs 장기렌트 얼마나 차이 날까요?</h2>
          <p className="compare-subheading">실제 견적 시뮬레이션</p>
          <div className="compare-tag">
            벤츠 E클래스 (8,990만 원) / 36개월 / 선납금 30% 기준
          </div>

          <div className="compare-grid">
            {/* Card 1: 일반 신차 할부 */}
            <div className="compare-card">
              <div className="compare-label">일반 신차 할부</div>
              <div className="compare-total">총 1억 818만 원</div>
              <div className="compare-list">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>선납금 (30%)</span>
                  <span className="font-semibold text-slate-800">2,697만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>취등록세/공채</span>
                  <span className="font-semibold text-red-500">+ 674만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>매월 납입금</span>
                  <span className="font-semibold text-slate-800">190만 원</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>자동차세/보험료</span>
                  <span className="font-semibold text-red-500">+ 605만 원</span>
                </div>
              </div>
            </div>

            {/* Card 2: 원픽 다이렉트 추천 */}
            <div className="compare-card" style={{ border: '2px solid var(--color-primary)' }}>
              <div className="compare-saving-badge">약 4,932만 원 절약!</div>
              <div className="compare-label" style={{ color: 'var(--color-primary)' }}>원픽 다이렉트 추천</div>
              <div className="compare-total" style={{ color: 'var(--color-primary)' }}>총 5,886만 원</div>
              <div className="compare-list">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>선납금 (30%)</span>
                  <span className="font-semibold text-slate-800">2,697만 원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>취등록세/공채</span>
                  <span className="font-semibold text-slate-800">0원</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>매월 납입금</span>
                  <span className="font-semibold text-slate-800">88만 원</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>자동차세/보험료</span>
                  <span className="font-semibold text-slate-800">0원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
