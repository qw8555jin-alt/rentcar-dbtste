"use client";

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [slotsLeft, setSlotsLeft] = useState(20);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // 당일 24시 (내일 0시) 구하기
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffMs = midnight.getTime() - now.getTime();
      
      if (diffMs <= 0) return { hours: 0, minutes: 0, seconds: 0 };

      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / 1000 / 60) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      return { hours, minutes, seconds };
    };

    // 초기값 설정
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 9초마다 잔여 접수 인원 1명씩 감소 (1명에서 멈춤)
    const slotTimer = setInterval(() => {
      setSlotsLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 9000);

    return () => clearInterval(slotTimer);
  }, []);

  if (!timeLeft) {
    return null; // 클라이언트 사이드 렌더링 전 깜빡임 방지
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      <style>{`
        @keyframes fastShrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        color: '#1e293b',
        padding: '10px 24px',
        borderRadius: '30px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: '0.95rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'max-content',
        maxWidth: '90vw',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontWeight: '600' }}>
            ⏳ 특가 할인 종료까지
          </div>
          <div style={{ 
            fontFamily: 'monospace', 
            fontWeight: '700', 
            color: '#ef4444',
            fontSize: '1.1rem',
            letterSpacing: '1px'
          }}>
            {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
          </div>
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '800',
            marginLeft: '4px'
          }}>
            잔여 접수 {slotsLeft}명
          </div>
        </div>
        
        {/* 오른쪽에서 왼쪽으로 2분 동안 줄어드는 애니메이션 바 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '4px',
          backgroundColor: '#ef4444',
          animation: 'fastShrink 120s linear infinite'
        }} />
      </div>
    </>
  );
}
