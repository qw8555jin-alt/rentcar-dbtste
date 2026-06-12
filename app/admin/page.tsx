"use client";

import { useEffect, useState } from 'react';

type Lead = {
  id: string;
  name: string;
  phone: string;
  car: string;
  method: string;
  time: string;
  createdAt: string;
  isContacted?: boolean;
  missedCalls?: number;
};

function formatPhoneNumber(phone: string) {
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `${cleaned.slice(0,3)}-${cleaned.slice(3,7)}-${cleaned.slice(7,11)}`;
  } else if (cleaned.length === 10) {
    return `${cleaned.slice(0,3)}-${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
  }
  return phone; // 기타 길이의 번호는 원본 유지
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showUncontactedOnly, setShowUncontactedOnly] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.leads) setLeads(data.leads);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredLeads = leads.filter(lead => {
    // 1. 기간 필터 (KST 기준으로 변환 후 문자열 대소 비교)
    const leadDate = new Date(lead.createdAt).toLocaleDateString('en-CA'); // 'YYYY-MM-DD' 형식 반환
    
    if (startDate && leadDate < startDate) return false;
    if (endDate && leadDate > endDate) return false;
    
    // 2. 미연락 필터
    if (showUncontactedOnly) {
      if (lead.isContacted) return false;
    }
    return true;
  });

  const handleUpdate = async (id: string, updates: Partial<Lead>) => {
    // UI 즉각 반영 (Optimistic Update)
    setLeads(leads.map(l => l.id === id ? { ...l, ...updates } : l));
    
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
    } catch (err) {
      console.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 접수 내역을 삭제하시겠습니까?')) return;
    
    // UI 즉각 반영
    setLeads(leads.filter(l => l.id !== id));
    
    try {
      await fetch(`/api/leads?id=${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Delete failed');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc', fontFamily: 'var(--font-pretendard)' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '24px', fontWeight: 800 }}>🔒 관리자 로그인</h2>
          <input 
            type="password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (passwordInput === 'admin1234') setIsAuthenticated(true);
                else alert('비밀번호가 일치하지 않습니다.');
              }
            }}
            placeholder="비밀번호를 입력하세요"
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
          />
          <button 
            onClick={() => {
              if (passwordInput === 'admin1234') setIsAuthenticated(true);
              else alert('비밀번호가 일치하지 않습니다.');
            }}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}
          >
            접속하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--font-pretendard)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 800, margin: 0 }}>
          📊 관리자 - DB 접수 현황
        </h1>
        <div style={{ background: '#e0e7ff', color: '#4338ca', padding: '8px 16px', borderRadius: '20px', fontWeight: 700 }}>
          조회된 결과: {filteredLeads.length}건
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', background: 'white', padding: '16px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontWeight: 700, color: '#475569', fontSize: '0.95rem', marginRight: '4px' }}>조회 기간</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#0f172a', outline: 'none', fontFamily: 'inherit' }}
          />
          <span style={{ color: '#94a3b8', fontWeight: 600 }}>~</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#0f172a', outline: 'none', fontFamily: 'inherit' }}
          />
          {(startDate || endDate) && (
            <button onClick={() => { setStartDate(''); setEndDate(''); }} style={{ fontSize: '0.85rem', color: '#ef4444', textDecoration: 'underline', fontWeight: 600, marginLeft: '8px' }}>
              기간 초기화
            </button>
          )}
        </div>
        
        <div style={{ width: '1px', background: '#e2e8f0' }}></div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, color: '#475569', fontSize: '0.95rem' }}>
          <input 
            type="checkbox" 
            checked={showUncontactedOnly}
            onChange={(e) => setShowUncontactedOnly(e.target.checked)}
            style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
          />
          미연락 고객만 보기
        </label>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>데이터를 불러오는 중입니다...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#ffffff', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569' }}>접수일시</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569' }}>이름</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569' }}>연락처</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569' }}>희망차종 / 방법</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569' }}>상담시간</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569', textAlign: 'center' }}>연락완료</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569', textAlign: 'center' }}>부재중(회)</th>
                <th style={{ padding: '16px', fontWeight: 600, color: '#475569', textAlign: 'center' }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    조건에 맞는 접수 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9', background: '#ffffff', opacity: lead.isContacted ? 0.6 : 1 }}>
                    <td style={{ padding: '16px', color: '#64748b', fontSize: '0.9rem' }}>
                      {new Date(lead.createdAt).toLocaleString('ko-KR')}
                    </td>
                    <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{lead.name}</td>
                    <td style={{ padding: '16px', color: '#334155' }}>{formatPhoneNumber(lead.phone)}</td>
                    <td style={{ padding: '16px', color: '#334155' }}>
                      {lead.car}
                      <span style={{ 
                        marginLeft: '8px',
                        background: lead.method === '장기렌트' ? '#dbeafe' : '#fce7f3', 
                        color: lead.method === '장기렌트' ? '#2563eb' : '#db2777',
                        padding: '2px 6px', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700 
                      }}>
                        {lead.method}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#475569', fontSize: '0.95rem' }}>{lead.time}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <input 
                        type="checkbox" 
                        checked={lead.isContacted || false} 
                        onChange={(e) => handleUpdate(lead.id, { isContacted: e.target.checked })}
                        style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: 'var(--primary)' }}
                      />
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <button 
                          onClick={() => handleUpdate(lead.id, { missedCalls: Math.max(0, (lead.missedCalls || 0) - 1) })}
                          style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: 700, color: '#64748b' }}
                        >-</button>
                        <span style={{ fontWeight: 700, width: '20px', textAlign: 'center', color: lead.missedCalls && lead.missedCalls > 0 ? '#ef4444' : '#475569' }}>
                          {lead.missedCalls || 0}
                        </span>
                        <button 
                          onClick={() => handleUpdate(lead.id, { missedCalls: (lead.missedCalls || 0) + 1 })}
                          style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', fontWeight: 700, color: '#64748b' }}
                        >+</button>
                      </div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #fecaca', background: '#fee2e2', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
