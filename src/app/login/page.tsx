'use client';

import React, { useState } from "react";
import { base_url } from "@/Backend/api";
import Toast from "../skincare/components/Toast";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };


 const handleLogin = async () => {

  if (!email || !password) {
    showToast("يرجى إدخال البريد الإلكتروني وكلمة المرور");
    return;
  }

  setLoading(true);

  try {

    const res = await fetch(`${base_url}/api/Accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();

    if (res.ok) {

      showToast("تم تسجيل الدخول بنجاح");

      // تخزين التوكن
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setTimeout(() => {
        window.location.href = "/Dashboard";
      }, 800);

    } else {

      showToast(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");

    }

  } catch (error) {

    showToast("حدث خطأ أثناء تسجيل الدخول");

  } finally {

    setLoading(false);

  }

};



  return (

    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 font-cairo"
      style={{ direction: "rtl" }}
    >

      <div className="bg-white w-[700px] p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">
         لوحة تسجيل الدخول 
        </h2>
        <h2 className="text-2xl font-bold text-center mb-10">
        Glow Secret
        </h2>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="border w-full p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            className="border w-full p-3 rounded-lg "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white mt-4 py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

        </div>

      </div>

      <Toast message={toastMsg} visible={toastVisible} />

    </div>

  );

}