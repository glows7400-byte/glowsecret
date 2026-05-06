'use client';
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40"
      style={{
        background: 'linear-gradient(135deg, #FDF4F7 0%, #F5EEFF 30%, #EEE0FA 60%, #FDF4F7 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
      }}
    >
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Decorative circles */}
      <div
        className="absolute top-20 left-1/4 w-64 h-64 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #C9708A 0%, transparent 70%)',
          animation: 'blobFloat 10s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        {/* Badge */}
        {/* <div className="reveal flex justify-center mb-6">
          <div className="section-label">
            <span>✨</span>
            <span>العناية الفاخرة بالبشرة</span>
          </div>
        </div> */}

        {/* Main headline */}
        <h1
          className="reveal delay-1 font-cairo font-black leading-tight mb-6"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}
        >
          <span className="gradient-text">جمالكِ الطبيعي</span>
          <br />
          <span style={{ color: 'var(--color-foreground)' }}>يبدأ هنا</span>
        </h1>

        {/* Subheadline */}
        <p
          className="reveal delay-2 font-cairo text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          اكتشفي روتين العناية بالبشرة المثالي المصمّم خصيصاً لكِ، بمكوّنات طبيعية فاخرة تُشرق بشرتكِ من الداخل
        </p>

        {/* CTAs */}
        <div className="reveal delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#products">
            <button className="btn-primary">
              <span>تسوقي الآن</span>
            </button>
          </a>
          
        </div>

        {/* Stats */}
        <div
          className="reveal delay-4 glass-card rounded-3xl p-6 mt-16 max-w-2xl mx-auto"
          style={{ animation: 'floatCard 5s ease-in-out infinite' }}
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '+٥٠٠٠', label: 'عميلة سعيدة' },
              { value: '١٠٠٪', label: 'مكوّنات طبيعية' },
              { value: '٤.٩★', label: 'تقييم المنتجات' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-cairo font-black text-2xl md:text-3xl gradient-text"
                >
                  {stat.value}
                </p>
                <p
                  className="font-cairo text-xs mt-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="reveal delay-5 flex flex-col items-center mt-12 gap-2">
          <p className="text-xs font-cairo" style={{ color: 'var(--color-muted)' }}>مرّري للأسفل</p>
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
            style={{ borderColor: 'rgba(201, 112, 138, 0.4)' }}
          >
            <div
              className="w-1.5 h-3 rounded-full"
              style={{
                background: 'var(--color-primary)',
                animation: 'floatCard 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;