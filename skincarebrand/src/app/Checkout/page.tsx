
'use client';
import Header from '@/components/Header';
import React, { useEffect, useRef, useState } from 'react';
import Toast from '../skincare/components/Toast';
import { useRouter } from 'next/navigation';
import { base_url } from '@/Backend/api';
import { v4 as uuidv4 } from 'uuid'; 
import { useCart } from '@/context/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface DeliveryPlace {
  id: number;
  name: string;
  deliveryPrice: number;
}

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryPlaces, setDeliveryPlaces] = useState<DeliveryPlace[]>([]);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [governorateId, setGovernorateId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
   const [cartLoading, setCartLoading] = useState(true);
  const [cartId, setCartId] = useState<string | null>(null); 
  const router = useRouter();
  const { clearCart } = useCart();

  // ⚡ إنشاء cartId فريد لكل مستخدم
  useEffect(() => {
    let storedCartId = localStorage.getItem('cartId');
    if (!storedCartId) {
      storedCartId = uuidv4();
      localStorage.setItem('cartId', storedCartId);
    }
    setCartId(storedCartId);
  }, []);

  // ⚡ جلب أماكن التوصيل
  useEffect(() => {
    fetch(`${base_url}/api/DeliveryPlaces`)
      .then(res => res.json())
      .then(data => {
        if (data.isSuccess) {
          setDeliveryPlaces(data.data);
        }
      });
  }, []);

  // ⚡ fetch السلة بعد أن يصبح cartId جاهز
 useEffect(() => {
  if (!cartId) return;

  const fetchCart = async () => {
    setCartLoading(true);
    try {
      const res = await fetch(`${base_url}/api/Carts/?cartId=${cartId}`);
      const data = await res.json();
      if (data.isSuccess) {
        const mappedCart = data.data.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          price: item.discountPrice ?? item.price,
          quantity: item.quantity
        }));
        setCartItems(mappedCart);
      }
    } catch (err) {
      console.error(err);
    }
    setCartLoading(false);
  };

  fetchCart();
}, [cartId]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastVisible(false), 2800);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryPrice;

  useEffect(() => {
  if (typeof window === "undefined") return;

  // Facebook
if (typeof window !== "undefined" && window.fbq && total > 0 && cartItems?.length > 0) {

  window.fbq('track', 'AddPaymentInfo', {
  content_ids: cartItems.map(i => i.id.toString()),
  content_type: "product",
  value: Number(total.toFixed(2)) || 0,
  currency: "EGP"
});


if (
  typeof window !== "undefined" &&
  window.fbq &&
  order?.items?.length
) {

  const orderItems: any[] = order.items;

  const total = orderItems.reduce((acc, item: any) => {
    const price =
      item.discountPrice ?? item.finalPrice ?? item.price;

    return acc + price * item.quantity;
  }, 0);

  const eventID = "purchase_" + Date.now();

 window.fbq('track', 'Purchase', {
  value: Number(total.toFixed(2)) || 0,
  currency: 'EGP',
  content_ids: orderItems.map(i => i.id.toString()),
  content_type: 'product',
  contents: orderItems.map(i => ({
    id: String(i.id),
    quantity: i.quantity,
    item_price: Number(i.discountPrice ?? i.finalPrice ?? i.price) || 0
  }))
}, {
  eventID: eventID
});




 

  // TikTok
  if (window.ttq) {
    window.ttq.track('InitiateCheckout', {
      value: total,
      currency: 'EGP',
      quantity: cartItems.length
    });
  }

}, [cartItems, total]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!governorateId) {
      showToast('اختر المحافظة');
      return;
    }

    if (!cartId) {
      showToast('حدث خطأ في السلة');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${base_url}/api/Orders?cartId=${cartId}&UserName=${name}&UserPhoneNumber=${phone}&GovernorateId=${governorateId}&UserAddress=${address}&Notes=${notes}`,
        { method: 'POST' }
      );

      const data = await res.json();

      if (data.isSuccess) {
        console.log("suceess sended" , data);
        


  // ✅ TikTok Purchase
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track('CompletePayment', {
      value: total,
      currency: 'EGP',
      content_ids: cartItems.map(i => i.id),
      content_type: 'product'
    });
  }
        showToast('تم تأكيد طلبك بنجاح');
        clearCart();
        setTimeout(() => router.push('/skincare'), 2800);
      } else {
        showToast('حدث خطأ');
      }
    } catch (err) {
      showToast('فشل الاتصال بالسيرفر');
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen pt-8 px-4 md:px-8 bg-gradient-to-br from-[#fdf4f7] to-[#f6eef8] font-cairo">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          {/* LEFT - Billing Form */}
          <form
            onSubmit={handleSubmit}
            className="order-2 md:order-1 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/40"
          >
            <h2 className="text-lg sm:text-2xl font-bold mb-6 text-[var(--color-primary)]">
              يرجى ادخال معلوماتك لاكمال الطلب
            </h2>

            <div className="space-y-5">
              <input type="text" placeholder="الاسم الكامل" required value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-xl border border-pink-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
              <input dir='rtl' type="tel" placeholder="رقم الهاتف" required value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full rounded-xl border border-pink-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />

              <select value={governorateId ?? ''} onChange={e => {
                const selectedId = Number(e.target.value);
                setGovernorateId(selectedId);
                const selectedPlace = deliveryPlaces.find(p => p.id === selectedId);
                if (selectedPlace) setDeliveryPrice(selectedPlace.deliveryPrice);
              }} required className="w-full rounded-xl border border-pink-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition">
                <option value="">أختر المحافظة</option>
                {deliveryPlaces.map(place => <option key={place.id} value={place.id}>{place.name}</option>)}
              </select>

              <textarea placeholder="العنوان بالتفصيل" required value={address} onChange={e => setAddress(e.target.value)}
                className="w-full rounded-xl border border-pink-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
              <textarea placeholder="ملاحظات إضافية (اختياري)" value={notes} onChange={e => setNotes(e.target.value)}
                className="w-full rounded-xl border border-pink-200 px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />

              <div className="mt-2 px-3 py-2 rounded-lg bg-pink-50 text-sm font-semibold text-[var(--color-primary)]">
                تكلفة الشحن : {deliveryPrice} جنيه
              </div>

           <button
           type="submit"
           disabled={loading}
           className="w-full py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #c9708a, #9b72aa)' }}
                  {loading ? 'جارِ تأكيد الطلب...' : 'تأكيد الطلب'}
          </button>
          </div>
          </form>

          {/* RIGHT - Order Summary */}
          <div className="order-1 md:order-2 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/40 h-fit">
            <h2 className="text-lg sm:text-2xl font-bold mb-2 text-[var(--color-primary)]">ملخص الطلب</h2>
            <h6 className="text-xs sm:text-sm font-medium mb-6 text-[gray]">التسليم خلال 1 - 4 يوم عمل</h6>

            <div className="space-y-4">
              {cartLoading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">الكمية: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{item.price * item.quantity} جنيه</p>
                </div>
              ))

               )}

              <h6 className="text-xs sm:text-sm font-medium mb-6 text-[var(--color-primary)] rounded-lg bg-pink-50 p-2">
                الدفع عند الاستلام نقدا
              </h6>

              <div className="border-t pt-4 flex justify-between font-bold text-lg text-[var(--color-primary)]">
                <span>الإجمالي</span>
                <span>{total} جنيه</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Toast message={toastMsg} visible={toastVisible} />
    </>
  );
};

export default CheckoutPage;