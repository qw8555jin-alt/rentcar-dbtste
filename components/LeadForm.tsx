"use client";

import Script from 'next/script';
import styles from './LeadForm.module.css';
import { useEffect } from 'react';

export default function LeadForm({ title = "실시간 최적가 견적 신청" }: { title?: string }) {
  useEffect(() => {
    const initIframe = () => {
      // @ts-ignore
      if (window.$ && window.$("#ifrCCAl").length && window.$("#ifrCCAl").iFrameResize) {
        // @ts-ignore
        window.$("#ifrCCAl").iFrameResize({
          autoResize: true,
          bodyBackground: null,
          bodyMargin: null,
          bodyMarginV1: 0,
          bodyPadding: null,
          checkOrigin: true,
          enablePublicMethods: false,
          heightCalculationMethod: "offset",
          interval: 32,
          log: false,
          maxHeight: Infinity,
          maxWidth: Infinity,
          minHeight: 0,
          minWidth: 0,
          scrolling: false,
          sizeHeight: true,
          sizeWidth: false,
          tolerance: 0,
          closedCallback: function () { },
          initCallback: function () { },
          messageCallback: function () { },
          resizedCallback: function () { },
          callback: function () { return true; }
        });
      }
    };
    
    // 시도
    setTimeout(initIframe, 500);
    
    // @ts-ignore
    window.initIframeResize = initIframe;
  }, []);

  return (
    <div className={styles.formWrapper} style={{ padding: 0, overflow: 'hidden', minHeight: '500px' }}>
      <h2 className={styles.title} style={{ padding: '24px 24px 0' }}>{title}</h2>
      
      <iframe 
        name="ifrm_icode" 
        id="ifrCCAl" 
        scrolling="no" 
        frameBorder="0" 
        width="100%" 
        style={{ minHeight: '500px' }}
        src="https://www.replyalba.com/intros/_frm/index.php?code=vYKofXARqq"
      />
      
      <Script 
        src="https://www.replyalba.com/js/jquery-1.11.0.min.js" 
        strategy="lazyOnload" 
      />
      <Script 
        src="https://www.replyalba.com/js/iframeResizer.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-ignore
          if (window.initIframeResize) window.initIframeResize();
        }}
      />
    </div>
  );
}
