"use client";

import { useState } from 'react';
import styles from './LeadForm.module.css';

export default function LeadForm({ title = "실시간 최적가 견적 신청" }: { title?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    car: '',
    method: '장기렌트',
    time: '즉시'
  });
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert(`[접수 완료]\n${formData.name}님, 성공적으로 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다!`);
        setFormData({ name: '', phone: '', car: '', method: '장기렌트', time: '즉시' }); // 폼 초기화
      } else {
        alert('접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (err) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>이름</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="예: 홍길동"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>전화번호</label>
          <input 
            type="tel" 
            className={styles.input} 
            placeholder="예: 010-1234-5678"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>희망 차종</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="예: 제네시스 G80"
            value={formData.car}
            onChange={e => setFormData({...formData, car: e.target.value})}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>희망 견적 방법</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name={`method-${title}`}
                value="장기렌트" 
                className={styles.radioInput}
                checked={formData.method === '장기렌트'}
                onChange={e => setFormData({...formData, method: e.target.value})}
              />
              장기렌트
            </label>
            <label className={styles.radioLabel}>
              <input 
                type="radio" 
                name={`method-${title}`}
                value="리스" 
                className={styles.radioInput}
                checked={formData.method === '리스'}
                onChange={e => setFormData({...formData, method: e.target.value})}
              />
              리스
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>희망 상담 시간</label>
          <select 
            className={styles.select}
            value={formData.time}
            onChange={e => setFormData({...formData, time: e.target.value})}
          >
            <option value="즉시">즉시</option>
            <option value="오전10~12시">오전 10시 ~ 12시</option>
            <option value="1시~3시">오후 1시 ~ 3시</option>
            <option value="3시~5시">오후 3시 ~ 5시</option>
          </select>
        </div>

        <div style={{ margin: '20px 0', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
              [필수] 개인정보 수집 및 이용 동의
            </label>
            <button 
              type="button" 
              onClick={() => setShowPrivacy(!showPrivacy)}
              style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPrivacy ? '닫기' : '자세히 보기'}
            </button>
          </div>
          
          {showPrivacy && (
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6', padding: '12px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
              <strong>수집 항목:</strong> 이름, 연락처, 희망 차종, 견적 방법, 상담 시간<br/>
              <strong>수집 목적:</strong> 차량 견적 산출 및 맞춤형 상담 서비스 제공<br/>
              <strong>보유 기간:</strong> 서비스 목적 달성 완료 후 6개월간 보관 후 파기 (단, 관계 법령에 의거 보존할 필요가 있는 경우 해당 기간 동안 보관)
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          무료 견적 신청하기
        </button>
      </form>
    </div>
  );
}
