"use client";

import styles from './LeadForm.module.css';
import { useEffect, useId } from 'react';

export default function LeadForm({ title = "실시간 최적가 견적 신청" }: { title?: string }) {
  const rawId = useId().replace(/:/g, '');
  const iframeId = `ifr_${rawId}`;

  useEffect(() => {
    let isMounted = true;

    // 여러 폼이 렌더링될 때 스크립트가 중복 로드되지 않도록 고유 ID 부여
    if (!document.getElementById('replyalba-jquery')) {
      const script = document.createElement('script');
      script.id = 'replyalba-jquery';
      script.src = "https://www.replyalba.com/js/jquery-1.11.0.min.js";
      document.head.appendChild(script);
    }
    
    if (!document.getElementById('replyalba-resizer')) {
      const script = document.createElement('script');
      script.id = 'replyalba-resizer';
      script.src = "https://www.replyalba.com/js/iframeResizer.min.js";
      document.head.appendChild(script);
    }

    // 스크립트가 완전히 로드될 때까지 0.1초마다 확인 (레이스 컨디션 방지)
    const checkInterval = setInterval(() => {
      // @ts-ignore
      if (window.$ && window.$(`#${iframeId}`).length && window.$(`#${iframeId}`).iFrameResize) {
        clearInterval(checkInterval);
        if (!isMounted) return;
        
        try {
          // @ts-ignore
          window.$(`#${iframeId}`).iFrameResize({
            autoResize: true,
            checkOrigin: false,
            scrolling: false,
            sizeHeight: true,
            sizeWidth: false
          });
        } catch (e) {
          console.error("Iframe resize init error:", e);
        }
      }
    }, 100);

    // 10초 후에도 로드가 안 되면 인터벌 종료 (무한 반복 방지)
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      isMounted = false;
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [iframeId]);

  return (
    <div className={styles.formWrapper} style={{ padding: 0, overflow: 'hidden' }}>
      <h2 className={styles.title} style={{ padding: '24px 24px 0' }}>{title}</h2>
      
      <iframe 
        name={iframeId} 
        id={iframeId} 
        scrolling="no" 
        frameBorder="0" 
        width="100%" 
        style={{ width: '100%', border: 'none', minHeight: '600px' }}
        src="https://www.replyalba.com/intros/_frm/index.php?code=vYKofXARqq"
      />
    </div>
  );
}
