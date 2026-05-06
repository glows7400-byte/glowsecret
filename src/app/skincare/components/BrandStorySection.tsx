// 'use client';
// import React from 'react';

// const BrandStorySection = () => {
//   return (
//     <section
//       className="py-24 relative overflow-hidden"
//       style={{
//         background:
//           'linear-gradient(180deg, #F5EEFF 0%, var(--color-bg) 100%)',
//       }}
//     >
//       <div className="max-w-6xl mx-auto px-5">
//         <div className="grid md:grid-cols-2 gap-12 items-center">

//           {/* Image */}
//           <div className="relative reveal-left">
//             <img
//               src="/assets/images/brand-girl.jpg"
//               alt="فتاة تعبر عن جمال ونقاء منتجات العناية بالبشرة"
//               className="rounded-4xl shadow-2xl w-full object-cover"
//             />

//             <div
//               className="absolute inset-0 rounded-4xl"
//               style={{
//                 background:
//                   'linear-gradient(to top, rgba(61,31,45,0.25), transparent)',
//               }}
//             />
//           </div>

//           {/* Content */}
//           <div className="reveal">
//             <h2
//               className="font-cairo font-black mb-6"
//               style={{
//                 fontSize: 'clamp(1.8rem, 4vw, 3rem)',
//                 color: 'var(--color-foreground)',
//               }}
//             >
//               سر العناية{' '}
//               <span className="gradient-text">الحقيقية بالبشرة</span>
//             </h2>

//             <p
//               className="font-cairo text-base leading-relaxed mb-4"
//               style={{ color: 'var(--color-muted)' }}
//             >
//               منتجاتنا مصممة بعناية فائقة لتمنح بشرتك الترطيب،
//               النضارة، والحماية اليومية باستخدام أفضل المكونات الطبيعية.
//             </p>

//             <p
//               className="font-cairo text-base leading-relaxed mb-6"
//               style={{ color: 'var(--color-muted)' }}
//             >
//               في GlowSecret بنؤمن إن كل بنت ليها سرها الخاص… وسرّك هو إشراقتك
//               اخترنا لكِ أفضل منتجات العناية الكورية الأصلية بعناية وحب،
//               عشان بشرتك تحس بالهدوء، النعومة، والـ glow الطبيعي اللي يبان من غير مجهود
//               إحنا هنا عشان نخلي روتينك لحظة دلع يومية
//             </p>

//             <button
//               className="font-cairo font-bold px-6 py-3 rounded-2xl transition-all duration-300"
//               style={{
//                 background:
//                   'linear-gradient(135deg, #C9708A, #9B72AA)',
//                 color: 'white',
//                 boxShadow:
//                   '0 4px 16px rgba(155, 114, 170, 0.35)',
//               }}
//             >
//               اكتشفي روتينك المثالي
//             </button>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default BrandStorySection;
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BrandStorySection = () => {
  const images = [
    '/assets/images/brand-girl.jpeg',      
    '/assets/images/brand-girl-2.jpeg',   
   
  ];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5EEFF 0%, var(--color-bg) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Gallery */}
          <div className="relative reveal-left rounded-4xl shadow-2xl overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
              className="w-full h-full rounded-4xl"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`صورة ${index + 1}`}
                    className="w-full h-full object-cover rounded-4xl"
                  />
                  <div
                    className="absolute inset-0 rounded-4xl"
                    style={{
                      background: 'linear-gradient(to top, rgba(61,31,45,0.25), transparent)',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Content */}
          <div className="reveal">
            <h2
              className="font-cairo font-black mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: 'var(--color-foreground)',
              }}
            >
              سر العناية <span className="gradient-text">الحقيقية بالبشرة</span>
            </h2>

            <p className="font-cairo text-base leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
              منتجاتنا مصممة بعناية فائقة لتمنح بشرتك الترطيب،
              النضارة، والحماية اليومية باستخدام أفضل المكونات الطبيعية.
            </p>

            <p className="font-cairo text-base leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              في GlowSecret بنؤمن إن كل بنت ليها سرها الخاص… وسرّك هو إشراقتك
              اخترنا لكِ أفضل منتجات العناية الكورية الأصلية بعناية وحب،
              عشان بشرتك تحس بالهدوء، النعومة، والـ glow الطبيعي اللي يبان من غير مجهود
              إحنا هنا عشان نخلي روتينك لحظة دلع يومية
            </p>

            <button
              className="font-cairo font-bold px-6 py-3 rounded-2xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C9708A, #9B72AA)',
                color: 'white',
                boxShadow: '0 4px 16px rgba(155, 114, 170, 0.35)',
              }}
            >
              اكتشفي روتينك المثالي
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
