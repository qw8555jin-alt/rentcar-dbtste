'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-slate-900 h-[100dvh] min-h-[700px] w-full flex flex-col items-center justify-center pt-16 md:pt-20 relative overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero_benz_sedan.png" 
          alt="Premium Sedan" 
          fill 
          className="object-cover object-center opacity-40 md:opacity-50"
          priority
        />
        {/* Gradient Overlay for text readability (Centered) */}
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40"></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center justify-center relative z-10 h-full mt-[-2vh] md:mt-0">
        
        <div className="bg-[#0046FF] text-white px-6 py-3 rounded-full font-bold text-sm md:text-base tracking-tight mb-10 shadow-[0_8px_20px_rgba(0,70,255,0.3)] flex items-center gap-2 animate-pulse w-fit mx-auto border border-blue-400/30">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          선착순 100분 한정 수수료 0% 특가
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.2]">
          수수료 0원, 가장 완벽한 장기렌트
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-14 font-medium tracking-tight leading-relaxed">
          영업사원 마진을 100% 제거한<br className="hidden md:block"/>
          다이렉트 최적가를 지금 확인하세요.
        </p>

      </div>
    </section>
  );
}
