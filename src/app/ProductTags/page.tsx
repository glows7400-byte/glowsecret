// 'use client';
// import React, { useState, useEffect } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Toast from '../skincare/components/Toast';
// import { base_url } from '@/Backend/api';

// export interface Product {
//   id: number;
//   title: string;
// }


// export default function ProductTags() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [toastMsg, setToastMsg] = useState('');
//   const [toastVisible, setToastVisible] = useState(false);

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${base_url}/api/ProductTags`);
//         const data = await res.json();
//         if (data.isSuccess && data.data) {
//           setProducts(data.data);
//         } else {
//           showToast('فشل تحميل التاجات');
//         }
//       } catch (err) {
//         console.error(err);
//         showToast('حدث خطأ أثناء جلب التاجات');
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
//     p.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>
      
//       <main className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold">إدارة التاجات</h2>
//           <button
//             className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
//             onClick={() => showToast('إضافة تاج')}
//           >
//             إضافة تاج جديد
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
//                   <th className="p-3">اسم التاج</th>
//                   <th className="p-3">الاجراءات</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.map((product) => (
//                   <tr key={product.id} className="border-b hover:bg-gray-50 transition">
//                     <td className="p-3 font-medium">{product.title}</td>
                    
//                     <td className="p-3 flex gap-2">
//                       <button
//                         className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
//                         onClick={() => showToast(`تعديل ${product.title}`)}
//                       >
//                         تعديل
//                       </button>
//                       <button
//                         className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
//                         onClick={() => showToast(`حذف ${product.title}`)}
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
  title: string;
  slug: string;
}

export default function ProductTags() {

  const [categories, setCategories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [name, setName] = useState('');
  const [addLoading, setAddLoading] = useState(false);



  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };



  // fetch categories
  const fetchCategories = async () => {

    try {

      const res = await fetch(`${base_url}/api/ProductTags`, {
        credentials: "include"
      });

      const data = await res.json();

      if (data.isSuccess) {
        setCategories(data.data);
      }

    } catch {

      showToast("فشل تحميل التصنيفات");

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {
    fetchCategories();
  }, []);




  const handleAddCategory = async () => {

    if (!name.trim()) {
      showToast("يرجى إدخال اسم التاج");
      return;
    }

    setAddLoading(true);

    try {

      const res = await fetch(`${base_url}/api/ProductTags?Title=${name}`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include"

      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم إضافة التاج بنجاح");

        setShowAddModal(false);

        setName('');

        fetchCategories();

      } else {

        showToast("فشل إضافة التاج");

      }

    } catch {

      showToast("حدث خطأ أثناء الإضافة");

    } finally {

      setAddLoading(false);

    }

  };




  const handleDeleteCategory = async () => {

    if (!selectedCategoryId) return;

    try {

      const res = await fetch(`${base_url}/api/ProductTags/${selectedCategoryId}`, {

        method: "DELETE",

        credentials: "include"

      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم حذف التاج");

        fetchCategories();

        setShowDeleteModal(false);

      } else {

        showToast("فشل حذف التاج");

      }

    } catch {

      showToast("حدث خطأ أثناء الحذف");

    }

  };




  const filteredCategories = categories.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );



  return (

    <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

      <main className="p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-bold">إدارة التاجات</h2>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
            onClick={() => setShowAddModal(true)}
          >
            إضافة تاج جديد
          </button>

        </div>



        {/* Search */}

        <div className="flex gap-4 mb-6 flex-wrap">

          <input
            type="text"
            placeholder="بحث عن تاج..."
            className="border rounded-lg px-4 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>




        {/* Table */}

        <div className="overflow-x-auto">

          {loading ? (

            <div className="text-center py-10">
              جاري التحميل...
            </div>

          ) : (

            <table className="w-full text-right bg-white rounded-lg overflow-hidden shadow">

              <thead className="bg-gray-50 border-b">

                <tr className="text-gray-600 text-sm">
                  <th className="p-3">اسم التاج</th>
                  <th className="p-3">الإجراءات</th>
                </tr>

              </thead>

              <tbody>

                {filteredCategories.map((category) => (

                  <tr key={category.id} className="border-b hover:bg-gray-50">

                    <td className="p-3 font-medium">
                      {category.title}
                    </td>

                    <td className="p-3 flex gap-2">

                      <button
                        className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                        onClick={() => {
                          setSelectedCategoryId(category.id);
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

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[400px] rounded-xl p-6 shadow-lg">

            <h3 className="text-lg font-bold mb-4 text-center">
              إضافة تاج جديد
            </h3>

            <input
              placeholder="اسم التاج"
              className="border w-full p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded"
              >
                إلغاء
              </button>

              <button
                onClick={handleAddCategory}
                disabled={addLoading}
                className="px-4 py-2 bg-black text-white rounded"
              >
                {addLoading ? "جاري الإضافة..." : "إضافة"}
              </button>

            </div>

          </div>

        </div>

      )}




      {/* DELETE MODAL */}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[400px] rounded-xl p-6 shadow-lg text-center">

            <h3 className="text-lg font-bold mb-4">
              هل أنت متأكد من حذف هذا التصنيف؟
            </h3>

            <p className="text-gray-500 mb-6">
              لا يمكن التراجع بعد الحذف
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                إلغاء
              </button>

              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded"
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