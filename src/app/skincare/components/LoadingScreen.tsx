'use client';
import { base_url } from '@/Backend/api';
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(`${base_url}/api/Images`);
        const data = await res.json();
  
        console.log("LOGO DATA:", data);
  
        if (data.isSuccess && data.data?.length > 0) {
          console.log("IMAGE URL:", data.data[0]?.imageUrl);
          setLogo(data.data[0]?.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };
  
    fetchLogo();
  }, []);


  return (
    <div className="loading-screen">
      {/* Blobs */}
      <div className="blob blob-1" style={{ opacity: 0.2 }} />
      <div className="blob blob-2" style={{ opacity: 0.2 }} />

      <div className="flex flex-col items-center gap-5 relative z-10">
        {/* Animated logo mark */}
        {/* <div
  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: `url(${logo || '/assets/images/mylogo.jpeg'})`,
    animation: 'pulseGlow 2s ease-in-out infinite',
  }}
> */}
          {/* <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg> */}
        {/* </div> */}

        <div className="text-center">
          <h2 className="text-xl font-bold gradient-text font-cairo">Glow Secret</h2>
          <p className="text-sm mt-1 font-cairo" style={{ color: 'var(--color-muted)' }}>
            جاري تحميل تجربتك الجمالية...
          </p>
        </div>

        {/* Spinner */}
        <div
          className="w-8 h-8 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: 'var(--color-primary)',
            borderRightColor: 'var(--color-accent)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;