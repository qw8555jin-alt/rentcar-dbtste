"use client";

import { useState, useEffect } from 'react';

const NAMES = ["김*민", "이*현", "박*준", "최*영", "정*훈", "강*우", "조*서", "윤*진", "장*호", "임*윤", "한*성", "오*진"];
const CARS = [
  "현대 그랜저", "현대 싼타페", "현대 아반떼", "현대 팰리세이드",
  "현대 투싼", "제네시스 G80", "제네시스 GV80", "제네시스 GV70",
  "기아 쏘렌토", "기아 카니발", "기아 스포티지", "기아 K8",
  "BMW 520i", "BMW X5", "벤츠 E300", "벤츠 GLC", 
  "아우디 A6", "테슬라 Model Y", "테슬라 Model 3", "포르쉐 카이엔"
];

function generateRandomLead() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const car = CARS[Math.floor(Math.random() * CARS.length)];
  return { 
    id: Math.random().toString(36).substr(2, 9), 
    text: `${name}님이 ${car} 실시간 견적을 접수했습니다.` 
  };
}

export default function LiveFeed() {
  const [leads, setLeads] = useState<{id: string, text: string}[]>([]);

  useEffect(() => {
    // 초기 5명 세팅
    setLeads(Array.from({ length: 5 }, () => generateRandomLead()));

    // 9초마다 1명씩 새로 접수
    const interval = setInterval(() => {
      setLeads((prev) => {
        const newLeads = [generateRandomLead(), ...prev];
        return newLeads.slice(0, 5); // 5명 유지
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  if (leads.length === 0) return null;

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      border: '1px solid var(--border)',
      maxWidth: '600px',
      margin: '-20px auto 40px auto', // Hero 섹션과 겹치도록 자연스럽게 배치
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '8px' }}>
        <span style={{ 
          display: 'inline-block', 
          width: '10px', 
          height: '10px', 
          backgroundColor: '#ef4444', 
          borderRadius: '50%',
          animation: 'pulseRed 1.5s infinite' 
        }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
          실시간 상담 접수 현황
        </h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {leads.map((lead, idx) => (
          <div 
            key={lead.id} 
            style={{ 
              fontSize: '0.95rem', 
              color: '#475569', 
              paddingBottom: '16px',
              borderBottom: idx < leads.length - 1 ? '1px solid #f1f5f9' : 'none',
              animation: idx === 0 ? 'fadeInDown 0.5s ease-out' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <div style={{
              backgroundColor: '#dbeafe',
              color: '#2563eb',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              접수완료
            </div>
            <div style={{ lineHeight: '1.4' }}>{lead.text}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
}
