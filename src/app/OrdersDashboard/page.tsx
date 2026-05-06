'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '../skincare/components/Toast';
import { base_url } from '@/Backend/api';

export interface Product {
    id:number;
    orderNumber: string;
    userName: string;
    userPhoneNumber: string;
    userGovernorate: string;
    userAddress: string;
    notes: string;
    createdAt: string;
    totalCost: number;
    productsCost?: number;
    deliveryCost?: number;
    items: OrderItem[];
}
export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}


export default function OrdersDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [toastMsg, setToastMsg] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[] | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Product | null>(null);
const [modalVisible, setModalVisible] = useState(false);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${base_url}/api/Orders?PageSize=1000`, {
                    credentials: "include"
                });

                const data = await res.json();
                if (data.isSuccess && data.data?.items) {
                    setProducts(data.data.items);
                } else {
                    showToast('فشل تحميل الطلبات');
                }
            } catch (err) {
                console.error(err);
                showToast('حدث خطأ أثناء جلب الطلبات');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2800);
    };

    const filteredProducts = products.filter(p =>
        p.userName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);


    const fetchOrderItems = async (id: number) => {
        try {
            const res = await fetch(`${base_url}/api/Orders/${id}`, {
                credentials: "include"
            });
            const data = await res.json();
            if (data.isSuccess && data.data?.items) {
                setSelectedOrder(data.data);
                setSelectedOrderItems(data.data.items);
                setModalVisible(true);
            } else {
                showToast('فشل تحميل تفاصيل الطلب');
            }
        } catch (err) {
            console.error(err);
            showToast('حدث خطأ أثناء جلب تفاصيل الطلب');
        }
    };

    return (
        <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

            <main className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">إدارة الطلبات</h2>

                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6 flex-wrap">
                    <input
                        type="text"
                        placeholder="بحث عن طلب معين..."
                        className="border rounded-lg px-4 py-2 w-64"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="text-center py-10">جاري التحميل...</div>
                    ) : (
                        <table className="w-full text-right bg-white rounded-lg overflow-hidden shadow">
                            <thead className="bg-gray-50 border-b">
                                <tr className="text-gray-600 text-sm">
                                    <th className="p-3">رقم الطلب</th>
                                    <th className="p-3">اسم العميل</th>
                                    <th className="p-3">رقم التليفون</th>
                                    <th className="p-3">المحافظة</th>
                                    <th className="p-3">العنوان</th>
                                    <th className="p-3">ملاحظات من العميل</th>
                                    <th className="p-3">تاريخ اتمام الطلب</th>
                                    <th className="p-3">الطلب</th>
                                    <th className="p-3">تكلفة الطلب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-3 font-medium">{product.orderNumber}</td>
                                        <td className="p-3 font-medium">{product.userName}</td>
                                        <td className="p-3 font-medium">{product.userPhoneNumber}</td>
                                        <td className="p-3 font-medium">{product.userGovernorate}</td>
                                        <td className="p-3 font-medium">{product.userAddress}</td>
                                        <td className="p-3 font-medium">{product.notes}</td>
                                        <td className="p-3 font-medium">
                                            {new Date(product.createdAt).toLocaleString('ar-EG', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                            })}
                                        </td>
                                        <td className="p-3">
                                            <button
                                                className="bg-black text-white px-3 py-1 rounded "
                                                onClick={() => fetchOrderItems(product.id)}
                                            >
                                               تفاصيل
                                            </button>
                                        </td>
                                        <td className="p-3 font-medium">{product.totalCost}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            السابق
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-black text-white' : ''
                                    }`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            التالي
                        </button>

                    </div>
                </div>
            </main>
           {modalVisible && selectedOrder && selectedOrderItems && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setModalVisible(false)}
      >
        ✕
      </button>
      <h3 className="text-lg font-bold mb-4 text-center">تفاصيل الطلب</h3>

     

      {/* جدول المنتجات */}
      <table className="w-full text-right text-sm">
        <thead className="border-b">
          <tr>
            <th className="p-2">اسم المنتج</th>
            <th className="p-2">الكمية</th>
            <th className="p-2">السعر</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrderItems.map((item, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{item.productName}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* معلومات الطلب الأساسية */}
      <div className="mb-4 mt-4 text-sm">
       
        <p className='mb-1'><strong>تكلفة التوصيل:</strong> {selectedOrder.deliveryCost} ج</p>
        <p className='mb-1'><strong>سعر المنتجات:</strong> {selectedOrder.productsCost} ج</p>
        <p><strong>الإجمالي:</strong> {selectedOrder.totalCost} ج</p>
      </div>
    </div>
  </div>
)}
            <Toast message={toastMsg} visible={toastVisible} />
        </div>
    );
}