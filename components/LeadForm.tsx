'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function LeadForm() {
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
          heightCalculationMethod: "lowestElement",
          interval: 32,
          log: false,
          maxHeight: Infinity,
          maxWidth: Infinity,
          minHeight: 600,
          minWidth: 0,
          scrolling: false,
          sizeHeight: true,
          sizeWidth: false,
          tolerance: 0,
          closedCallback: function () { },
          initCallback: function () { },
          messageCallback: function (messageData: any) {
            // iframe-resizer 자체 메시지 콜백 (혹시 완료 메시지가 여기로 올 경우)
            console.log("[Iframe Message]", messageData);
            triggerGoogleConversion();
          },
          resizedCallback: function () { },
          callback: function () { return true; }
        });
      }
    };
    
    // 시도
    setTimeout(initIframe, 500);
    
    // @ts-ignore
    window.initIframeResize = initIframe;

    // 외부 메시지 감지 우회 스크립트 (ReplyAlba 폼 제출 완료 신호 감지용)
    const handleMessage = (event: MessageEvent) => {
      // iFrameSizer 자체 리사이징 메시지는 무시
      if (typeof event.data === 'string' && event.data.includes('[iFrameSizer]')) return;
      
      console.log("외부 아이프레임 통신 감지:", event.data);
      triggerGoogleConversion();
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const triggerGoogleConversion = () => {
    // 이미 실행되었는지 방지하기 위한 간단한 세션 플래그
    if (sessionStorage.getItem('conversion_triggered')) return;
    
    // @ts-ignore
    if (typeof window !== "undefined" && window.gtag) {
      // @ts-ignore
      window.gtag('event', 'conversion', {
          'send_to': 'AW-17910158234/81dVCMnwkcAcEJqnndxC'
      });
      console.log("구글 전환 태그(AW-17910158234/81dVCMnwkcAcEJqnndxC) 실행 완료!");
      sessionStorage.setItem('conversion_triggered', 'true');
    }
  };

  return (
    <div className="w-full" id="lead-form" style={{ padding: 0, minHeight: '600px' }}>
      <iframe 
        name="ifrm_icode" 
        id="ifrCCAl" 
        scrolling="yes" 
        frameBorder="0" 
        width="100%" 
        style={{ minHeight: '600px' }}
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
