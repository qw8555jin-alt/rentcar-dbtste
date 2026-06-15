"use client";

import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.badge}>프리미엄 장기렌트 & 오토리스</div>

        <h1 className={styles.title}>
          초기 비용 0원, <br />내 차를 갖는 가장 스마트한 방법
        </h1>
        <p className={styles.subtitle}>
          허위 매물 없이 투명한 견적. 대기업 금융사 제휴로 최저가 보장.
        </p>
      </div>
    </section>
  );
}
