"use client";

import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection({ variant }: { variant: string }) {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    if (variant === 'variant-B') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [variant]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isVariantB = variant === 'variant-B';

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {isVariantB ? (
          <div className={styles.badge}>기간 한정 실시간 할인율 적용 중</div>
        ) : (
          <div className={styles.badge}>프리미엄 장기렌트 & 오토리스</div>
        )}

        <h1 className={styles.title}>
          초기 비용 0원, <br />내 차를 갖는 가장 스마트한 방법
        </h1>
        <p className={styles.subtitle}>
          허위 매물 없이 투명한 견적. 대기업 금융사 제휴로 최저가 보장.
        </p>

        {isVariantB && (
          <div className={styles.timer}>
            <span>특가 마감까지</span>
            <span className={styles.timerText}>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>
    </section>
  );
}
