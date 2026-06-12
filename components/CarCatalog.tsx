"use client";

import Image from 'next/image';

const CARS = [
  {
    id: 1,
    name: '현대 디 올 뉴 그랜저',
    type: '대형 세단',
    price30: '월 39만 원대',
    price50: '월 28만 원대',
    image: '/images/car_grandeur_1781281501206.png',
  },
  {
    id: 2,
    name: '제네시스 G80',
    type: '프리미엄 세단',
    price30: '월 58만 원대',
    price50: '월 42만 원대',
    image: '/images/car_g80_1781281512053.png',
  },
  {
    id: 3,
    name: '기아 쏘렌토',
    type: '중형 SUV',
    price30: '월 37만 원대',
    price50: '월 26만 원대',
    image: '/images/car_sorento_1781281524269.png',
  },
  {
    id: 4,
    name: '현대 디 올 뉴 싼타페',
    type: '중형 SUV',
    price30: '월 38만 원대',
    price50: '월 27만 원대',
    image: '/images/car_santafe_1781281534478.png',
  }
];

export default function CarCatalog() {
  const handleConsultClick = (carName: string) => {
    const bottomForm = document.getElementById('bottom-lead-form');
    if (bottomForm) {
      bottomForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ margin: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '12px' }}>
          🔥 이달의 인기 차종 특가 라인업
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          초기 비용 0원, 업계 최저가 보장! 인기 모델을 가장 합리적인 월 납입금으로 만나보세요.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>
        {CARS.map(car => (
          <div key={car.id} style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'relative', width: '100%', height: '220px', background: '#ffffff' }}>
              <Image 
                src={car.image} 
                alt={car.name} 
                fill 
                style={{ objectFit: 'contain', padding: '16px' }} 
              />
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #f8fafc' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '6px' }}>
                {car.type}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}>
                {car.name}
              </h3>
              
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>선납금 30% 기준</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#334155' }}>{car.price30}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 800 }}>선납금 50% 기준</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ef4444' }}>{car.price50}</span>
                </div>
              </div>

              <button 
                onClick={() => handleConsultClick(car.name)}
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  borderRadius: '8px', 
                  fontWeight: 700, 
                  fontSize: '1rem',
                  transition: 'background 0.2s',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--primary)'}
              >
                이 차종 무료 견적 받기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
