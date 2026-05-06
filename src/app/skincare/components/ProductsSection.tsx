'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Product } from '../page';
import { useRouter } from 'next/navigation';
import { base_url } from '@/Backend/api';
import { Eye, Search, X } from 'lucide-react';

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
}


const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void; delay: number }> = ({
  product,
  onAddToCart,
  delay,
}) => {
  const [added, setAdded] = useState(false);

  // const handleAdd = () => {
  //   onAddToCart(product);
  //   setAdded(true);
  //   setTimeout(() => setAdded(false), 1500);
  // };
  const handleAdd = () => {
  onAddToCart(product); 
  setAdded(true);
  setTimeout(() => setAdded(false), 1500);
};


  // const router = useRouter();
  
  // const handleClick = () => {
  //   setTimeout(() => {
  //     router.push('/ProductDetail');
  //   }, 300);
  // };
  const router = useRouter();

const handleView = () => {
  router.push(`/ProductDetail/${product.id}`);
};

  return (
    <div
    //  onClick={handleClick}
      className={` glass-card-dark rounded-4xl overflow-hidden product-card-hover `}
      style={{ transitionDelay: `${delay * 0.1}s`, animationDelay: `${delay * 0.4}s` }}
    >
      {/* Product image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
  <img
    src={product.image || product.imageUrl}
    alt={`صورة منتج ${product.name} - عبوة العناية بالبشرة`}
    className="w-full h-full object-cover transition-transform duration-700 scale-110"
    loading="lazy"
        />
        {/* Gradient overlay */}
     <div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(to top, rgba(61,31,45,0.25) 0%, transparent 60%)",
  }}
/>

{/* Badge + View Icon */}
<div className="absolute top-3 right-3 flex items-center gap-2">
  {product.badge && (
    <div
      className="px-3 py-1 rounded-full text-xs font-bold text-white font-cairo"
      style={{
        background: "linear-gradient(135deg, #C9708A, #9B72AA)",
        boxShadow: "0 4px 12px rgba(155, 114, 170, 0.4)",
      }}
    >
      {product.badge}
    </div>
  )}
</div>

  {/* Eye Icon */}
  {/* <button
    onClick={handleView}
    className="w-9 h-9 rounded-full hover:bg-white/30
hover:shadow-lg flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
    style={{
      background: 'rgba(255,255,255,0.2)',
      border: '1px solid rgba(255,255,255,0.3)',
    }}
    aria-label={`عرض تفاصيل ${product.name}`}
  >
    👁
  </button> */}
  <button
  onClick={handleView}
  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
  style={{
    background: 'linear-gradient(135deg, #C9708A, #9B72AA)',
        boxShadow: '0 4px 12px rgba(155, 114, 170, 0.4)',
   
  }}
  aria-label={`عرض تفاصيل ${product.name}`}
>
  <Eye size={20} color="#f5f5f5" /> {/* لون الأيقونة فوشيا/وردي واضح */}
</button>

</div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-cairo font-bold text-lg mb-2 leading-tight"
          style={{ color: 'var(--color-foreground)' }}
        >
          {product.name}
        </h3>
        <p
          className="font-cairo text-sm mb-4 leading-relaxed line-clamp-2"
          style={{ color: 'var(--color-muted)' }}
        >
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span
              className="relative font-cairo font-black text-xl gradient-text inline-block"
            >
              {product.oldPrice}

              <span className="absolute left-0 top-1/2 w-full h-[1px] bg-current -translate-y-1/2"></span>
            </span>

            <span
              className="font-cairo text-sm ml-2"
              style={{ color: 'var(--color-muted)' }}
            >
              جنية
            </span>
            <span
              className="font-cairo font-black text-xl gradient-text"
            >
              {product.price}
            </span>
            <span className="font-cairo text-sm ml-2" style={{ color: 'var(--color-muted)' }}>
              جنية
            </span>

          </div>

          <button
            onClick={handleAdd}
            className="font-cairo font-bold text-sm px-4 py-2.5 rounded-2xl transition-all duration-300"
            style={{
              background: added
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #C9708A, #9B72AA)',
              color: 'white',
              boxShadow: added
                ? '0 4px 16px rgba(16, 185, 129, 0.4)'
                : '0 4px 16px rgba(155, 114, 170, 0.35)',
              transform: added ? 'scale(0.97)' : 'scale(1)',
            }}
            aria-label={`إضافة ${product.name} إلى السلة`}
          >
            {added ? '✓ تمت الإضافة' : 'أضف إلى السلة'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection: React.FC<Props> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  product.description.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <section
      id="products"
      className="py-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg) 0%, #F5EEFF 50%, var(--color-bg) 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,112,138,0.3), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className=" flex justify-center ">
            <div className="section-label">
              <span>🌸</span>
              <span>مجموعتنا الفاخرة</span>
            </div>
          </div>
          <h2
            className=" delay-1 font-cairo font-black mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-foreground)',
              lineHeight: '1.15',
            }}
          >
            منتجاتنا{' '}
            <span className="gradient-text">المميزة</span>
          </h2>
          <p
            className=" delay-2 font-cairo text-base max-w-md mx-auto leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
           Soft.... Elegant... Unforgettable Glow <br/>
روتين كوري فاخر
يبرز أنوثتك … بهدوء وثقة 


          </p>
          {/* Search */}
<div className="mt-6 max-w-xl mx-auto">
  <div className="relative group">

    {/* Glow */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-fuchsia-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

    <div className="relative flex items-center bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg px-4 py-3">

      {/* Icon */}
      <Search className="text-gray-400 w-5 h-5 ml-2" />

      {/* Input */}
      <input
        type="text"
        placeholder="ابحثي عن منتج..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-transparent outline-none text-sm md:text-base placeholder-gray-400"
      />

      {/* Clear */}
      {searchTerm && (
        <button onClick={() => setSearchTerm('')}>
          <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
        </button>
      )}
    </div>
  </div>
</div>
        </div>

        {/* Products grid */}
       <div className="mt-8">
  {filteredProducts.length === 0 ? (
    <p className="text-center font-cairo text-lg text-gray-500">
      لا توجد نتائج مطابقة
    </p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          delay={i + 1}
        />
      ))}
    </div>
  )}
</div>

        
       
      </div>
    </section>
  );
};

export default ProductsSection;