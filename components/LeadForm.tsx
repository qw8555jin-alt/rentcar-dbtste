"use client";

import styles from './LeadForm.module.css';
import { useEffect } from 'react';

export default function LeadForm({ title = "실시간 최적가 견적 신청" }: { title?: string }) {
  useEffect(() => {
    let isMounted = true;

    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const init = async () => {
      try {
        await loadScript("https://www.replyalba.com/js/jquery-1.11.0.min.js");
        await loadScript("https://www.replyalba.com/js/iframeResizer.min.js");

        if (!isMounted) return;

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
            minHeight: 800,
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
      } catch (err) {
        console.error("Failed to load iframe resizer scripts", err);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.formWrapper} style={{ padding: 0, overflow: 'hidden', minHeight: '800px' }}>
      <h2 className={styles.title} style={{ padding: '24px 24px 0' }}>{title}</h2>
      
      <iframe 
        name="ifrm_icode" 
        id="ifrCCAl" 
        scrolling="auto" 
        frameBorder="0" 
        width="100%" 
        style={{ height: '800px', width: '100%', border: 'none' }}
        src="https://www.replyalba.com/intros/_frm/index.php?code=vYKofXARqq"
      />
    </div>
  );
}
