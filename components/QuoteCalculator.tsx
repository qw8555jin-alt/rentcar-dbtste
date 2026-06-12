"use client";

import { useState, useMemo } from 'react';
import styles from './QuoteCalculator.module.css';
import { calculateMonthlyPayment } from '../lib/calculator';

const CAR_OPTIONS = [
  { id: 1, name: '현대 그랜저', price: 37430000 },
  { id: 2, name: '제네시스 G80', price: 58900000 },
  { id: 3, name: '기아 쏘렌토', price: 37860000 },
  { id: 4, name: '기아 카니발', price: 34700000 },
  { id: 5, name: '현대 싼타페', price: 38880000 },
  { id: 6, name: '제네시스 GV80', price: 69300000 },
  { id: 7, name: 'BMW 520i', price: 73300000 },
  { id: 8, name: '벤츠 E300', price: 89900000 },
  { id: 9, name: '테슬라 Model Y', price: 54990000 },
];

export default function QuoteCalculator() {
  const [productType, setProductType] = useState<'RENT' | 'LEASE'>('RENT');
  const [selectedCarId, setSelectedCarId] = useState(1);
  const [termMonths, setTermMonths] = useState(48);
  const [prepayRatio, setPrepayRatio] = useState(0.3); // 30%

  const selectedCar = CAR_OPTIONS.find((c) => c.id === selectedCarId)!;

  const monthlyPayment = useMemo(() => {
    return calculateMonthlyPayment({
      price: selectedCar.price,
      prepayRatio: prepayRatio,
      termMonths: termMonths,
      residualRatio: 0.4, 
      interestRate: 0.05, 
      isRent: productType === 'RENT',
      insurancePerMonth: 60000, 
      taxPerMonth: 40000, 
    });
  }, [productType, selectedCar, termMonths, prepayRatio]);

  return (
    <div className={styles.calculator}>
      <h2 className={styles.title}>실시간 견적 산출</h2>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${productType === 'RENT' ? styles.activeTab : ''}`}
          onClick={() => setProductType('RENT')}
        >
          장기 렌트
        </button>
        <button 
          className={`${styles.tab} ${productType === 'LEASE' ? styles.activeTab : ''}`}
          onClick={() => setProductType('LEASE')}
        >
          오토 리스
        </button>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>차종 선택</label>
        <select 
          className={styles.select}
          value={selectedCarId}
          onChange={(e) => setSelectedCarId(Number(e.target.value))}
        >
          {CAR_OPTIONS.map(car => (
            <option key={car.id} value={car.id}>{car.name} ({(car.price / 10000).toLocaleString()}만원)</option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>이용 기간 ({termMonths}개월)</label>
        <div className={styles.buttonGroup}>
          {[36, 48, 60].map(months => (
            <button 
              key={months}
              className={`${styles.optionBtn} ${termMonths === months ? styles.activeOption : ''}`}
              onClick={() => setTermMonths(months)}
            >
              {months}개월
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>선납금 ({Math.round(prepayRatio * 100)}%)</label>
        <input 
          type="range" 
          min="0" 
          max="0.5" 
          step="0.1" 
          value={prepayRatio}
          onChange={(e) => setPrepayRatio(Number(e.target.value))}
          className={styles.range}
        />
      </div>

      <div className={styles.resultBox}>
        <p className={styles.resultLabel}>예상 월 납입금</p>
        <p className={styles.resultValue}>
          월 {monthlyPayment.toLocaleString()}<span>원</span>
        </p>
        <p className={styles.resultNotice}>
          * 위 금액은 예시 견적이며 실제 심사 결과에 따라 달라질 수 있습니다.
        </p>
      </div>

      <button className={styles.submitBtn}>
        비교 견적 신청하기
      </button>
    </div>
  );
}
