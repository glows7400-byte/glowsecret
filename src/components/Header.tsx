
'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { ChevronDown } from "lucide-react";
import { base_url } from '@/Backend/api';

interface HeaderProps {
  cartCount?: number;
  onCartOpen?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch(`${base_url}/api/Images`);
        const data = await res.json();

        console.log("LOGO DATA:", data);

        if (data.isSuccess && data.data?.length > 0) {
          console.log("IMAGE URL:", data.data[0]?.imageUrl);
          setLogo(data.data[0]?.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };

    fetchLogo();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${base_url}/api/Categories`);
        const data = await res.json();

        if (data.isSuccess) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);



  const navItems = [
    { label: 'الرئيسية', href: '/skincare' },
    {
      label: 'المنتجات',
      children: categories.map((cat) => ({
        label: cat.name,
        href: `/category/${cat.slug}`
      })),
    },
    { label: 'من نحن', href: '/AboutUs' },
    { label: 'سياسة الخصوصية', href: '/PrivacyPage' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDesktopProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(253, 244, 247, 0.9)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201, 112, 138, 0.15)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(124, 92, 138, 0.1)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Logo */}
        <AppLogo
          src={logo || undefined}
          text="Glow Secret"
          iconName=""
          size={54}
        />


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative" ref={menuRef}>
                <button
                  onClick={() => setDesktopProductsOpen(!desktopProductsOpen)}
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${desktopProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`absolute top-full right-0 mt-3 flex-col bg-white shadow-lg rounded-xl p-4 gap-3 min-w-[140px] transition-all duration-200 ${desktopProductsOpen ? 'flex opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
                    }`}
                >
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="text-sm font-medium hover:text-pink-500"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold"
                style={{ color: 'var(--color-muted)' }}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Right Side (Cart + Hamburger) */}
        <div className="flex items-center gap-4">

          {/* Cart Button */}
          <button
            onClick={onCartOpen}
            disabled={!onCartOpen}
            className="relative flex items-center gap-2 font-cairo font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(201,112,138,0.12), rgba(155,114,170,0.12))',
              border: '1.5px solid rgba(201, 112, 138, 0.3)',
              borderRadius: '50px',
              padding: '10px 20px',
              color: 'var(--color-primary)',
            }}
          >
            <span>السلة</span>
            <span className={`cart-badge ${cartCount > 0 ? 'visible' : ''}`}>
              {cartCount}
            </span>
          </button>

          {/* Hamburger - يظهر تحت md */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1"
            aria-label="فتح القائمة"
          >
            <span className="w-6 h-[2px] bg-[var(--color-primary)] transition-all"></span>
            <span className="w-6 h-[2px] bg-[var(--color-primary)] transition-all"></span>
            <span className="w-6 h-[2px] bg-[var(--color-primary)] transition-all"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
      > */}


      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col items-center gap-6 py-6 bg-white/95 backdrop-blur-xl shadow-md">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className={`flex flex-col items-center w-full ${productsOpen ? 'gap-3' : ''}`}>

                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="text-base font-medium flex items-center gap-2"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`flex flex-col items-center gap-3 transition-all duration-300 overflow-hidden ${productsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setProductsOpen(false);
                      }}
                      className="text-sm"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>

              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;