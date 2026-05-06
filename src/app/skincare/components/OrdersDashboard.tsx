'use client';
import React, { useState } from 'react';
import { Order } from '../page';

interface Props {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const STATUS_CONFIG: Record<Order['status'], { label: string; className: string; next: Order['status'] }> = {
  pending: { label: 'قيد الانتظار', className: 'status-pending', next: 'processing' },
  processing: { label: 'قيد التجهيز', className: 'status-processing', next: 'shipped' },
  shipped: { label: 'تم الشحن', className: 'status-shipped', next: 'delivered' },
  delivered: { label: 'تم التسليم', className: 'status-delivered', next: 'delivered' },
};

const OrdersDashboard: React.FC<Props> = ({ orders, onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | Order['status']>('all');

  const filtered = filterStatus === 'all' ? orders : orders.filter((o) => o.status === filterStatus);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    revenue: orders.reduce((s, o) => s + o.total, 0),
  };

  return (
    <section
      id="orders"
      className="py-8 relative"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg) 0%, #FFF0F8 50%, var(--color-bg) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal flex justify-center mb-4">
            <div className="section-label">
              <span>📋</span>
              <span>لوحة الإدارة</span>
            </div>
          </div>
          <h2
            className="reveal delay-1 font-cairo font-black mb-3"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: 'var(--color-foreground)',
            }}
          >
            إدارة{' '}
            <span className="gradient-text">الطلبات</span>
          </h2>
          <p
            className="reveal delay-2 font-cairo text-sm"
            style={{ color: 'var(--color-muted)' }}
          >
            تتبّعي وإدارة جميع طلبات العملاء من مكان واحد
          </p>
        </div>

        {/* Stats cards */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'إجمالي الطلبات', value: stats.total, icon: '📦', color: '#C9708A' },
            { label: 'قيد الانتظار', value: stats.pending, icon: '⏳', color: '#F59E0B' },
            { label: 'قيد التجهيز', value: stats.processing, icon: '⚙️', color: '#3B82F6' },
            { label: 'إجمالي الإيرادات', value: `${stats.revenue} ر.س`, icon: '💰', color: '#9B72AA' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`glass-card rounded-3xl p-5 reveal delay-${i + 1}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <p
                className="font-cairo font-black text-xl mb-1"
                style={{ color: s.color }}
              >
                {s.value}
              </p>
              <p
                className="font-cairo text-xs"
                style={{ color: 'var(--color-muted)' }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="reveal flex flex-wrap gap-2 mb-6">
          {(['all', 'pending', 'processing', 'shipped', 'delivered'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="font-cairo text-sm px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: filterStatus === s
                  ? 'linear-gradient(135deg, #C9708A, #9B72AA)'
                  : 'rgba(201, 112, 138, 0.08)',
                color: filterStatus === s ? 'white' : 'var(--color-muted)',
                border: filterStatus === s ? 'none' : '1.5px solid rgba(201, 112, 138, 0.2)',
                fontWeight: 600,
              }}
            >
              {s === 'all' ? 'الكل' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="reveal glass-card-dark rounded-4xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>اسم العميلة</th>
                  <th className="hidden md:table-cell">المنتجات</th>
                  <th>المجموع</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 font-cairo" style={{ color: 'var(--color-muted)' }}>
                      لا توجد طلبات
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="font-cairo font-bold text-sm gradient-text">
                          {order.id}
                        </span>
                      </td>
                      <td>
                        <span className="font-cairo font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>
                          {order.customer}
                        </span>
                      </td>
                      <td className="hidden md:table-cell">
                        <span className="font-cairo text-xs" style={{ color: 'var(--color-muted)', maxWidth: '200px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {order.products}
                        </span>
                      </td>
                      <td>
                        <span className="font-cairo font-bold text-sm" style={{ color: 'var(--color-foreground)' }}>
                          {order.total} ر.س
                        </span>
                      </td>
                      <td>
                        <button
                          className={`status-badge ${STATUS_CONFIG[order.status].className}`}
                          onClick={() => {
                            if (order.status !== 'delivered') {
                              onUpdateStatus(order.id, STATUS_CONFIG[order.status].next);
                            }
                          }}
                          title={order.status !== 'delivered' ? 'اضغطي للتقدم للحالة التالية' : ''}
                          disabled={order.status === 'delivered'}
                          style={{ cursor: order.status === 'delivered' ? 'default' : 'pointer' }}
                        >
                          {STATUS_CONFIG[order.status].label}
                          {order.status !== 'delivered' && (
                            <span className="mr-1 text-xs opacity-60">←</span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <p
          className="font-cairo text-xs text-center mt-4"
          style={{ color: 'var(--color-muted)' }}
        >
          اضغطي على حالة الطلب لتحديثها إلى المرحلة التالية
        </p>
      </div>
    </section>
  );
};

export default OrdersDashboard;