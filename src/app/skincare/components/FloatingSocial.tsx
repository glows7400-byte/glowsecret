
// 'use client';
// import { useState } from "react";
// import { 
//   MessageCircle, 
//   Instagram, 
//   Facebook, 
//   Phone, 
//   X 
// } from "lucide-react";

// export default function FloatingSocial() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

//       {/* Social Icons */}
//       <div
//         className={`flex flex-col gap-3 transition-all duration-300 ${
//           open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
//         }`}
//       >
//         {/* Instagram */}
//         <a
//           href="https://www.instagram.com/__glowsecret_?igsh=N3gybDhmOTlnb2J5"
//           target="_blank"
//           className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
//           style={{ background: "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)" }}
//         >
//           <Instagram size={20} color="white" />
//         </a>

//         {/* TikTok (هنستخدم MessageCircle كحل مؤقت أو ممكن SVG لو عايزة اللوجو الرسمي) */}
//         <a
//           href="https://www.tiktok.com/@glowsecret27?_r=1&_t=ZS-94IgE6hbsay"
//           target="_blank"
//           className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
//         >
//           <img src="/assets/images/tik.png" className="w-5 h-5"/>
//         </a>

//         {/* Facebook */}
//         <a
//           href="https://www.facebook.com/share/1DYJPn3FoE/"
//           target="_blank"
//           className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
//         >
//           <Facebook size={20} color="white" />
//         </a>

//         {/* WhatsApp */}
//         <a
//           href="https://wa.me/201018340434"
//           target="_blank"
//           className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
//         >
//           <Phone size={20} color="white" />
//         </a>
//       </div>

//       {/* Chat Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
//         style={{
//           background: "linear-gradient(135deg,#C9708A,#9B72AA)",
//           color: "white",
//         }}
//       >
//         {open ? <X size={24} /> : <MessageCircle size={24} />}
//       </button>
//     </div>
//   );
// }
'use client';
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Instagram,
  Facebook,
  Phone,
  X
} from "lucide-react";
import { base_url } from "@/Backend/api";

interface SocialData {
  facebookUrl: string;
  instgramUrl: string;
  tiktokUrl: string;
  whatsAppUrl: string;
}

export default function FloatingSocial() {

  const [open, setOpen] = useState(false);

  const [data, setData] = useState<SocialData | null>(null);

  const fetchSocial = async () => {

    try {

      const res = await fetch(`${base_url}/api/ContactInfos`);
      const result = await res.json();

      if (result.isSuccess && result.data) {

        setData({
          facebookUrl: result.data.facebookUrl,
          instgramUrl: result.data.instgramUrl,
          tiktokUrl: result.data.tiktokUrl,
          whatsAppUrl: result.data.whatsAppUrl
        });

      }

    } catch (err) {

      console.error("Social fetch error", err);

    }

  };

  useEffect(() => {
    fetchSocial();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Social Icons */}

      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >

        {/* Instagram */}
        {data?.instgramUrl && (
          <a
            href={data.instgramUrl}
            target="_blank"
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
            style={{
              background:
                "linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)"
            }}
          >
            <Instagram size={20} color="white" />
          </a>
        )}

        {/* TikTok */}
        {data?.tiktokUrl && (
          <a
            href={data.tiktokUrl}
            target="_blank"
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <img src="/assets/images/tik.png" className="w-5 h-5" />
          </a>
        )}

        {/* Facebook */}
        {data?.facebookUrl && (
          <a
            href={data.facebookUrl}
            target="_blank"
            className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <Facebook size={20} color="white" />
          </a>
        )}

        {/* WhatsApp */}
        {data?.whatsAppUrl && (
          <a
            href={`https://wa.me/${data.whatsAppUrl}`}
            target="_blank"
            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <Phone size={20} color="white" />
          </a>
        )}

      </div>

      {/* Toggle Button */}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
        style={{
          background: "linear-gradient(135deg,#C9708A,#9B72AA)",
          color: "white",
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

    </div>
  );
}