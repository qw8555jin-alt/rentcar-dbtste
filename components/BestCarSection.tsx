import Image from 'next/image';

export default function BestCarSection() {
  const cars = [
    { brand: "기아", name: "쏘렌토", desc: "중형 | SUV", price: "168,060" },
    { brand: "현대", name: "더 뉴 그랜저", desc: "준대형 | 세단", price: "249,700" },
    { brand: "현대", name: "디 올 뉴 싼타페", desc: "중형 | SUV", price: "191,880" },
    { brand: "제네시스", name: "GV80", desc: "대형 | SUV", price: "370,180" },
    { brand: "현대", name: "더 뉴 투싼", desc: "중형 | SUV", price: "173,880" },
    { brand: "기아", name: "카니발", desc: "대형 | MPV", price: "244,100" }
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">원픽 BEST 랭킹</h2>
          <p className="text-slate-400">가장 많이 계약되는 베스트셀링 카</p>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cars.map((car, idx) => (
            <div key={idx} className="snap-center shrink-0 w-[240px] bg-slate-800 rounded-3xl p-5 border border-slate-700 hover:border-blue-500 cursor-pointer group">
              <div className="relative w-full aspect-[4/3] mb-4">
                <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full z-10">
                  {idx + 1}
                </div>
                <div className="absolute inset-0 bg-slate-700 rounded-2xl flex items-center justify-center text-slate-500 text-xs group-hover:scale-105 transition-transform">
                  차량 이미지
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-1">{car.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{car.desc}</p>
                <div className="text-blue-400 font-bold">
                  월 {car.price}원~
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
