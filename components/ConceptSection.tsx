export default function ConceptSection() {
  const strengths = [
    {
      title: "중간 유통 마진 제로",
      desc: "영업사원 수당을 완전히 배제하여 불필요한 비용을 모두 없앴습니다.",
      icon: "💸"
    },
    {
      title: "7일 이내 로켓 출고",
      desc: "제조사 선도 차량을 대량 확보하여 기다림 없이 바로 인도해 드립니다.",
      icon: "🚀"
    },
    {
      title: "초기비용 완전 0원",
      desc: "취등록세, 보험료, 자동차세 등 목돈 없이 새 차를 시작하세요.",
      icon: "🎉"
    }
  ];

  return (
    <section className="bg-[var(--color-bg-section)] w-full">
      <div className="section">
        <div className="mb-10 md:mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-strong tracking-tight leading-[1.3] break-keep">
            원픽 다이렉트만의 <br className="md:hidden" />
            <span className="text-primary">특별한 장점</span>
          </h2>
        </div>

        <div className="features-section">
          <h2 className="features-heading text-strong">원픽 다이렉트만의 특별한 장점</h2>
          <p className="features-subheading text-muted">다른 곳과 비교할 수 없는 압도적인 혜택을 경험하세요.</p>

          <div className="features-grid">
            {strengths.map((item, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{item.icon}</div>
                <div className="feature-title text-strong">{item.title}</div>
                <div className="feature-desc text-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
