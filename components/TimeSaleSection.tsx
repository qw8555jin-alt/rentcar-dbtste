import Image from 'next/image';

export default function TimeSaleSection() {
  const cars = [
    {
      brand: "현대",
      name: "더 뉴 투싼",
      desc: "중형 | SUV | 2026년형",
      price: "162,930",
    },
    {
      brand: "현대",
      name: "디 올 뉴 팰리세이드",
      desc: "대형 | SUV | 2025년형",
      price: "290,490",
    },
    {
      brand: "제네시스",
      name: "GV80",
      desc: "대형 | SUV | 2026년형",
      price: "360,530",
    },
    {
      brand: "기아",
      name: "쏘렌토",
      desc: "중형 | SUV | 2026년형",
      price: "168,060",
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">마감임박 특가</h2>
          <p className="text-slate-500">한정수량! 놓치면 후회하는 초특가 렌트료</p>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cars.map((car, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[280px] sm:w-[320px] bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="relative w-full aspect-[4/3] mb-6">
                <div className="absolute inset-0 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm group-hover:scale-105 transition-transform">
                  차량 이미지
                </div>
              </div>
              <div>
                <h5 className="text-sm font-bold text-blue-600 mb-1">{car.brand}</h5>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{car.name}</h3>
                <p className="text-xs text-slate-500 mb-6">{car.desc}</p>
                <div className="border-t border-slate-200 pt-4 flex items-end justify-between">
                  <span className="text-sm text-slate-500">월 렌트료</span>
                  <div className="text-right">
                    <h2 className="text-2xl font-black text-slate-900">
                      {car.price}<span className="text-base font-normal">원~</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 text-center text-sm text-slate-500 mt-4">
          가격정보 <span className="font-bold text-slate-700">36개월</span> | 초기비용 선납금 <span className="font-bold text-slate-700">30%</span> | 만 <span className="font-bold text-slate-700">26세</span>이상 기준
        </div>
      </div>
    </section>
  );
}
