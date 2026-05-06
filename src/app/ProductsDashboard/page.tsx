
'use client';
import React, { useState, useEffect } from 'react';
import Toast from '../skincare/components/Toast';
import { base_url } from '@/Backend/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  tagName?: string;
  categoryName?: string;
  tagId?: number;
  categoryId?: number;
  quantity?: number;
}

export default function ProductsDashboard() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    quantity: '',
    categoryId: '',
    tagId: ''
  });

  const [image, setImage] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15); 
const [totalItems, setTotalItems] = useState(0);





  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };



  // fetch products
  // const fetchProducts = async () => {
  //   try {
  //     const res = await fetch(`${base_url}/api/products?pageSize=1000`, {
  //       credentials: "include"
  //     });

  //     const data = await res.json();

  //     if (data.isSuccess) {
  //       setProducts(data.data.items);
  //     }

  //   } catch {
  //     showToast('فشل تحميل المنتجات');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchProducts = async (page = 1) => {
  setLoading(true);
  try {
    const res = await fetch(`${base_url}/api/products?PageIndex=${page}&PageSize=${pageSize}`, {
      credentials: "include"
    });

    const data = await res.json();

    if (data.isSuccess) {
      setProducts(data.data.items);
      setTotalItems(data.data.count); // عدد المنتجات الكلي
      setCurrentPage(data.data.pageIndex); // الصفحة الحالية من السيرفر
    } else {
      showToast("فشل تحميل المنتجات");
    }
  } catch {
    showToast("حدث خطأ أثناء تحميل المنتجات");
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  fetchProducts(currentPage);
}, [currentPage, pageSize]);



  // fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${base_url}/api/Categories`);
      const data = await res.json();

      if (data.isSuccess) {
        setCategories(data.data);
      }

    } catch {
      showToast('فشل تحميل التصنيفات');
    }
  };



  // fetch tags
  const fetchTags = async () => {
    try {
      const res = await fetch(`${base_url}/api/ProductTags`);
      const data = await res.json();

      if (data.isSuccess) {
        setTags(data.data);
      }

    } catch {
      showToast('فشل تحميل التاجات');
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);



  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleImage = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };



  const handleAddProduct = async () => {

    if (!image) {
      showToast("يرجى رفع صورة");
      return;
    }

    setAddLoading(true);

    const body = new FormData();

    body.append("Name", formData.name);
    body.append("Description", formData.description);
    body.append("Price", formData.price);
    body.append("DiscountPrice", formData.discountPrice);
    body.append("Quantity", formData.quantity);
    body.append("CategoryId", formData.categoryId);
    body.append("ProductTagId", formData.tagId);
    body.append("ImageCover", image);


    try {

      const res = await fetch(`${base_url}/api/Products`, {
        method: "POST",
        body: body,
        credentials: "include"
      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم إضافة المنتج بنجاح");

        setShowModal(false);

        fetchProducts();

        setFormData({
          name: '',
          description: '',
          price: '',
          discountPrice: '',
          quantity: '',
          categoryId: '',
          tagId: ''
        });

      } else {

        showToast("فشل إضافة المنتج");

      }

    } catch {

      showToast("حدث خطأ أثناء الإضافة");

    } finally {

      setAddLoading(false);

    }

  };



  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  const totalPages = Math.ceil(totalItems / pageSize);




  const handleEditProduct = async () => {

    if (!selectedProductId) return;
    setEditLoading(true);

    const body = new FormData();

    body.append("Name", formData.name);
    body.append("Description", formData.description);
    body.append("Price", formData.price);
    body.append("DiscountPrice", formData.discountPrice);
    body.append("Quantity", formData.quantity);
    body.append("CategoryId", formData.categoryId);

    if (formData.tagId) {
      body.append("ProductTagId", formData.tagId);
    }

    if (image) {
      body.append("ImageCover", image);
    }

    try {

      const res = await fetch(`${base_url}/api/Products/${selectedProductId}`, {
        method: "PUT",
        body: body,
        credentials: "include"
      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم تعديل المنتج بنجاح");

        setShowModal(false);
        setIsEdit(false);

        fetchProducts();

      } else {

        showToast("فشل تعديل المنتج");

      }

    } catch {

      showToast("حدث خطأ أثناء التعديل");

    }
    finally {

      setEditLoading(false);

    }

  };

  const handleDeleteProduct = async () => {

    if (!selectedProductId) return;

    try {

      const res = await fetch(`${base_url}/api/Products/${selectedProductId}`, {
        method: "DELETE",
        credentials: "include"
      });

      const data = await res.json();

      if (data.isSuccess) {

        showToast("تم حذف المنتج");

        fetchProducts();
        setShowDeleteModal(false);

      } else {

        showToast("فشل حذف المنتج");

      }

    } catch {

      showToast("حدث خطأ أثناء الحذف");

    }

  };

  const openEditModal = (product: Product) => {

    setSelectedProduct(product);

    const category = categories.find(c => c.name === product.categoryName);
    const tag = tags.find(t => t.title === product.tagName);

    setFormData({
      name: product.name,
      description: product.description,
      price: String(product.price),
      discountPrice: String(product.discountPrice),
      quantity: String(product.quantity || ''),
      categoryId: category ? String(category.id) : '',
      tagId: tag ? String(tag.id) : ''
    });

    setSelectedProductId(product.id);

    setShowEditModal(true);
  };


  return (
    <div className="min-h-screen font-cairo bg-gray-50" style={{ direction: 'rtl' }}>

      <main className="p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">إدارة المنتجات</h2>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
            onClick={() => setShowModal(true)}
          >
            إضافة منتج
          </button>

        </div>


        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">

          <input
            type="text"
            placeholder="بحث عن منتج..."
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
                  <th className="p-3">الصورة</th>
                  <th className="p-3">اسم المنتج</th>
                  <th className="p-3">وصف المنتج</th>
                  <th className="p-3">السعر قبل الخصم</th>
                  <th className="p-3">السعر بعد الخصم</th>
                  <th className="p-3">الكميةالمتاحة</th>
                  <th className="p-3">الإجراءات</th>
                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr key={product.id} className="border-b hover:bg-gray-50">

                    <td className="p-3">
                      <img
                        src={product.imageUrl}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>

                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.description}</td>
                    <td className="p-3">{product.price}</td>
                    <td className="p-3">{product.discountPrice}</td>
                    <td className="p-3">
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => openEditModal(product)}
                      >
                        تعديل
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                        onClick={() => {
                          setSelectedProductId(product.id);
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
         
<div className="flex justify-center gap-2 mt-4">
  <button
    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
    className="px-3 py-1 bg-gray-200 rounded"
  >
    السابق
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 rounded ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200'}`}
    >
      {page}
    </button>
  ))}

  <button
    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
    className="px-3 py-1 bg-gray-200 rounded"
  >
    التالي
  </button>
</div>

        </div>








      </main>



      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[800px] rounded-xl p-6 shadow-lg">

            <h3 className="text-lg font-bold mb-4 text-center">إضافة منتج جديد</h3>


            <div className="space-y-3">

              <input
                name="name"
                placeholder="اسم المنتج"
                className="border w-full p-2 rounded mb-2"
                onChange={handleChange}
              />

              <option>صورة المنتج</option>

              <input
                type="file"
                onChange={handleImage}
                className='mb-2'
              />

              <textarea
                name="description"
                placeholder="وصف المنتج"
                className="border w-full p-2 rounded "
                onChange={handleChange}
              />

              <input
                name="price"
                placeholder="السعر"
                className="border w-full p-2 rounded"
                onChange={handleChange}
              />

              <input
                name="discountPrice"
                placeholder="السعر بعد الخصم"
                className="border w-full p-2 rounded"
                onChange={handleChange}
              />

              <input
                name="quantity"
                placeholder="الكمية"
                className="border w-full p-2 rounded"
                onChange={handleChange}
              />


              <select
                name="categoryId"
                className="border w-full p-2 rounded"
                onChange={handleChange}
              >

                <option>اختر التصنيف</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}

              </select>



              <select
                name="tagId"
                className="border w-full p-2 rounded"
                onChange={handleChange}
              >

                <option value="">التاج</option>

                {tags.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}

              </select>



            </div>



            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                إلغاء
              </button>

              {/* <button
                onClick={isEdit ? handleEditProduct : handleAddProduct}
                className="px-4 py-2 bg-black text-white rounded"
              >
                {isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
              </button> */}
              <button
                onClick={handleAddProduct}
                disabled={addLoading}
                className="px-4 py-2 bg-black text-white rounded flex items-center justify-center"
              >
                {addLoading ? "جاري الإضافة..." : "إضافة المنتج"}
              </button>

            </div>

          </div>

        </div>

      )}

      {showEditModal && selectedProduct && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[800px] rounded-xl p-6 shadow-lg">

            <h3 className="text-lg font-bold mb-4 text-center">
              تعديل المنتج
            </h3>


            <div className="space-y-3">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border w-full p-2 rounded"
                placeholder="اسم المنتج"
              />


              <p className="text-sm text-gray-500">الصورة الحالية</p>

              <img
                src={selectedProduct.imageUrl}
                className="w-20 h-20 object-cover rounded"
              />

              <input
                type="file"
                onChange={handleImage}
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              />

              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              />

              <input
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              />

              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="border w-full p-2 rounded"
              />


              <select
                name="categoryId"
                onChange={handleChange}
                value={formData.categoryId}
                className="border w-full p-2 rounded"
              >

                <option>اختر التصنيف</option>

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}

              </select>



              <select
                name="tagId"
                onChange={handleChange}
                value={formData.tagId}
                className="border w-full p-2 rounded"
              >

                <option value="">التاج</option>

                {tags.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}

              </select>

            </div>


            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border rounded"
              >
                إلغاء
              </button>

              <button
                onClick={handleEditProduct}
                disabled={editLoading}
                className="px-4 py-2 bg-black text-white rounded flex items-center justify-center"
              >
                {editLoading ? "جاري الحفظ..." : "حفظ التعديلات"}
              </button>

            </div>

          </div>

        </div>

      )}

      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[400px] rounded-xl p-6 shadow-lg text-center">

            <h3 className="text-lg font-bold mb-4">
              هل أنت متأكد من حذف هذا المنتج؟
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
                onClick={handleDeleteProduct}
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