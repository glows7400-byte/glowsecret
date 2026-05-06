// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import FloatingSocial from '@/app/skincare/components/FloatingSocial';
// import ProductsSection2 from '@/app/skincare/components/ProductsSection2';
// import { useParams, useRouter } from 'next/navigation';
// import { base_url } from '@/Backend/api';
// import CartDrawer from '@/app/skincare/components/CartDrawer';
// import Toast from '@/app/skincare/components/Toast';
// import { CartItem } from '@/app/skincare/page';
// import { v4 as uuidv4 } from 'uuid';
// import { useCart } from '@/context/CartContext';

// interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     oldPrice: number;
//     image: string;
//     badge?: string;
// }

// export default function CategoryPage() {

//     const params = useParams();
//     const slug = params.slug as string;

//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [cart, setCart] = useState<Product[]>([]);
//     const [cartOpen, setCartOpen] = useState(false);
//     const [cartId, setCartId] = useState<string | null>(null);
//     const [toastMsg, setToastMsg] = useState('');
//     const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const [toastVisible, setToastVisible] = useState(false);
//     const { 
//   addToCart, 
//   cartItems, 
//   removeFromCart, 
//   updateQty, 
//   cartCount, 
//   cartTotal 
// } = useCart();


//     const showToast = (msg: string) => {
//     setToastMsg(msg);
//     setToastVisible(true);
//     if (toastTimeout.current) clearTimeout(toastTimeout.current);
//     toastTimeout.current = setTimeout(() => setToastVisible(false), 2800);
//   };

//    useEffect(() => {
//       let storedCartId = localStorage.getItem('cartId');
//       if (!storedCartId) {
//         storedCartId = uuidv4();
//         localStorage.setItem('cartId', storedCartId);
//       }
//       setCartId(storedCartId);
//     }, []);

//   useEffect(() => {
//       if (!cartId) return; 
  
//       const fetchCart = async () => {
//         try {
//           const res = await fetch(`${base_url}/api/Carts/?cartId=${cartId}`);
//           const data = await res.json();
//           if (data.isSuccess) {
//             const mappedCart = data.data.items.map((item: any) => ({
//             id: item.productId,
//             name: item.name,
//             image: `${base_url}/files/ProductsImages/${item.imageUrl}`,
//             price: item.discountPrice ?? item.price,
//             oldPrice: item.price ? item.price : null,
//             quantity: item.quantity
//           }));
  
//         //   setCartItems(mappedCart);
  
//           const count = mappedCart.reduce(
//             (sum: number, i: any) => sum + i.quantity,
//             0
//           );
  
//         //   setCartCount(count);
  
          
//           }
//         } catch (err) {
//           console.error(err);
//         }
//       };
  
//       fetchCart();
//     }, [cartId]);
  

// //    const addToCart = async (product: Product) => {
// //      setCartItems((prev) => {
// //        const existing = prev.find((i) => i.id === product.id);
// //        if (existing) {
// //          return prev.map((i) =>
// //            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
// //          );
// //        }
// //        return [...prev, { ...product, quantity: 1 }];
// //      });
   
// //      // ارسال للسيرفر
// //      if (cartId) {
// //        try {
// //          await fetch(`${base_url}/api/Carts/?cartId=${cartId}&ProductId=${product.id}&Quantity=1`, {
// //            method: 'POST'
// //          });
// //        } catch (err) {
// //          console.error("Error adding to cart:", err);
// //        }
// //      }
   
// //      showToast(`تمت إضافة "${product.name}" إلى السلة ✨`);
// //    };
//     const handleAddToCart = async (product: Product) => {

//   addToCart({
//     ...product,
//     quantity: 1
//   });

//   if (cartId) {
//     try {
//       await fetch(
//         `${base_url}/api/Carts/?cartId=${cartId}&ProductId=${product.id}&Quantity=1`,
//         { method: "POST" }
//       );
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//     }
//   }

//   showToast(`تمت إضافة "${product.name}" إلى السلة ✨`);
// };


// // useEffect(() => {
// //         let storedCartId = localStorage.getItem('cartId');

// //         if (!storedCartId) {
// //             storedCartId = uuidv4();
// //             localStorage.setItem('cartId', storedCartId);
// //         }

// //         setCartId(storedCartId);
// //         console.log("CART ID :", storedCartId);
// //     }, []);

//     useEffect(() => {

//         const fetchProducts = async () => {
//             try {

//                 const res = await fetch(
//                     `${base_url}/api/Products?CategorySlug=${slug}`
//                 );

//                 const data = await res.json();

//                 if (data.isSuccess) {

//                     const mapped = data.data.items.map((p: any) => ({
//                         id: p.id,
//                         name: p.name,
//                         description: p.description,
//                         price: p.discountPrice ?? p.price,
//                         oldPrice: p.discountPrice ? p.price : null,
//                         image: p.imageUrl,
//                         badge: p.tagName
//                     }));

//                     setProducts(mapped);
//                 }

//             } catch (err) {
//                 console.error(err);
//             }

//             setLoading(false);
//         };

//         fetchProducts();

//     }, [slug]);

//     useEffect(() => {
//         document.body.style.overflow = cartOpen ? 'hidden' : '';
//         return () => { document.body.style.overflow = ''; };
//     }, [cartOpen]);

//     // const updateQty = async (productId: number, delta: number) => {

//     //     const item = cartItems.find(i => i.id === productId);
//     //     if (!item) return;

//     //     const newQty = item.quantity + delta;

//     //     if (newQty <= 0) {
//     //         removeFromCart(productId);
//     //         return;
//     //     }

//     //     try {
//     //         await fetch(
//     //             `${base_url}/api/Carts/${cartId}?ProductId=${productId}&Quantity=${newQty}`,
//     //             {
//     //                 method: "PUT",
//     //             }
//     //         );

//     //         setCartItems((prev) =>
//     //             prev.map((i) =>
//     //                 i.id === productId ? { ...i, quantity: newQty } : i
//     //             )
//     //         );

//     //         setCartCount((prev) => prev + delta);

//     //     } catch (error) {
//     //         console.error("Error updating cart:", error);
//     //     }
//     // };

//     // const removeFromCart = (id: number) => {
//     //     setCartItems((prev) => prev.filter((i) => i.id !== id));
//     // };

//     // const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
//     // const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

//     const router = useRouter();

//     const handleCheckout = () => {
//         setTimeout(() => {
//             router.push('/Checkout');
//         }, 300);
//     };


//     return (
//         <div
//             className="min-h-screen font-cairo"
//             style={{ background: 'var(--color-bg)', direction: 'rtl' }}
//         >

//             <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />


//             <main className="pt-32">

//                 <div className="text-center mb-16 px-5">
//                     <h1 className="font-black text-4xl gradient-text mb-4">
//                         منتجات {decodeURIComponent(slug)}

//                     </h1>

//                     <p className="text-[var(--color-muted)] max-w-xl mx-auto">
//                         اكتشفي أفضل منتجات العناية
//                     </p>
//                 </div>

//                 {loading ? (

//                     <div className="flex justify-center py-20">
//                         <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
//                     </div>

//                 ) : (

//                     <ProductsSection2
//                         products={products}
//                         onAddToCart={handleAddToCart}
//                     />

//                 )}

//             </main>

//             <CartDrawer
//                 isOpen={cartOpen}
//                 items={cartItems}
//                 total={cartTotal}
//                 onClose={() => setCartOpen(false)}
//                 onUpdateQty={updateQty}
//                 onRemove={removeFromCart}
//                 onCheckout={handleCheckout} />


//             {/* Cart overlay */}
//             <div
//                 className={`cart-overlay ${cartOpen ? 'open' : ''}`}
//                 onClick={() => setCartOpen(false)}
//                 aria-hidden="true" />


//             <Toast message={toastMsg} visible={toastVisible} />

//             <Footer />
//             <FloatingSocial />

//         </div>
//     );
// }
'use client';

import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSocial from '@/app/skincare/components/FloatingSocial';
import ProductsSection2 from '@/app/skincare/components/ProductsSection2';
import CartDrawer from '@/app/skincare/components/CartDrawer';
import Toast from '@/app/skincare/components/Toast';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { base_url } from '@/Backend/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number ;
  image: string;
  badge?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${base_url}/api/Products?CategorySlug=${slug}&pageSize=1000`);
        const data = await res.json();

        if (data.isSuccess) {
          const mapped = data.data.items.map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.discountPrice ?? p.price,
            oldPrice: p.discountPrice ? p.price : null,
            image: p.imageUrl,
            badge: p.tagName,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  return (
    <div className="min-h-screen font-cairo" style={{ background: 'var(--color-bg)', direction: 'rtl' }}>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
       
      <main className="pt-32">
        <div className="text-center mb-16 px-5">
          <h1 className="font-black text-4xl gradient-text mb-4">
            منتجات {decodeURIComponent(slug)}
          </h1>
          <p className="text-[var(--color-muted)] max-w-xl mx-auto">
            اكتشفي أفضل منتجات العناية
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ProductsSection2 products={products} onAddToCart={handleAddToCart} />
        )}
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
      <FloatingSocial />
    </div>
  );
}
