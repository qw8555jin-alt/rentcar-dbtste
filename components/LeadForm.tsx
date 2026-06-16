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
