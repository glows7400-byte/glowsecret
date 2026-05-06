'use client';
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '../page';
import ProductsSection from './ProductsSection';
import FloatingSocial from './FloatingSocial';


interface Props {
  title: string;
  subtitle: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onCartOpen: () => void;
}

export default function CategoryPage({
  title,
  subtitle,
  products,
  onAddToCart,
  cartCount,
  onCartOpen,
}: Props) {

  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <>
      <div
        className="min-h-screen font-cairo"
        style={{ background: 'var(--color-bg)', direction: 'rtl' }}
      >
        <Header cartCount={cartCount} onCartOpen={onCartOpen} />

        <main className="pt-32">

          {/* Hero */}
          <div className="text-center mb-16 px-5">
            <h1 className="font-black text-4xl gradient-text mb-4">
              {title}
            </h1>
            <p className="text-[var(--color-muted)] max-w-xl mx-auto">
              {subtitle}
            </p>

            {/* 🔎 Search Bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="ابحثي عن منتجك المفضل..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 rounded-full glass-card-dark focus:outline-none text-sm"
              />
            </div>
          </div>

          <ProductsSection
            products={filteredProducts}
            onAddToCart={onAddToCart}
          />

        </main>

        <Footer />
      </div>

      <FloatingSocial />
    </>
  );
}