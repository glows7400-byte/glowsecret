// 'use client';
// import React from 'react';

// const EidBanner = () => {
//   return (
   
//           <div className="relative w-full flex justify-center ">
//             <img
//               src="/assets/images/banner2.png" 
//               alt="Eid Offers"
//               className="w-full object-contain drop-shadow-2xl h-[400px]"
//             />
//           </div>
       
//   );
// };

// export default EidBanner;
'use client';
import React from 'react';

const EidBanner = () => {
  return (
    <div className="relative w-full">
      <img
        src="/assets/images/banner.png"
        alt="Eid Offers"
        className="w-full object-cover drop-shadow-2xl h-[120px] sm:h-[250px] md:h-[320px] lg:h-[300px]"
      />
    </div>
  );
};

export default EidBanner;