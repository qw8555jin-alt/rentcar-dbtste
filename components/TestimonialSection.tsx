'use client';
import { useRef, useState, useEffect } from 'react';

export default function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 기본 후기 데이터 (이미 절감액은 실제 조사 기반이며 중복 "아꼈어요"는 제거됨)
  const baseTestimonials = [
    {
      id: 1,
      name: "구*관님의 후기",
      regionCar: "인천 | K8",
      type: "장기렌트",
      saved: "상담 후 150만원",
      date: "2025-07-17",
      quote: "원픽오토 구본관 팀장 K8 장기렌트 출고 후기...",
      image: "/reviews/review_1.webp",
    },
    {
      id: 2,
      name: "주*******름님의 후기",
      regionCar: "서울 | G80",
      type: "장기렌트",
      saved: "상담 후 180만원",
      date: "2025-07-17",
      quote: "제네시스 G80 AWD 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_2.webp",
    },
    {
      id: 3,
      name: "김*정님의 후기",
      regionCar: "창원 | EV3",
      type: "장기렌트",
      saved: "상담 후 120만원",
      date: "2025-07-17",
      quote: "기아 EV3 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_3.webp",
    },
    {
      id: 4,
      name: "주*******발님의 후기",
      regionCar: "경기 | EV3",
      type: "장기렌트",
      saved: "상담 후 140만원",
      date: "2025-07-17",
      quote: "EV3 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_4.webp",
    },
    {
      id: 5,
      name: "방*아님의 후기",
      regionCar: "평택 | GV80",
      type: "장기렌트",
      saved: "상담 후 200만원",
      date: "2025-07-17",
      quote: "제네시스 GV80 2.5T 2WD 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_5.webp",
    },
    {
      id: 6,
      name: "손*숙님의 후기",
      regionCar: "영등포 | GV80",
      type: "장기렌트",
      saved: "상담 후 170만원",
      date: "2025-07-17",
      quote: "서울 영등포에서 개인사업자를 운영하시는 고객님께서 프리미엄 SUV를 알아보시던 중 제네시스 GV80을 선택해주셨습니다...",
      image: "/reviews/review_6.webp",
    },
    {
      id: 7,
      name: "㈜*****그님의 후기",
      regionCar: "서울 | 벤츠 GLS 580",
      type: "장기렌트",
      saved: "상담 후 250만원",
      date: "2025-07-17",
      quote: "벤츠 GLS 580 4MATIC 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_7.webp",
    },
    {
      id: 8,
      name: "이*****니님의 후기",
      regionCar: "대구 | EV9",
      type: "장기렌트",
      saved: "상담 후 220만원",
      date: "2025-07-17",
      quote: "기아 EV9 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_8.webp",
    },
    {
      id: 9,
      name: "임*호님의 후기",
      regionCar: "서울 | K8",
      type: "장기렌트",
      saved: "상담 후 140만원",
      date: "2025-07-17",
      quote: "기아 K8 장기렌트 상담을 진행했습니다...",
      image: "/reviews/review_9.webp",
    },
    {
      id: 10,
      name: "최*지님의 후기",
      regionCar: "서울 | 스포티지",
      type: "장기렌트",
      saved: "상담 후 160만원",
      date: "2025-07-17",
      quote: "(주)○○건설 법인 명의로 스포티지 하이브리드 장기렌트 상담을 진행했습니다...",
      image: "/reviews/review_10.webp",
    },
    {
      id: 11,
      name: "조*원님의 후기",
      regionCar: "서울 | 싼타페",
      type: "장기렌트",
      saved: "상담 후 110만원",
      date: "2025-07-17",
      quote: "현대 싼타페 하이브리드 7인승 장기렌트 상담을 진행했습니다...",
      image: "/reviews/review_11.webp",
    },
    {
      id: 12,
      name: "이*문님의 후기",
      regionCar: "인천 | 투싼하이브리드",
      type: "장기렌트",
      saved: "상담 후 190만원",
      date: "2025-07-17",
      quote: "현대 투싼 하이브리드 H-PICK 익스테리어 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_12.webp",
    },
    {
      id: 13,
      name: "(******크님의 후기",
      regionCar: "서울 | 싼타페",
      type: "장기렌트",
      saved: "상담 후 210만원",
      date: "2025-07-17",
      quote: "법인 명의로 현대 싼타페 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_13.webp",
    },
    {
      id: 14,
      name: "안*혜님의 후기",
      regionCar: "경기 | BMW 520I",
      type: "장기렌트",
      saved: "상담 후 230만원",
      date: "2025-07-17",
      quote: "BMW 5시리즈 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_14.webp",
    },
    {
      id: 15,
      name: "박*수님의 후기",
      regionCar: "부산 | K8",
      type: "장기렌트",
      saved: "상담 후 240만원",
      date: "2025-07-17",
      quote: "2026 K8 장기렌트 출고를 완료했습니다...",
      image: "/reviews/review_15.webp",
    },
  ];

  // 무한 루프를 위해 앞·뒤 복제본을 붙여 3배 배열 생성
  const testimonials = [...baseTestimonials, ...baseTestimonials, ...baseTestimonials];

  // 초기 인덱스를 원본 배열 중간에 위치시킴 (첫 번째 원본 아이템이 가운데에 오도록)
  const [currentIndex, setCurrentIndex] = useState(baseTestimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 3초마다 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => prev + 1), 3000);
    return () => clearInterval(timer);
  }, []);

  // 인덱스가 바뀔 때 스크롤 및 무한 루프 보정
  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const targetItem = container.children[currentIndex] as HTMLElement;
    if (!targetItem) return;

    const containerCenter = container.offsetWidth / 2;
    const itemCenter = targetItem.offsetWidth / 2;

    container.scrollTo({
      left: targetItem.offsetLeft - containerCenter + itemCenter,
      behavior: isTransitioning ? 'auto' : 'smooth',
    });

    if (isTransitioning) {
      requestAnimationFrame(() => setIsTransitioning(false));
    }

    if (currentIndex >= baseTestimonials.length * 2) {
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(currentIndex - baseTestimonials.length);
      }, 600);
    }

    if (currentIndex < baseTestimonials.length) {
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(currentIndex + baseTestimonials.length);
      }, 600);
    }
  }, [currentIndex, isTransitioning, baseTestimonials.length]);

  const scroll = (direction: 'left' | 'right') => {
    setCurrentIndex((prev) => (direction === 'left' ? prev - 1 : prev + 1));
  };

  return (
    <section className="relative w-full bg-[var(--color-bg-section)] overflow-hidden flex flex-col justify-center">
      <div className="section relative z-10 flex flex-col items-center">
        <div className="mb-16 md:mb-28 flex flex-col items-center text-center gap-4">
          <div className="section-badge">
            Customer Reviews
          </div>
          <h2 className="text-[32px] md:text-[48px] font-bold text-slate-900 tracking-tight leading-[1.3] text-center break-keep mt-2">
            원픽 다이렉트<br />수많은 고객님들이 만족하셨습니다.
          </h2>
        </div>
      </div>

      {/* Carousel container – overflow-x-hidden keeps items visible while allowing swipe */}
      <div className="relative w-full z-20">
        <div ref={scrollRef} className="flex gap-8 overflow-x-scroll pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((item, idx) => (
            <div key={item.id + '_' + idx} className="card-secondary flex-shrink-0 w-[280px] md:w-[340px] flex flex-col overflow-hidden">
              <div className="w-full h-[180px] md:h-[220px] relative bg-slate-200">
                <img src={item.image} alt={item.regionCar} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-[10px] shadow-md border border-blue-100/50 flex items-center gap-1.5">
                  <span className="text-blue-500 text-[13px]">🏷️</span>
                  <span className="text-[13px] font-bold text-slate-800 tracking-tight">
                    {item.saved} <span className="text-blue-600">아꼈어요</span>
                  </span>
                </div>
              </div>
              <div className="p-5 md:p-6 flex flex-col bg-white h-[200px] md:h-[220px]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-[16px] md:text-[18px] text-slate-900 leading-none mb-1.5">{item.name}</h3>
                    <p className="text-[12px] md:text-[13px] text-slate-500">{item.regionCar}</p>
                  </div>
                  <span className="bg-[#0046FF] text-white text-[11px] font-bold px-3 py-1 rounded-[6px]">{item.type}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex text-[#FFC107] text-[14px]">★★★★★</div>
                  <span className="text-[11px] text-slate-400 tracking-tight">{item.date}</span>
                </div>
                <p className="text-[12px] md:text-[13px] text-slate-600 leading-relaxed line-clamp-3 break-keep whitespace-pre-wrap">{item.quote}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button onClick={() => scroll('left')} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 border border-slate-200 bg-white/90 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md z-30 transition-all cursor-pointer backdrop-blur-md shadow-sm" aria-label="이전 후기">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={() => scroll('right')} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 border border-slate-200 bg-white/90 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md z-30 transition-all cursor-pointer backdrop-blur-md shadow-sm" aria-label="다음 후기">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l-7 7 7 7"/></svg>
        </button>
      </div>
    </section>
  );
}

