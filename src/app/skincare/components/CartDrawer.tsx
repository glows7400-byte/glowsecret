'use client';
import React, { useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import { CartItem } from '../page';
import { useRouter } from 'next/navigation';

interface Props {

  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}


const CartDrawer: React.FC<Props> = ({
  isOpen,
  items,
  total,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
}) => {


   useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);
  
  return (
    <aside
      className={`cart-drawer ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-label="سلة التسوق"
      aria-modal="true"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-5"
        style={{ borderBottom: '1px solid rgba(201, 112, 138, 0.15)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9708A, #9B72AA)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div>
            <h2 className="font-cairo font-bold text-base" style={{ color: 'var(--color-foreground)' }}>
              سلة التسوق
            </h2>
            <p className="font-cairo text-xs" style={{ color: 'var(--color-muted)' }}>
              {items.length === 0 ? 'السلة فارغة' : `${items.reduce((s, i) => s + i.quantity, 0)} منتج`}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: 'rgba(201, 112, 138, 0.1)',
            color: 'var(--color-primary)',
          }}
          aria-label="إغلاق السلة"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4" style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201, 112, 138, 0.08)' }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <p className="font-cairo font-semibold text-sm" style={{ color: 'var(--color-muted)' }}>
              لا يوجد منتجات في السلة
            </p>
            <button
              onClick={onClose}
              className="btn-primary text-sm"
              style={{ padding: '10px 24px' }}
            >
              <span>تصفّحي المنتجات</span>
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-3 flex gap-3"
              style={{ animation: 'slideUp 0.3s ease forwards' }}
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <AppImage
                  src={item.image}
                  alt={`صورة ${item.name} في السلة`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4
                  className="font-cairo font-bold text-sm leading-tight mb-1 truncate"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {item.name}
                </h4>
                <p className="font-cairo text-xs gradient-text font-bold">
                  {item.price} جنيه
                </p>

                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, -1)}
                    aria-label={`تقليل كمية ${item.name}`}
                  >
                    −
                  </button>
                  <span
                    className="font-cairo font-bold text-sm w-6 text-center"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    className="qty-btn"
                    onClick={() => onUpdateQty(item.id, 1)}
                    aria-label={`زيادة كمية ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => onRemove(item.id)}
                className="flex-shrink-0 self-start mt-1 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}
                aria-label={`حذف ${item.name} من السلة`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div
          className="p-5"
          style={{ borderTop: '1px solid rgba(201, 112, 138, 0.15)' }}
        >
          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-cairo font-semibold text-sm" style={{ color: 'var(--color-muted)' }}>
              المجموع الكلي
            </span>
            <span className="font-cairo font-black text-xl gradient-text">
              {total} جنيه
            </span>
          </div>

          {/* Checkout button */}
          <button
            onClick={onCheckout}
            className="w-full btn-primary text-base"
            style={{ padding: '14px', textAlign: 'center' }}
          >
            <span>إتمام الطلب</span>
          </button>

          
        </div>
      )}
    </aside>
  );
};

export default CartDrawer;