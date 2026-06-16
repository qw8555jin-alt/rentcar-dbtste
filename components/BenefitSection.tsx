export default function BenefitSection() {
  const benefits = [
    "프리미엄 썬팅 (자외선 차단율 99% 보증)",
    "최고급 코일매트 (맞춤형 핏팅)",
    "고화질 2채널 블랙박스",
    "3년 소모품 무상 교체"
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-20 md:mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            계약하시는 모든 분들께<br/>드리는 4가지 혜택
          </h2>
          <p className="text-xl text-slate-500 font-medium tracking-tight">차량 이용에 필요한 모든 것을 담았습니다.</p>
        </div>

        <ul className="space-y-6">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-4 text-xl md:text-2xl font-semibold text-slate-800 tracking-tight">
              <span className="text-[#0046FF]">✓</span> {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
