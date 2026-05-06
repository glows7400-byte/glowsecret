'use client';
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import CartDrawer from './components/CartDrawer';
import LoadingScreen from './components/LoadingScreen';
import Toast from './components/Toast';
import BrandStorySection from './components/BrandStorySection';
import { useRouter } from 'next/navigation';
import FloatingSocial from './components/FloatingSocial';
import { base_url } from '@/Backend/api';
import { v4 as uuidv4 } from 'uuid';
import { useCart } from '@/context/CartContext';
import EidBanner from '../EidBanner/page';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  products: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Centella Hyalu Cica',
    description: 'ترطيب عميق للبشرة الجافة أو العطشانة ويعطي امتلاء ونضارة ومناسب حتى للبشرة الحساسة',
    price: 1200,
    oldPrice: 1500,
    image: '/assets/images/s2.jpg',
    badge: 'الأكثر مبيعاً'
  },
  {
    id: 2,
    name: 'Centella Travel Kit',
    description: 'تنظيف عميق للبشره وتهدئه وترطيب ومعالجه الرؤوس السوداء ومناسب البشره الحساسه',
    price: 1200,
    oldPrice: 1500,
    image: '/assets/images/s3.jpg',
    badge: 'جديد'
  },
  {
    id: 3,
    name: 'Centella Poremizing',
    description: 'مخصص للمسام الواسعه  ويشد المسام ويوازن الدهون ويعطي مظهر ناعم للبشره مناسبه للبشره الدهنيه و المختلطه',
    price: 1200,
    oldPrice: 1500,
    image: '/assets/images/s4.jpg',
  },
  {
    id: 4,
    name: 'Centella Tea Trica',
    description: 'مخصص للبشره الدهنيه والمعرضه للحبوب ويخفف الحبوب والالتهاب وينظم الافرازات الدهنيه',
    price: 1200,
    oldPrice: 1500,
    image: '/assets/images/s5.PNG',
    badge: 'فاخر'
  },
  {
    id: 5,
    name: 'Centella EVEN TONE KIT',
    description: 'الحل المثالي لتوحيد لون البشرة ويخفف البقع والتصبغات ويهدئ البشرة الحساسة ويعطي إشراقة طبيعية',
    price: 1200,
    oldPrice: 1500,
    image: '/assets/images/s6.jpeg',
  }];


const INITIAL_ORDERS: Order[] = [
  { id: 'SKB-١٠٠١', customer: 'سارة المنصوري', products: 'سيروم الإشراق × ١، كريم الترطيب × ٢', total: 479, status: 'delivered' },
  { id: 'SKB-١٠٠٢', customer: 'نور الحربي', products: 'قناع العسل × ١، زيت الورد × ١', total: 345, status: 'shipped' },
  { id: 'SKB-١٠٠٣', customer: 'ريم العتيبي', products: 'غسول الكولاجين × ٣', total: 294, status: 'processing' },
  { id: 'SKB-١٠٠٤', customer: 'ليلى الشمري', products: 'سيروم الإشراق × ١', total: 189, status: 'pending' },
  { id: 'SKB-١٠٠٥', customer: 'هند القحطاني', products: 'كريم الترطيب × ١، قناع العسل × ٢', total: 385, status: 'processing' }];


export default function SkincarePage() {
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  

  const { cartItems, addToCart, removeFromCart, updateQty, cartCount, cartTotal } = useCart();
  
   useEffect(() => {
    let storedCartId = localStorage.getItem('cartId');

    if (!storedCartId) {
      storedCartId = uuidv4(); 
      localStorage.setItem('cartId', storedCartId);
    }

    setCartId(storedCartId);
    console.log("CART ID :", storedCartId);
  }, []);

  
  // useEffect(() => {
  //   if (!cartId) return; 

  //   const fetchCart = async () => {
  //     try {
  //       const res = await fetch(`${base_url}/api/Carts/?cartId=${cartId}`);
  //       const data = await res.json();
  //       if (data.isSuccess) {
  //         const mappedCart = data.data.items.map((item: any) => ({
  //         id: item.productId,
  //         name: item.name,
  //         image: `${base_url}/files/ProductsImages/${item.imageUrl}`,
  //         price: item.discountPrice ?? item.price,
  //         oldPrice: item.price ? item.price : null,
  //         quantity: item.quantity
  //       }));

  //       setCartItems(mappedCart);

  //       const count = mappedCart.reduce(
  //         (sum: number, i: any) => sum + i.quantity,
  //         0
  //       );

  //       setCartCount(count);

        
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchCart();
  // }, [cartId]);



  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${base_url}/api/Products?pageSize=1000`);
        const data = await res.json();

        if (data.isSuccess) {

          const mappedProducts = data.data.items.map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            image: p.imageUrl,
            price: p.discountPrice ?? p.price,
            oldPrice: p.discountPrice ? p.price : null,
            badge: p.tagName
          }));

          setProducts(mappedProducts);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

 

  // Loading screen
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .reveal-left');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Prevent body scroll when cart open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastVisible(false), 2800);
  };

//   const addToCart = async (product: Product) => {
//   setCartItems((prev) => {
//     const existing = prev.find((i) => i.id === product.id);
//     if (existing) {
//       return prev.map((i) =>
//         i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
//       );
//     }
//     return [...prev, { ...product, quantity: 1 }];
//   });

//   // ارسال للسيرفر
//   if (cartId) {
//     try {
//       await fetch(`${base_url}/api/Carts/?cartId=${cartId}&ProductId=${product.id}&Quantity=1`, {
//         method: 'POST'
//       });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//     }
//   }

//   showToast(`تمت إضافة "${product.name}" إلى السلة ✨`);
// };

//   const updateQty = async (productId: number, delta: number) => {

//   const item = cartItems.find(i => i.id === productId);
//   if (!item) return;

//   const newQty = item.quantity + delta;

//   if (newQty <= 0) {
//     removeFromCart(productId);
//     return;
//   }

//   try {
//     await fetch(
//       `${base_url}/api/Carts/${cartId}?ProductId=${productId}&Quantity=${newQty}`,
//       {
//         method: "PUT",
//       }
//     );

//     setCartItems((prev) =>
//       prev.map((i) =>
//         i.id === productId ? { ...i, quantity: newQty } : i
//       )
//     );

//     setCartCount((prev) => prev + delta);

//   } catch (error) {
//     console.error("Error updating cart:", error);
//   }
// };

 

  // const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  // const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);


  const router = useRouter();

  const handleCheckout = () => {
    setTimeout(() => {
      router.push('/Checkout');
    }, 300);
  };

  

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };



 

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="min-h-screen font-cairo" style={{ background: 'var(--color-bg)', direction: 'rtl' }}>
        
        <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />


        <main>
          <HeroSection />
          <EidBanner/>
          <ProductsSection products={products}
            onAddToCart={addToCart} />
          {/* <OrdersDashboard orders={orders} onUpdateStatus={updateOrderStatus} /> */}
          <BrandStorySection />
        </main>

        <Footer />

        <CartDrawer
          isOpen={cartOpen}
          items={cartItems}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onCheckout={handleCheckout} />


        {/* Cart overlay */}
        <div
          className={`cart-overlay ${cartOpen ? 'open' : ''}`}
          onClick={() => setCartOpen(false)}
          aria-hidden="true" />


        <Toast message={toastMsg} visible={toastVisible} />
      </div>

      <FloatingSocial />
    </>
  );

}