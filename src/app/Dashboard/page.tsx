'use client';
import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '../skincare/components/LoadingScreen';
import CartDrawer from '../skincare/components/CartDrawer';
import Toast from '../skincare/components/Toast';
import { Package, MapPin, ShoppingBag } from 'lucide-react';
import ProductsDashboard from '../ProductsDashboard/page';
import CategoriesDashboard from '../CategoriesDashboard/page';
import OrdersDashboard from '../OrdersDashboard/page';
import DeliveryPlaces from '../DeliveryPlaces/page';
import ProductTags from '../ProductTags/page';
import SocialMedia from '../SocialMedia/page';
import LogoPage from '../logo/page';

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
  description: 'مخصص للمسام الواسعه ويشد المسام ويوازن الدهون ويعطي مظهر ناعم للبشره',
  price: 1200,
  oldPrice: 1500,
  image: '/assets/images/s4.jpg',
},
{
  id: 4,
  name: 'Centella Tea Trica',
  description: 'مخصص للبشره الدهنيه والمعرضه للحبوب ويخفف الحبوب',
  price: 1200,
  oldPrice: 1500,
  image: '/assets/images/s5.PNG',
  badge: 'فاخر'
},
{
  id: 5,
  name: 'Centella EVEN TONE KIT',
  description: 'الحل المثالي لتوحيد لون البشرة',
  price: 1200,
  oldPrice: 1500,
  image: '/assets/images/s6.jpeg',
}];

const INITIAL_ORDERS: Order[] = [
{ id: 'SKB-١٠٠١', customer: 'سارة المنصوري', products: 'سيروم ×١', total: 479, status: 'delivered' },
{ id: 'SKB-١٠٠٢', customer: 'نور الحربي', products: 'قناع ×١', total: 345, status: 'shipped' },
{ id: 'SKB-١٠٠٣', customer: 'ريم العتيبي', products: 'غسول ×٣', total: 294, status: 'processing' },
{ id: 'SKB-١٠٠٤', customer: 'ليلى الشمري', products: 'سيروم ×١', total: 189, status: 'pending' },
{ id: 'SKB-١٠٠٥', customer: 'هند القحطاني', products: 'كريم ×١', total: 385, status: 'processing' }
];

export default function DashboardPage() {

  const [activePage, setActivePage] = useState<'orders' | 'governorates' | 'products' | 'categories' | 'sm' | 'logo' | 'tags'>('products');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  if (loading) return <LoadingScreen />;

  const menu = [
    { key: 'products', label: 'المنتجات', icon: ShoppingBag },
     { key: 'categories', label: 'تصنيفات المنتجات', icon: ShoppingBag },
     { key: 'tags', label: 'بادجات المنتجات', icon: ShoppingBag },
    { key: 'orders', label: 'الطلبات', icon: Package },
    { key: 'governorates', label: 'المحافظات', icon: MapPin },
    { key: 'sm', label: 'السوشيال ميديا', icon: Package },
    { key: 'logo', label: 'تغيير لوجو الموقع', icon: Package },
  ];

  return (
    <div className="min-h-screen font-cairo flex bg-gray-50" style={{ direction: 'rtl' }}>

      {/* Sidebar */}
      <aside className="w-72 bg-white border-l shadow-sm flex flex-col">

        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            لوحة التحكم
          </h2>
        </div>

        <nav className="flex flex-col gap-2 p-4">

          {menu.map((item) => {

            const Icon = item.icon;
            const active = activePage === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key as any)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all text-right
                ${active
                    ? 'bg-black text-white shadow'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >

                <Icon size={20} />

                <span className="font-medium">
                  {item.label}
                </span>

              </button>
            );
          })}

        </nav>

      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-6">

          {activePage === 'categories' && (
            <CategoriesDashboard/>
          )}

           {activePage === 'products' && (
            <ProductsDashboard/>
          )}

          {activePage === 'orders' && (
            <OrdersDashboard/>
          )}

          {activePage === 'governorates' && (
           <DeliveryPlaces/>
          )}

          {activePage === 'tags' && (
           <ProductTags/>
          )}


          {activePage === 'sm' && (
           <SocialMedia/>
          )}

           {activePage === 'logo' && (
           <LogoPage/>
          )}

        </main>

        <Footer />

      </div>

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        total={0}
        onClose={() => setCartOpen(false)}
        onUpdateQty={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />

      <Toast message={toastMsg} visible={toastVisible} />

    </div>
  );
}