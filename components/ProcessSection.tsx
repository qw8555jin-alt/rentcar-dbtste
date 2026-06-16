export default function ProcessSection() {
  const steps = [
    { 
      step: '1',
      title: "1분 견적 신청", 
      desc: "복잡한 서류 없이 연락처만 남겨주시면 바로 시작됩니다."
    },
    { 
      step: '2',
      title: "1:1 맞춤 상담", 
      desc: "원픽 전담 매니저가 고객님의 상황에 맞는 최적의 플랜을 설계합니다."
    },
    { 
      step: '3',
      title: "차량 및 옵션 선택", 
      desc: "원하시는 차량 모델과 세부 옵션, 렌트 조건을 확정합니다."
    },
    { 
      step: '4',
      title: "스마트 전자 계약", 
      desc: "번거로운 방문 없이 스마트폰으로 안전하고 간편하게 계약을 체결합니다."
    },
    { 
      step: '5',
      title: "로켓 인도", 
      desc: "계약 완료 즉시 대기 없이 집 앞까지 안전하게 차량을 인도해 드립니다."
    }
  ];

  return (
    <section className="section--alt w-full">
      <div className="section" style={{ maxWidth: '896px' }}>
        <div className="steps-section">
          <h2 className="steps-heading">내 차가 되기까지 단 5단계</h2>
          <p className="steps-subheading">복잡한 서류 작업 없이 빠르고 투명하게 진행됩니다.</p>

          <div className="steps-track">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
