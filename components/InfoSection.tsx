export default function InfoSection() {
  return (
    <section className="bg-[var(--color-bg-section)] w-full flex flex-col justify-center">
      <div className="section" style={{ maxWidth: '1024px' }}>
        <div className="longterm-section">
          <h2 className="longterm-title text-strong">
            장기렌트, <br className="md:hidden" />
            왜 요즘 많이 탈까요?
          </h2>
          <p className="longterm-body text-muted">
            비싼 목돈 없이, 매월 정해진 렌트료만 내고<br className="hidden md:block" />
            가장 스마트하게 내 차를 갖는 방법입니다.
          </p>
          
          <div className="longterm-feature-row">
            <div className="longterm-feature-card">
              <span className="longterm-feature-title text-primary">세금·보험료 등 추가 비용 없음</span>
              <span className="longterm-feature-desc text-muted">추가 비용이 전혀 없습니다</span>
            </div>
            <div className="longterm-feature-card">
              <span className="longterm-feature-title text-primary">계약 만기 시 인수 혹은 반납</span>
              <span className="longterm-feature-desc text-muted">자유롭게 선택하세요</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
