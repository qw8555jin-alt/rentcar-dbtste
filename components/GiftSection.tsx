export default function GiftSection() {
  const gifts = [
    {
      title: "프리미엄 썬팅 시공",
      desc: "측후면+전면 열차단",
      image: "/images/sunting.webp"
    },
    {
      title: "프리미엄 블랙박스",
      desc: "최고급 블랙박스 시공",
      image: "/images/blackbox.webp"
    },
    {
      title: "맞춤제작 코일매트",
      desc: "친환경 코일매트 시공",
      image: "/images/coil_mat.webp"
    },
    {
      title: "안전한 캐리어 탁송",
      desc: "원하는 시간, 원하는 장소로",
      image: "/images/maintenance.webp"
    }
  ];
  return (
    <section className="bg-[var(--color-bg-section-alt)] w-full py-12">
      <div className="section">
        
        <div style={{ marginBottom: '40px' }}>
          <h2 className="font-bold text-slate-900 break-keep" style={{ fontSize: '32px', lineHeight: '1.4', letterSpacing: '-0.02em' }}>
            수수료 0%에서 <br className="md:hidden" />
            <span className="text-[#0046FF]">끝나면 서운하죠?</span>
          </h2>
          <p className="text-slate-500 tracking-tight" style={{ fontSize: '15px', marginTop: '16px' }}>
            원픽만의 특별한 혜택
          </p>
        </div>

        <div>
          <div className="perks-grid">
            {gifts.map((gift, idx) => (
              <div key={idx} className="perk-card">
                <div className="perk-image-wrap">
                  <img src={gift.image} alt={gift.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="perk-text-wrap">
                  <div className="perk-title">{gift.title}</div>
                  <div className="perk-desc">{gift.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
