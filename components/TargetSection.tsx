export default function TargetSection() {
  const targets = [
    {
      title: "초기비용 0원",
      desc: "취등록세, 자동차세, 보험료 등 목돈 부담 없이 새 차를 시작할 수 있습니다.",
      icon: "💳"
    },
    {
      title: "신용등급 유지",
      desc: "대출로 잡히지 않아 개인 DSR 한도를 보존하고 신용등급에 영향이 없습니다.",
      icon: "📈"
    },
    {
      title: "건보료 할증 방어",
      desc: "개인 자산으로 잡히지 않아 재산세나 건강보험료 인상이 전혀 없습니다.",
      icon: "🛡️"
    },
    {
      title: "사업자 전액 절세",
      desc: "연간 최대 1,500만원까지 전액 경비 처리가 가능하여 압도적인 절세 효과를 냅니다.",
      icon: "💼"
    }
  ];

  return (
    <section className="section--alt relative w-full">
      <div className="section">
        <div className="mb-10 md:mb-16">
          <h2 className="text-[32px] md:text-[48px] font-bold text-strong tracking-tight leading-[1.3] break-keep">
            이런 분들께 <br className="md:hidden" />
            <span className="text-primary">적극 추천</span> 드려요
          </h2>
        </div>

        <div className="benefit-section">
          <h2 className="benefit-heading text-strong">장기렌트 핵심 혜택 4가지</h2>
          <p className="benefit-subheading text-muted">나에게 딱 맞는 스마트한 선택</p>

          <div className="benefit-grid">
            {targets.map((item, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{item.icon}</div>
                <div className="benefit-title text-strong">{item.title}</div>
                <div className="benefit-desc text-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
