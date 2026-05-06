import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-10 mt-0 font-cairo"
      style={{ borderTop: '1px solid rgba(201, 112, 138, 0.15)' }}
    >
      <div className="max-w-6xl mx-auto px-5 flex flex-col items-center gap-4">
        {/* Social icons */}
        {/* <div className="flex items-center gap-4">
          {[
            {
              label: 'Instagram',
              href: '#',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              ),
            },
            {
              label: 'Twitter',
              href: '#',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              ),
            },
            {
              label: 'TikTok',
              href: '#',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(201, 112, 138, 0.08)',
                border: '1.5px solid rgba(201, 112, 138, 0.2)',
                color: 'var(--color-primary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #C9708A, #9B72AA)';
                (e.currentTarget as HTMLElement).style.color = 'white';
                (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(201, 112, 138, 0.08)';
                (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201, 112, 138, 0.2)';
              }}
            >
              {s.icon}
            </a>
          ))}
        </div> */}
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          © 2026 Glow Secret — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;