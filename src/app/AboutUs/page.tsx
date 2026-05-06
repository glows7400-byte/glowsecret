'use client';
import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { base_url } from '@/Backend/api';
import { useRouter } from 'next/navigation';
import Toast from '../skincare/components/Toast';
import CartDrawer from '../skincare/components/CartDrawer';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number ;
  image: string;
  badge?: string;
}

export default function AboutPage() {
    const [cartOpen, setCartOpen] = useState(false);
      const [toastMsg, setToastMsg] = useState('');
      const [toastVisible, setToastVisible] = useState(false);
      const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
      const router = useRouter();
      const [logo, setLogo] = useState<string | null>(null);
    
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
  const fetchLogo = async () => {
    try {
      const res = await fetch(`${base_url}/api/Images`);
      const data = await res.json();

      if (data.isSuccess && data.data?.length > 0) {
        setLogo(data.data[0]?.imageUrl);
      }
    } catch (err) {
      console.error("Error fetching logo:", err);
    }
  };

  fetchLogo();
}, []);
    
     
    
      useEffect(() => {
        document.body.style.overflow = cartOpen ? 'hidden' : '';
        return () => {
          document.body.style.overflow = '';
        };
      }, [cartOpen]);

    // Scroll Reveal Animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="min-h-screen font-cairo bg-gradient-to-br from-[#fdf4f7] to-[#f6eef8]"
            style={{ direction: 'rtl' }}
        >
            <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

            <main className="pt-28 pb-20 px-4 md:px-8">

                {/* Hero Section */}
                <section className="text-center max-w-3xl mx-auto mb-20 reveal opacity-0 translate-y-10 transition-all duration-1000">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-6">
                        من نحن
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        Soft.... Elegant... Unforgettable Glow <br />
                        روتين كوري فاخر
                        يبرز أنوثتك … بهدوء وثقة
                    </p>
                </section>

                {/* Story Section */}
                <section className="max-w-6xl  mx-auto grid md:grid-cols-2 gap-12 items-center mb-24">

                    <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
                       
                        <a href="/skincare">
          {logo ? (
            <img
              src={logo}
              alt="logo"
              className="rounded-3xl shadow-xl object-cover  "
            />
          ) : (
            <span className="font-bold text-lg">Glow Secret</span>
          )}
        </a>
                    </div>

                    <div className="space-y-6 reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                            قصتنا
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            في Glow Secrett إحنا مش مجرد متجر سكين كير…
                            إحنا مساحة لكل بنت عايزة تفهم بشرتها وتديها العناية اللي تستحقها.
                            <br />

                            بدأنا بفكرة بسيطة: إن الإشراقة الحقيقية بتيجي من اختيار صح.
                            علشان كده بنركز على توفير منتجات Korean Skin Care أصلية، مختارة بعناية، مبنية على الجودة والفعالية مش الترند بس.
                            <br />
                            ليه تختار Glow Secrett؟
                            <br />•	اختيار مدروس لكل منتج قبل ما يوصل لك
                            <br />•	اهتمام بالتفاصيل وجودة حقيقية
                            <br />•	شفافية في التعامل وسياسة واضحة
                            <br />•	تجربة شراء بسيطة وآمنة
                            <br />
                            إحنا بنؤمن إن العناية بالبشرة مش رفاهية… دي استثمار في نفسك.
                            Glow Secrett… لأن بشرتك تستحق الأفضل
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 bg-gradient-to-br 
from-pink-50 
via-white 
to-purple-50 
border border-white/40
backdrop-blur-xl shadow-md text-center">
                                <h3 className="text-xl font-bold text-[var(--color-primary)]">+5000</h3>
                                <p className="text-sm text-gray-500">عميل سعيد</p>
                            </div>

                            <div className="bg-white/70 backdrop-blur-xl bg-gradient-to-br 
from-pink-50 
via-white 
to-purple-50 
border border-white/40
backdrop-blur-xl rounded-2xl p-5 shadow-md text-center">
                                <h3 className="text-xl font-bold text-[var(--color-primary)]">100%</h3>
                                <p className="text-sm text-gray-500">مكونات آمنة</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="max-w-6xl mx-auto text-center">

                    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-12 reveal opacity-0 translate-y-10 transition-all duration-1000">
                        قيمنا
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {[
                            { title: 'الجودة أولاً', text: 'نختار منتجاتنا بعناية فائقة لضمان أفضل النتائج.' },
                            { title: 'الشفافية', text: 'نؤمن بالوضوح الكامل في المكونات والمصادر.' },
                            { title: 'رضا العميل', text: 'هدفنا أن تكوني راضية وواثقة بكل منتج.' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="reveal opacity-0 translate-y-10 transition-all duration-1000 bg-white/70 bg-gradient-to-br 
from-pink-50 
via-white 
to-purple-50 
border border-white/40
backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-xl "
                            >
                                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>

            </main>
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

            <Footer />
        </div>
    );
}