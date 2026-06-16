'use client';

import { useState, useEffect } from 'react';

const lastNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '전', '홍'];
const top10Cars = ['테슬라 모델 Y', '아반떼', '벤츠 E클래스', '아우디 A6', '싼타페', '쏘렌토', '카니발', '스포티지', '그랜저', '제네시스 G80'];
const otherCars = ['코란도', '쏘나타', '제네시스 GV80', '렉서스 ES300h', '토레스', 'K5', '팰리세이드', '캐스퍼', '레이', '모닝'];

function getRandomName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)] + '**';
}

function getRandomCar() {
  const isTop10 = Math.random() < 0.8;
  if (isTop10) {
    return top10Cars[Math.floor(Math.random() * top10Cars.length)];
  } else {
    return otherCars[Math.floor(Math.random() * otherCars.length)];
  }
}

export default function LiveStatusWidgets() {
  const [count, setCount] = useState(69);
  const [popups, setPopups] = useState<{ id: number; name: string; car: string }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    // 첫 팝업 노출
    setTimeout(() => {
       setPopups([{ id: ++idCounter, name: getRandomName(), car: getRandomCar() }]);
    }, 1000);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) return 100; 
        return prev + 1;
      });

      setPopups((prev) => {
        const newPopup = { id: ++idCounter, name: getRandomName(), car: getRandomCar() };
        // 최근 5명 리스트 유지 (배열의 앞쪽이 최신)
        const updated = [newPopup, ...prev];
        return updated.slice(0, 5);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 가장 최신 알림 (1개씩 뜨는 플로팅 토스트용)
  const latestPopup = popups.length > 0 ? popups[0] : null;

  return (
    <>
      {/* 1. 하단 입력폼 위에 위치하는 '최근 5명 접수 현황' 박스 */}
      <div className="mb-8 bg-white border border-slate-200 rounded-3xl p-5 md:p-6 shadow-md w-full">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <h4 className="text-base md:text-lg font-bold text-slate-800">실시간 접수 현황 <span className="text-slate-400 text-sm font-medium ml-1">(최근 5명)</span></h4>
        </div>
        <div className="space-y-2.5">
          {popups.map((popup, index) => {
            // 최신 항목일수록 진하게
            const opacity = index === 0 ? 1 : index === 1 ? 0.8 : index === 2 ? 0.6 : index === 3 ? 0.4 : 0.3;
            return (
              <div 
                key={popup.id} 
                className="flex items-center gap-3 bg-slate-50/80 px-4 py-3 rounded-2xl border border-slate-100 shadow-sm animate-slide-in"
                style={{ opacity }}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-[14px] md:text-[15px] text-slate-600 font-medium">
                  <span className="text-blue-600 font-bold">{popup.name}</span>님이 <span className="font-bold text-slate-800">{popup.car}</span> 무료견적을 신청했습니다.
                </p>
              </div>
            );
          })}
          {popups.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-sm md:text-base font-medium bg-slate-50 rounded-2xl">
              실시간 데이터를 불러오는 중입니다...
            </div>
          )}
        </div>
      </div>

      {/* 2. Floating Toast (하단 중앙에 1개씩 뜨고 사라지는 팝업 알림) */}
      <div className="fixed bottom-[80px] md:bottom-[90px] left-1/2 transform -translate-x-1/2 z-50 pointer-events-none w-[90%] max-w-[320px]">
        {latestPopup && (
          <div 
            key={latestPopup.id} 
            className="w-full bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 md:py-4 rounded-2xl shadow-xl border border-slate-700/50 flex items-center gap-3 animate-slide-in"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[13px] md:text-[14px] font-medium leading-snug">
                <span className="text-blue-400 font-bold">{latestPopup.name}</span>님이
              </p>
              <p className="text-[14px] md:text-[15px] font-bold leading-snug mt-0.5">
                {latestPopup.car} 무료견적 신청!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Bar (웹/모바일 하단 일자형 토스트 접수 카운터) */}
      <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.15)] animate-fade-in-up">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="font-bold text-sm md:text-base tracking-tight truncate">선착순 특가 접수 현황</span>
          </div>
          
          <div className="flex items-baseline gap-1.5 bg-blue-800/40 px-4 py-1.5 rounded-full shrink-0">
            <span className="text-xl md:text-2xl font-black">{count}</span>
            <span className="text-sm md:text-base text-blue-200">/ 100명</span>
          </div>
        </div>
      </div>
    </>
  );
}
