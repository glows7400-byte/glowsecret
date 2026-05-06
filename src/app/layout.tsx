import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { CartProvider } from '@/context/CartContext';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
title: 'SkincareBrand — جمالك الطبيعي يبدأ هنا',
  description: 'اكتشفي منتجات العناية بالبشرة الفاخرة المصممة خصيصاً لك. تسوقي الآن واحصلي على بشرة مشرقة وصحية.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.png', type: 'image/x-icon' }
    ],
  },

  openGraph: {
    title: 'SkincareBrand — جمالك الطبيعي يبدأ هنا',
    description: 'اكتشفي منتجات العناية بالبشرة الفاخرة المصممة خصيصاً لك.',
    images: [
      {
        url: 'https://skin-care-5ibj.vercel.app/assets/images/app_logo.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta property="og:title" content="SkincareBrand — جمالك الطبيعي يبدأ هنا" />
    <meta property="og:description" content="اكتشفي منتجات العناية بالبشرة الفاخرة المصممة خصيصاً لك." />
    <meta property="og:image" content="https://skin-care-5ibj.vercel.app/assets/images/app_logo.png" />
    <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1568993090864222');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1568993090864222&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <meta name="facebook-domain-verification" content="brm9m685zlujvxsfa0p7sh0g14j4zu" />


        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
    !function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer = function(t,e){
        t[e] = function () {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
        }
      };
      for (var i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      ttq.instance = function(t){
        var e = ttq._i[t] || [];
        for (var n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n]);
        }
        return e;
      };
      ttq.load = function(e,n){
        var r = "https://analytics.tiktok.com/i18n/pixel/events.js";
        var o = n && n.partner;
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date;
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        n = document.createElement("script");
        n.type = "text/javascript";
        n.async = true;
        n.src = r + "?sdkid=" + e + "&lib=" + t;
        e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(n, e);
      };

      ttq.load('D762IOJC77U061RDGBA0');
      ttq.page();
    }(window, document, 'ttq');
  `}
        </Script>

      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}