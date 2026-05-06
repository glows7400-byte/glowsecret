// 'use client';
// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Toast from '../skincare/components/Toast';
// import { base_url } from '@/Backend/api';

// export interface Product {
//   id: number;
//   name: string;
//   deliveryPrice : number;
// }


// export default function DeliveryPlaces() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [toastMsg, setToastMsg] = useState('');
//   const [toastVisible, setToastVisible] = useState(false);

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${base_url}/api/DeliveryPlaces`);
//         const data = await res.json();
//         if (data.isSuccess && data.data) {
//           setProducts(data.data);
//         } else {
//           showToast('فشل تحميل المحافظات');
//         }
//       } catch (err) {
//         console.error(err);
//         showToast('حدث خطأ أثناء جلب المحافظات');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const showToast = (msg: string) => {
//     setToastMsg(msg);
//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2800);
//   };

//   const filteredProducts = products.filter(p =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>
      
//       <main className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold">إدارة المحافظات</h2>
//           <button
//             className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
//             onClick={() => showToast('إضافة محافظة')}
//           >
//             إضافة محافظة جديدة
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex gap-4 mb-6 flex-wrap">
//           <input
//             type="text"
//             placeholder="بحث عن محافظة..."
//             className="border rounded-lg px-4 py-2 w-64"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select className="border rounded-lg px-4 py-2">
//             <option>كل الأسعار</option>
//             <option>أقل من 1000</option>
//             <option>أكثر من 1000</option>
//           </select>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="text-center py-10">جاري التحميل...</div>
//           ) : (
//             <table className="w-full text-right bg-white rounded-lg overflow-hidden shadow">
//               <thead className="bg-gray-50 border-b">
//                 <tr className="text-gray-600 text-sm">
//                   <th className="p-3">اسم المحافظة</th>
//                   <th className="p-3">سعر التوصيل للمحافظة</th>
//                   <th className="p-3">الاجراءات</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.map((product) => (
//                   <tr key={product.id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-3 font-medium">{product.name}</td>
//                     <td className="p-3 font-medium">{product.deliveryPrice}</td>
                    
//                     <td className="p-3 flex gap-2">
//                       <button
//                         className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
//                         onClick={() => showToast(`تعديل ${product.name}`)}
//                       >
//                         تعديل
//                       </button>
//                       <button
//                         className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
//                         onClick={() => showToast(`حذف ${product.name}`)}
//                       >
//                         حذف
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </main>

      
//       <Toast message={toastMsg} visible={toastVisible} />
//     </div>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import Toast from '../skincare/components/Toast';
import { base_url } from '@/Backend/api';

export interface Product {
  id: number;
  name: string;
  deliveryPrice: number;
}

export default function DeliveryPlaces() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  // fetch
  const fetchProducts = async () => {

    try {

      const res = await fetch(`${base_url}/api/DeliveryPlaces`, {
        credentials: "include"
      });

      const data = await res.json();

      if (data.isSuccess) {
        setProducts(data.data);
      }

    } catch {

      showToast("فشل تحميل المحافظات");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // add
  const handleAdd = async () => {

    if (!name.trim()) {
      showToast("ادخل اسم المحافظة");
      return;
    }

    try {

      const res = await fetch(`${base_url}/api/DeliveryPlaces`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify({
          name: name,
          deliveryPrice: deliveryPrice
        })

      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم إضافة المحافظة");

        setShowAddModal(false);

        setName('');
        setDeliveryPrice(0);

        fetchProducts();

      } else {

        showToast("فشل الإضافة");

      }

    } catch {

      showToast("حدث خطأ أثناء الإضافة");

    }

  };

  // edit
  const handleEdit = async () => {

    if (selectedId === null) return;

    try {

      const res = await fetch(`${base_url}/api/DeliveryPlaces/${selectedId}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify({
          name: name,
          deliveryPrice: deliveryPrice
        })

      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم تعديل المحافظة");

        setShowEditModal(false);

        fetchProducts();

      } else {

        showToast("فشل التعديل");

      }

    } catch {

      showToast("حدث خطأ أثناء التعديل");

    }

  };

  // delete
  const handleDelete = async () => {

    if (selectedId === null) return;

    try {

      const res = await fetch(`${base_url}/api/DeliveryPlaces/${selectedId}`, {

        method: "DELETE",

        credentials: "include"

      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم حذف المحافظة");

        setShowDeleteModal(false);

        fetchProducts();

      } else {

        showToast("فشل الحذف");

      }

    } catch {

      showToast("حدث خطأ أثناء الحذف");

    }

  };

  // search
  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

      <main className="p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-bold">إدارة المحافظات</h2>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => setShowAddModal(true)}
          >
            إضافة محافظة
          </button>

        </div>

        {/* search */}
        <input
          type="text"
          placeholder="بحث عن محافظة..."
          className="border rounded-lg px-4 py-2 w-64 mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* table */}
        <div className="overflow-x-auto">

          {loading ? (

            <div className="text-center py-10">جاري التحميل...</div>

          ) : (

            <table className="w-full bg-white shadow rounded-lg">

              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3">اسم المحافظة</th>
                  <th className="p-3">سعر التوصيل</th>
                  <th className="p-3">الإجراءات</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((p) => (

                  <tr key={p.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.deliveryPrice}</td>

                    <td className="p-3 flex gap-2">

                      <button
                        className="px-3 py-1 bg-gray-100 rounded"
                        onClick={() => {

                          setSelectedId(p.id);
                          setName(p.name);
                          setDeliveryPrice(p.deliveryPrice);

                          setShowEditModal(true);

                        }}
                      >
                        تعديل
                      </button>

                      <button
                        className="px-3 py-1 bg-red-100 text-red-600 rounded"
                        onClick={() => {

                          setSelectedId(p.id);
                          setShowDeleteModal(true);

                        }}
                      >
                        حذف
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </main>

      {/* ADD MODAL */}
      {showAddModal && (
        <Modal
          title="إضافة محافظة"
          name={name}
          setName={setName}
          deliveryPrice={deliveryPrice}
          setDeliveryPrice={setDeliveryPrice}
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <Modal
          title="تعديل محافظة"
          name={name}
          setName={setName}
          deliveryPrice={deliveryPrice}
          setDeliveryPrice={setDeliveryPrice}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl text-center">

            <h3 className="text-lg font-bold mb-4">
              هل أنت متأكد من الحذف؟
            </h3>

            <div className="flex gap-3 justify-center">

              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                إلغاء
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDelete}
              >
                حذف
              </button>

            </div>

          </div>

        </div>

      )}

      <Toast message={toastMsg} visible={toastVisible} />

    </div>
  );
}

// modal component
function Modal({
  title,
  name,
  setName,
  deliveryPrice,
  setDeliveryPrice,
  onClose,
  onSave
}: any) {

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[400px] p-6 rounded-xl">

        <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>

        <input
          placeholder="اسم المحافظة"
          className="border w-full p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="سعر التوصيل"
          className="border w-full p-2 rounded"
          value={deliveryPrice}
          onChange={(e) => setDeliveryPrice(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            إلغاء
          </button>

          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={onSave}
          >
            حفظ
          </button>

        </div>

      </div>

    </div>

  );
}