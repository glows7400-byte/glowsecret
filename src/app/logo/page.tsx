'use client';

import React, { useEffect, useState } from 'react';
import { base_url } from '@/Backend/api';
import Toast from '../skincare/components/Toast';

export default function LogoPage() {

    const [image, setImage] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const [toastMsg, setToastMsg] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    // ✅ GET image
    const fetchImage = async () => {
        try {
            const res = await fetch(`${base_url}/api/Images`);
            const data = await res.json();

            if (data.isSuccess && data.data.length > 0) {
                setImage(data.data[0]); // أول صورة (اللوجو)
            }
        } catch (err) {
            showToast('فشل تحميل الصورة');
        }
    };

    useEffect(() => {
        fetchImage();
    }, []);

    // ✅ Upload / Update
    const handleUpload = async () => {

        if (!file) {
            showToast('اختر صورة اولا');
            return;
        }

        const formData = new FormData();

        // 🔥 قيم ثابتة
        formData.append('Title', 'string');
        formData.append('Description', 'string');
        formData.append('Category', 'الوجه');
        formData.append('ImageCover', file);

        try {
            setLoading(true);

            const url = image
                ? `${base_url}/api/Images/${image.id}` // تعديل
                : `${base_url}/api/Images`; // إضافة

            const method = image ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                body: formData
            });

            const data = await res.json();

            if (data.isSuccess) {
                showToast('تم رفع الصورة بنجاح');
                setFile(null);
                fetchImage();
            } else {
                showToast('فشل رفع الصورة');
            }

        } catch (err) {
            showToast('حدث خطأ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6" style={{ direction: 'rtl' }}>

            <h2 className="text-xl font-bold mb-6">إدارة اللوجو</h2>

            {/* عرض الصورة الحالية */}
            {image && (
                <div className="mb-6">
                    <p className="mb-2 font-medium">اللوجو الحالي:</p>
                    <img
                        src={image.imageUrl}
                        alt="logo"
                        className="w-40 h-40 object-cover border rounded"
                    />
                </div>
            )}

            {/* اختيار صورة */}
            <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4"
            />

            {/* زر رفع */}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-black text-white px-6 py-2 rounded"
            >
                {loading ? 'جاري الرفع...' : 'رفع اللوجو'}
            </button>

            <Toast message={toastMsg} visible={toastVisible} />
        </div>
    );
}