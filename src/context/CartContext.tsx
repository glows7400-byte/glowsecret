'use client';
import { base_url } from "@/Backend/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  image: string;
  badge?: string;
}

 const CartContext = createContext<any>(null);
 export const CartProvider = ({ children }: any) => {
 const [cartItems, setCartItems] = useState<CartItem[]>([]);
 const [cartId, setCartId] = useState<string | null>(null);
 const [toastMsg, setToastMsg] = useState('');
 const [toastVisible, setToastVisible] = useState(false);
 const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
 

 const showToast = (msg: string) => {
  setToastMsg(msg);
  setToastVisible(true);

  if (toastTimeout.current) {
    clearTimeout(toastTimeout.current);
  }

  toastTimeout.current = setTimeout(() => {
    setToastVisible(false);
  }, 3000);
};

  useEffect(() => {
    let storedCartId = localStorage.getItem('cartId');
    if (!storedCartId) {
      storedCartId = uuidv4();
      localStorage.setItem('cartId', storedCartId);
    }
    setCartId(storedCartId);
  }, []);

//   const addToCart = (product: CartItem) => {
//     setCartItems(prev => {
//       const existing = prev.find(p => p.id === product.id);

//       if (existing) {
//         return prev.map(p =>
//           p.id === product.id
//             ? { ...p, quantity: p.quantity + 1 }
//             : p
//         );
//       }

//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };
 const addToCart = async (product: Product) => {
  
  // ✅ Facebook Pixel
const eventID = "atc_" + Date.now();

if (typeof window !== "undefined" && window.fbq) {

  const price =
    product.discountPrice !== undefined && product.discountPrice !== null
      ? product.discountPrice
      : product.price;

  const safePrice = Number(price);

  
window.fbq('track', 'AddToCart', {
  value: Number(product.discountPrice ?? product.price) || 0,
  currency: 'EGP',
  content_name: product.name,
  content_ids: [product.id.toString()],
  content_type: 'product'
}, {
  eventID: eventID
});


   // ✅ TikTok Pixel
  if (typeof window !== "undefined" && (window as any).ttq) {
    (window as any).ttq.track('AddToCart', {
      content_id: product.id,
      content_type: 'product',
      value: product.price,
      currency: 'EGP'
    });
  }
  setCartItems((prev) => {
    const existing = prev.find((i) => i.id === product.id);
    if (existing) {
      return prev.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });

  // ارسال للسيرفر
  if (cartId) {
    try {
      await fetch(`${base_url}/api/Carts/?cartId=${cartId}&ProductId=${product.id}&Quantity=1`, {
        method: 'POST'
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }

  showToast(`تمت إضافة "${product.name}" إلى السلة ✨`);
};
   const removeFromCart = async (id: number) => {
  
  setCartItems(prev => prev.filter(item => item.id !== id));

  
  if (cartId) {
    try {
      const res = await fetch(`${base_url}/api/Carts/${cartId}?ProductId=${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (!data.isSuccess) {
        console.error("فشل حذف العنصر من السلة على السيرفر");
      }
    } catch (err) {
      console.error("حدث خطأ أثناء حذف العنصر من السلة:", err);
    }
  }

  showToast("تم حذف العنصر من السلة ");
};

 const updateQty = async (productId: number, delta: number) => {
 
   const item = cartItems.find(i => i.id === productId);
   if (!item) return;
 
   //const newQty = item.quantity + delta;
   const newQty = Math.max(item.quantity + delta, 1);
 
   if (newQty <= 0) {
     removeFromCart(productId);
     return;
   }
 
   try {
     await fetch(
       `${base_url}/api/Carts/${cartId}?ProductId=${productId}&Quantity=${newQty}`,
       {
         method: "PUT",
       }
     );
 
     setCartItems((prev) =>
       prev.map((i) =>
         i.id === productId ? { ...i, quantity: newQty } : i
       )
     );
 
     //setCartCount((prev) => prev + delta);
 
   } catch (error) {
     console.error("Error updating cart:", error);
   }
 };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
  if (!cartId) return;

  const fetchCart = async () => {
    const res = await fetch(`${base_url}/api/Carts/?cartId=${cartId}`);
    const data = await res.json();
    if (data.isSuccess) {
      const mappedCart = data.data.items.map((item: any) => ({
        id: item.productId,
        name: item.name,
        image: `${base_url}/files/ProductsImages/${item.imageUrl}`,
        price: item.discountPrice ?? item.price,
        oldPrice: item.price ?? null,
        quantity: item.quantity,
      }));
      setCartItems(mappedCart);
    //   setCartCount(mappedCart.reduce((sum: number, i: any) => sum + i.quantity, 0));
    }
  };

  fetchCart();
}, [cartId]);

const clearCart = () => {
  setCartItems([]);
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        cartTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
