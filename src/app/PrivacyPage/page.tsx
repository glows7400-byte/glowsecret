'use client';
import Header from "@/components/Header";
import { motion } from "framer-motion";
import CartDrawer from "../skincare/components/CartDrawer";
import Toast from "../skincare/components/Toast";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number ;
  image: string;
  badge?: string;
}

export default function PrivacyPage() {
  const [cartOpen, setCartOpen] = useState(false);
        const [toastMsg, setToastMsg] = useState('');
        const [toastVisible, setToastVisible] = useState(false);
        const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
        const router = useRouter();
      
        const { cartItems, addToCart, removeFromCart, updateQty, cartCount, cartTotal } = useCart();
      
        const showToast = (msg: string) => {
          setToastMsg(msg);
          setToastVisible(true);
          if (toastTimeout.current) clearTimeout(toastTimeout.current);
          toastTimeout.current = setTimeout(() => setToastVisible(false), 2800);
        };
      
        const handleAddToCart = (product: Product) => {
          addToCart({ ...product, quantity: 1 });
          showToast(`تمت إضافة "${product.name}" إلى السلة ✨`);
        };
      
        const handleCheckout = () => {
          setTimeout(() => {
            router.push('/Checkout');
          }, 300);
        };
      
       
      
        useEffect(() => {
          document.body.style.overflow = cartOpen ? 'hidden' : '';
          return () => {
            document.body.style.overflow = '';
          };
        }, [cartOpen]);
  return (
    <>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <div
        className="min-h-screen py-24 px-6"
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg) 0%, #F5EEFF 50%, var(--color-bg) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-cairo font-black text-4xl md:text-5xl mb-6"
              style={{ color: "var(--color-foreground)" }}
            >
              سياسة الخصوصية

            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-cairo font-black text-4xl md:text-5xl mb-6"
              style={{ color: "var(--color-foreground)" }}
            >
              <p
                className="font-cairo text-base max-w-xl mx-auto leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                نحرص في Glow Secret على الشفافية الكاملة وبناء الثقة مع عملائنا
              </p>
            </motion.h1>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-card-dark rounded-4xl p-8 md:p-12 space-y-12"
          >

            {/* Section 1 */}
            <SectionTitle>أولاً: طرق الطلب والدفع</SectionTitle>
            <ul className="policy-list">
              <li>يتم تأكيد الطلب بعد التواصل مع العميل عبر الهاتف أو واتساب على الرقم المُسجل بالموقع.</li>
              <li>يتم دفع عربون (Deposit) بنسبة 20% من إجمالي قيمة المنتج لتأكيد الطلب.</li>
              <li>يتم تحويل مبلغ العربون عبر الوسيلة التي يتم الاتفاق عليها أثناء التواصل (تحويل بنكي / فودافون كاش / إنستاباي … إلخ).</li>
              <li>لا يتم بدء تجهيز أو شحن الطلب قبل استلام العربون.</li>
            </ul>

            {/* Section 2 */}
            <SectionTitle>ثانيًا: سياسة الاستبدال والاسترجاع</SectionTitle>
            <ul className="policy-list">
              <li>لا يوجد استبدال أو استرجاع بعد تأكيد الطلب ودفع العربون.</li>
              <li>يرجى التأكد من اختيار المنتج المناسب قبل إتمام الطلب.</li>
              <li>في حالة وجود عيب صناعي مثبت بالمنتج عند الاستلام، يرجى التواصل خلال 24 ساعة من تاريخ الاستلام مع إرفاق صور واضحة.</li>
            </ul>

            {/* Section 3 */}
            <SectionTitle>ثالثًا: المسؤولية</SectionTitle>
            <ul className="policy-list">
              <li>الموقع غير مسؤول عن أي معاملات مالية تتم خارج القنوات الرسمية المُعلنة بالموقع.</li>
              <li>نحن غير مسؤولين عن أي تواصل يتم من خلال أرقام أو حسابات غير مُدرجة رسميًا بالموقع.</li>
              <li>مسؤولية استخدام المنتج تقع على العميل، ويُفضل إجراء اختبار حساسية قبل الاستخدام.</li>
            </ul>

            {/* Section 4 */}
            <SectionTitle>رابعًا: حماية البيانات والخصوصية</SectionTitle>
            <ul className="policy-list">
              <li>نقوم بجمع البيانات الأساسية (الاسم – رقم الهاتف – العنوان) فقط بغرض إتمام الطلب.</li>
              <li>لا يتم مشاركة بيانات العملاء مع أي طرف ثالث.</li>
              <li>يتم استخدام البيانات فقط لأغراض التواصل وإتمام عمليات البيع.</li>
            </ul>

          </motion.div>
        </div>

        {/* Styles */}
        <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #C9708A, #9B72AA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .policy-list {
          list-style: none;
          padding: 0;
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: Cairo;
          color: var(--color-muted);
          line-height: 1.8;
        }

        .policy-list li {
          position: relative;
          padding-right: 22px;
        }

        .policy-list li::before {
          content: "•";
          position: absolute;
          right: 0;
          color: #C9708A;
          font-size: 18px;
        }
      `}</style>
      </div>
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <div
        className={`cart-overlay ${cartOpen ? 'open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-cairo font-bold text-xl md:text-2xl mb-4"
      style={{
        color: "var(--color-foreground)",
      }}
    >
      {children}
    </h2>
  );
}