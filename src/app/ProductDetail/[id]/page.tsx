'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams, useRouter } from 'next/navigation';
import Toast from '../../skincare/components/Toast';
import { base_url } from '@/Backend/api';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/app/skincare/components/CartDrawer';
import Head from "next/head";

const 
  import ProductClient from './ProductClient';
import { base_url } from '@/Backend/api';

const ProductDetailPage = async ({ params }) => {
  const res = await fetch(${base_url}/api/Products/${params.id}, {
    cache: "no-store",
  });

  const data = await res.json();
  const product = data.data || data;

  return <ProductClient product={product} />;
};

export default ProductDetailPage;
  

  const { addToCart, cartItems, updateQty, removeFromCart, cartCount,cartTotal } = useCart();


 
      try {
        const res = await fetch(`${base_url}/api/Products/${id}`);
        const data = await res.json();

        if (data.isSuccess) {

          const p = data.data;

          setProduct({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.discountPrice ?? p.price,
            oldPrice: p.price ? p.price : null,
            image: p.imageUrl,
            badge: p.tagName
          });

        }

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) fetchProduct();

  }, [id]);

  const [added, setAdded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAdd = () => {
  if (!product) return;

  addToCart({ ...product, quantity: 1 }); 
  setAdded(true);
  setTimeout(() => setAdded(false), 1500);
  showToast(`تمت إضافة "${product.name}" للسلة ✨`);
};

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };
   const handleCheckout = () => {
    setTimeout(() => {
      router.push('/Checkout');
    }, 300);
  };

  useEffect(() => {
  if (!product) return;

  // Facebook
if (typeof window !== "undefined" && window.fbq) {
  window.fbq('track', 'ViewContent', {
  content_ids: [product.id.toString()],
  content_type: "product",
  value: Number(product.discountPrice ?? product.price) || 0,
  currency: "EGP"
});
    

  // TikTok
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track('ViewContent', {
      content_id: product.id,
      content_type: 'product',
      value: product.price,
      currency: 'EGP'
    });
  }

}, [product]);

  if (!product) {
  return <div className="pt-40 text-center">Loading...</div>;
}



  return (
        <Head>
      <title>{product?.name}</title>

      <meta property="og:title" content={product?.name} />
      <meta property="og:description" content={product?.description} />
      <meta property="og:image" content={product?.image} />
<meta property="og:title" content={product?.name || "Product"} />

<meta
  property="og:description"
  content={product?.description || "Best skincare product"}
/>

<meta
  property="og:image"
  content={product?.image || "https://skin-care-5ibj.vercel.app/default.jpg"}
/>
    </Head>
    <div className="min-h-screen font-cairo bg-gradient-to-br from-[#fdf4f7] to-[#f6eef8]">
       <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-36">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* صورة المنتج */}
          <div className="relative">
            {product.badge && (
              <span className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {product.badge}
              </span>
            )}
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          {/* التفاصيل */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-[var(--color-primary)]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-extrabold text-[var(--color-primary)]">
                {product.price} جنيه
              </span>
              <span className="line-through text-gray-400">
                {product.oldPrice} جنيه
              </span>
               <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-pink-100 text-sm font-semibold text-[var(--color-primary)]">
  <img src='/assets/images/badge.png' className='h-5 w-5'/>
  <span>وفر 13%</span>
</div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={handleAdd}
              className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg hover:scale-[1.02] transition"
            >
              إضافة للسلة
            </button>
          </div>
        </div>
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

     

      <Footer />
      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  );
};

export default ProductDetailPage;