'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function BrandDealSection() {
  const [activeTab, setActiveTab] = useState('hyundai');
  
  const tabs = [
    { id: 'hyundai', label: '현대' },
    { id: 'kia', label: '기아' },
    { id: 'genesis', label: '제네시스' },
    { id: 'etc', label: '르노/KG/쉐보레' },
  ];

  const cars = {
    hyundai: [
      { name: "더 뉴 투싼", price: "162,930", price_0: "436,200" },
      { name: "디 올 뉴 팰리세이드", price: "290,490", price_0: "610,060" },
      { name: "캐스퍼", price: "197,880", price_0: "295,190" },
      { name: "디 올 뉴 싼타페", price: "191,880", price_0: "516,100" },
    ],
    kia: [
      { name: "스포티지", price: "171,417", price_0: "454,000" },
      { name: "카니발", price: "244,100", price_0: "621,280" },
      { name: "쏘렌토", price: "168,060", price_0: "506,000" },
      { name: "셀토스", price: "178,334", price_0: "419,000" },
    ],
    genesis: [
      { name: "GV80", price: "370,180", price_0: "780,000" },
      { name: "G80", price: "380,167", price_0: "790,000" },
      { name: "GV70", price: "320,000", price_0: "690,000" },
    ],
    etc: [
      { name: "아르카나", price: "150,000", price_0: "380,000" },
      { name: "토레스", price: "180,000", price_0: "420,000" },
    ]
  };

  const activeCars = cars[activeTab as keyof typeof cars] || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h3 className="text-blue-600 font-bold mb-2">오직 선착순 300명만</h3>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">전국 최저가 이벤트!</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCars.map((car, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 h-14">{car.name}</h3>
                <div className="relative w-full aspect-[4/3] mb-6">
                  <div className="absolute inset-0 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
                    차량 이미지
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                    <span className="font-bold text-blue-800 text-sm">선납30%</span>
                    <span className="font-black text-blue-600 text-lg">{car.price}<span className="font-normal text-sm">원~</span></span>
                  </li>
                  <li className="flex justify-between items-center px-3 py-1">
                    <span className="font-bold text-slate-500 text-sm">무보증</span>
                    <span className="font-bold text-slate-700 text-base">{car.price_0}<span className="font-normal text-sm">원~</span></span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
