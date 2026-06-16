export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] pt-12 px-6 relative z-10 border-t border-slate-800" style={{ paddingBottom: '200px' }}>
      <div className="container mx-auto max-w-5xl">
        {/* Logo Area */}
        <div className="mb-10 inline-block">
          <div className="flex flex-col items-start">
            <h2 className="text-white text-[32px] md:text-[40px] font-black tracking-widest leading-none mb-2" style={{ letterSpacing: '0.15em' }}>
              ONEPICK
            </h2>
            <p className="text-slate-300 text-[13px] md:text-[14px] tracking-widest font-semibold">
              장기렌트 & 오토리스 <span className="text-white font-bold ml-1">원픽</span>
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="flex flex-col gap-2.5 text-[13px] md:text-[14px] text-[#888888] tracking-tight leading-relaxed">
          <p>회사명 : 원픽</p>
          <p>대표자 : 한기웅</p>
          <p className="break-keep">사업자소재지 : 인천시 계양구 오조산로57번길 11 삼성프라자 403호</p>
          <p>사업자등록번호 : 632-42-00210</p>
          <p>광고대행사 및 마케팅 전화 절대사절</p>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-[12px] md:text-[13px] text-[#666666] tracking-tight">
          Copyright &copy; 주식회사 원픽 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
