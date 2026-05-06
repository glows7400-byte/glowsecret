// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import Header from '@/components/Header';
// // import Footer from '@/components/Footer';
// // import Toast from '../skincare/components/Toast';
// // import { base_url } from '@/Backend/api';

// // export interface HotLine {
// //     id: number;
// //     phoneNumber: string;
// // }

// // export interface SocialMediaData {
// //     id: number;
// //     facebookUrl: string;
// //     instgramUrl: string;
// //     tiktokUrl: string;
// //     snapChatUrl: string;
// //     linkedinUrl: string;
// //     twiterUrl: string;
// //     whatsAppUrl: string;
// //     hotLines: HotLine[];
// // }


// // export default function SocialMedia() {
// //     const [data, setData] = useState<SocialMediaData | null>(null);
// //     const [loading, setLoading] = useState(true);
// //     const [search, setSearch] = useState('');
// //     const [toastMsg, setToastMsg] = useState('');
// //     const [toastVisible, setToastVisible] = useState(false);

// //     // Fetch products from backend
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const res = await fetch(`${base_url}/api/ContactInfos`);
// //                 const result = await res.json();
// //                 if (result.isSuccess && result.data) {
// //                     setData(result.data);
// //                 } else {
// //                     showToast('فشل تحميل بيانات التواصل');
// //                 }
// //             } catch (err) {
// //                 console.error(err);
// //                 showToast('حدث خطأ أثناء جلب بيانات التواصل');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchData();
// //     }, []);

// //     const showToast = (msg: string) => {
// //         setToastMsg(msg);
// //         setToastVisible(true);
// //         setTimeout(() => setToastVisible(false), 2800);
// //     };



// //     return (
// //         <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

// //             <main className="p-6">
// //                 <div className="flex items-center justify-between mb-6">
// //                     <h2 className="text-xl font-bold">إدارة عناصر السوشيال ميديا</h2>
                   
// //                 </div>

// //                 {/* Filters */}
// //                 <div className="flex gap-4 mb-6 flex-wrap">
// //                     <input
// //                         type="text"
// //                         placeholder="بحث عن لينك سوشيال ميديا..."
// //                         className="border rounded-lg px-4 py-2 w-64"
// //                         value={search}
// //                         onChange={(e) => setSearch(e.target.value)}
// //                     />
                   
// //                 </div>

// //                 {/* Table */}
// //                 <div className="overflow-x-auto">
// //                     {loading ? (
// //                         <div className="text-center py-10">جاري التحميل...</div>
// //                     ) : (
// //                         <table className="w-full text-right bg-white rounded-lg overflow-hidden shadow">
// //                             <thead className="bg-gray-50 border-b">
// //                                 <tr className="text-gray-600 text-sm">
// //                                     <th className="p-3">الاسم</th>
// //                                     <th className="p-3">اللينك</th>
// //                                     <th className="p-3">الاجراءات</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {loading ? (
// //                                     <tr><td colSpan={3} className="text-center p-4">جاري التحميل...</td></tr>
// //                                 ) : data ? (
// //                                     <>
// //                                         {[
// //                                             { name: 'Facebook', value: data.facebookUrl },
// //                                             { name: 'Instagram', value: data.instgramUrl },
// //                                             { name: 'TikTok', value: data.tiktokUrl },
// //                                             { name: 'SnapChat', value: data.snapChatUrl },
// //                                             { name: 'LinkedIn', value: data.linkedinUrl },
// //                                             { name: 'X (Twitter)', value: data.twiterUrl },
// //                                             { name: 'WhatsApp', value: data.whatsAppUrl },
// //                                         ].map((item, index) => (
// //                                             <tr key={index} className="border-b hover:bg-gray-50 transition">
// //                                                 <td className="p-3 font-medium">{item.name}</td>
// //                                                 <td className="p-3 font-medium">{item.value}</td>
// //                                                 <td className="p-3 flex gap-2">
// //                                                     <button
// //                                                         className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
// //                                                         onClick={() => showToast(`تعديل ${item.name}`)}
// //                                                     >
// //                                                         تعديل
// //                                                     </button>
                                                   
// //                                                 </td>
// //                                             </tr>
// //                                         ))}

// //                                     </>
// //                                 ) : (
// //                                     <tr><td colSpan={3} className="text-center p-4">لا توجد بيانات</td></tr>
// //                                 )}
// //                             </tbody>
// //                         </table>
// //                     )}
// //                 </div>
// //             </main>


// //             <Toast message={toastMsg} visible={toastVisible} />
// //         </div>
// //     );
// // }
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Toast from '../skincare/components/Toast';
// import { base_url } from '@/Backend/api';

// export interface HotLine {
//   id: number;
//   phoneNumber: string;
// }

// export interface SocialMediaData {
//   id: number;
//   facebookUrl: string;
//   instgramUrl: string;
//   tiktokUrl: string;
//   snapChatUrl: string;
//   linkedinUrl: string;
//   twiterUrl: string;
//   whatsAppUrl: string;
//   hotLines: HotLine[];
// }

// export default function SocialMedia() {

//   const [data, setData] = useState<SocialMediaData | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState('');

//   const [toastMsg, setToastMsg] = useState('');
//   const [toastVisible, setToastVisible] = useState(false);

//   const [showEditModal, setShowEditModal] = useState(false);

//   const [currentKey, setCurrentKey] = useState('');
//   const [currentName, setCurrentName] = useState('');
//   const [value, setValue] = useState('');

//   const showToast = (msg: string) => {
//     setToastMsg(msg);
//     setToastVisible(true);
//     setTimeout(() => setToastVisible(false), 2800);
//   };

//   // fetch
//   const fetchData = async () => {

//     try {

//       const res = await fetch(`${base_url}/api/ContactInfos`, {
//         credentials: "include"
//       });

//       const result = await res.json();

//       if (result.isSuccess) {
//         setData(result.data);
//       } else {
//         showToast("فشل تحميل البيانات");
//       }

//     } catch {

//       showToast("حدث خطأ أثناء الجلب");

//     } finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // edit
//   const handleEdit = async () => {

//     if (!data) return;

//     const updatedData = {
//       ...data,
//       [currentKey]: value
//     };

//     try {

//       const res = await fetch(`${base_url}/api/ContactInfos`, {

//         method: "PUT",

//         headers: {
//           "Content-Type": "application/json"
//         },

//         credentials: "include",

//         body: JSON.stringify(updatedData)

//       });

//       const result = await res.json();

//       if (result.isSuccess) {

//         showToast("تم التعديل بنجاح");

//         setShowEditModal(false);

//         fetchData();

//       } else {

//         showToast("فشل التعديل");

//       }

//     } catch {

//       showToast("حدث خطأ أثناء التعديل");

//     }

//   };

//   // تحويل البيانات إلى array
//   const socialList = data ? [

//     { name: 'Facebook', key: 'facebookUrl', value: data.facebookUrl },
//     { name: 'Instagram', key: 'instgramUrl', value: data.instgramUrl },
//     { name: 'TikTok', key: 'tiktokUrl', value: data.tiktokUrl },
//     { name: 'SnapChat', key: 'snapChatUrl', value: data.snapChatUrl },
//     { name: 'LinkedIn', key: 'linkedinUrl', value: data.linkedinUrl },
//     { name: 'X (Twitter)', key: 'twiterUrl', value: data.twiterUrl },
//     { name: 'WhatsApp', key: 'whatsAppUrl', value: data.whatsAppUrl },

//   ] : [];

//   // search
//   const filteredList = socialList.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase()) ||
//     item.value?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (

//     <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

//       <main className="p-6">

//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold">إدارة السوشيال ميديا</h2>
//         </div>

//         {/* search */}
//         <input
//           type="text"
//           placeholder="بحث عن لينك..."
//           className="border rounded-lg px-4 py-2 w-64 mb-6"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* table */}

//         <div className="overflow-x-auto">

//           {loading ? (

//             <div className="text-center py-10">جاري التحميل...</div>

//           ) : (

//             <table className="w-full bg-white shadow rounded-lg">

//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="p-3">الاسم</th>
//                   <th className="p-3">اللينك</th>
//                   <th className="p-3">الإجراءات</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {filteredList.map((item, index) => (

//                   <tr key={index} className="border-b hover:bg-gray-50">

//                     <td className="p-3">{item.name}</td>
//                     <td className="p-3">{item.value}</td>

//                     <td className="p-3">

//                       <button
//                         className="px-3 py-1 bg-gray-100 rounded"
//                         onClick={() => {

//                           setCurrentKey(item.key);
//                           setCurrentName(item.name);
//                           setValue(item.value || '');

//                           setShowEditModal(true);

//                         }}
//                       >
//                         تعديل
//                       </button>

//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           )}

//         </div>

//       </main>

//       {/* edit modal */}

//       {showEditModal && (

//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//           <div className="bg-white w-[400px] p-6 rounded-xl">

//             <h3 className="text-lg font-bold mb-4 text-center">
//               تعديل {currentName}
//             </h3>

//             <input
//               className="border w-full p-2 rounded"
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//             />

//             <div className="flex justify-end gap-3 mt-5">

//               <button
//                 className="px-4 py-2 border rounded"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 إلغاء
//               </button>

//               <button
//                 className="px-4 py-2 bg-black text-white rounded"
//                 onClick={handleEdit}
//               >
//                 حفظ
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       <Toast message={toastMsg} visible={toastVisible} />

//     </div>

//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import Toast from '../skincare/components/Toast';
import { base_url } from '@/Backend/api';

export interface SocialMediaData {
  facebookUrl: string;
  instgramUrl: string;
  tiktokUrl: string;
  snapChatUrl: string;
  linkedinUrl: string;
  twiterUrl: string;
  whatsAppUrl: string;
}

export default function SocialMedia() {

  const [formData, setFormData] = useState<SocialMediaData>({
    facebookUrl: '',
    instgramUrl: '',
    tiktokUrl: '',
    snapChatUrl: '',
    linkedinUrl: '',
    twiterUrl: '',
    whatsAppUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  // fetch data
  const fetchData = async () => {

    try {

      const res = await fetch(`${base_url}/api/ContactInfos`, {
        credentials: "include"
      });

      const result = await res.json();

      if (result.isSuccess) {

        setFormData({
          facebookUrl: result.data.facebookUrl || '',
          instgramUrl: result.data.instgramUrl || '',
          tiktokUrl: result.data.tiktokUrl || '',
          snapChatUrl: result.data.snapChatUrl || '',
          linkedinUrl: result.data.linkedinUrl || '',
          twiterUrl: result.data.twiterUrl || '',
          whatsAppUrl: result.data.whatsAppUrl || ''
        });

      } else {

        showToast("فشل تحميل البيانات");

      }

    } catch {

      showToast("حدث خطأ أثناء الجلب");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // save
  const handleSave = async () => {

    setSaveLoading(true);

    try {

      const res = await fetch(`${base_url}/api/ContactInfos`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify(formData)

      });

      const result = await res.json();

      if (result.isSuccess) {

        showToast("تم حفظ التعديلات بنجاح");

      } else {

        showToast("فشل حفظ التعديلات");

      }

    } catch {

      showToast("حدث خطأ أثناء الحفظ");

    } finally {

      setSaveLoading(false);

    }

  };

  return (

    <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

      <main className="p-6">

        <h2 className="text-xl font-bold mb-6">
          إدارة روابط السوشيال ميديا
        </h2>

        {loading ? (

          <div className="text-center py-10">
            جاري التحميل...
          </div>

        ) : (

          <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-2xl">

            <div>
              <label className="text-sm text-gray-600">Facebook</label>
              <input
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Instagram</label>
              <input
                name="instgramUrl"
                value={formData.instgramUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">TikTok</label>
              <input
                name="tiktokUrl"
                value={formData.tiktokUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">SnapChat</label>
              <input
                name="snapChatUrl"
                value={formData.snapChatUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">LinkedIn</label>
              <input
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">X (Twitter)</label>
              <input
                name="twiterUrl"
                value={formData.twiterUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">WhatsApp</label>
              <input
                name="whatsAppUrl"
                value={formData.whatsAppUrl}
                onChange={handleChange}
                className="border w-full p-2 rounded mt-1"
              />
            </div>

            <div className="flex justify-end pt-4">

              <button
                onClick={handleSave}
                disabled={saveLoading}
                className="bg-black text-white px-6 py-2 rounded-lg"
              >
                {saveLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>

            </div>

          </div>

        )}

      </main>

      <Toast message={toastMsg} visible={toastVisible} />

    </div>

  );
}