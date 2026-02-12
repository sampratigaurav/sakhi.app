'use client';

import Link from 'next/link';
import { Home, LogIn, Search, UserPlus, Menu } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(!!user);
    setName(user?.name || '');
  }, [user]);

  const initials = (name || 'U')
    .split(' ')
    .map((n: string) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('') || 'U';

  const doLogout = () => {
    logout();
    setLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-[#F9F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#4A3B32' }}>
              SkillSakhi
            </span>
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 text-[#4A4A4A]"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-1 text-[#4A4A4A] hover:opacity-80 transition-colors px-3 py-2 rounded-md"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t('navHome')}</span>
            </Link>
            <Link
              href="/find-services"
              className="flex items-center space-x-1 text-[#4A4A4A] hover:opacity-80 transition-colors px-3 py-2 rounded-md"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t('navFindServices')}</span>
            </Link>

            <LanguageSelector />
            {user?.role === 'worker' && (
              <Link
                href="/learn"
                className="hidden sm:inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-3 py-2 text-sm text-[#4A4A4A] hover:bg-[#F6EAEA]"
                title="Learn & Grow"
              >
                Learn
              </Link>
            )}

            {!loggedIn ? (
              <Link
                href="/login"
                className="flex items-center space-x-1 text-[#4A4A4A] hover:opacity-80 transition-colors px-3 py-2 rounded-md"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">{t('loginBtn')}</span>
              </Link>
            ) : (
              <div className="relative flex items-center gap-2">
                <span className="hidden sm:inline text-[#4A4A4A]">Hi, {(name || 'User').split(' ')[0]}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C08081] text-white font-bold"
                  aria-label="Open user menu"
                >
                  {initials}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="px-4 py-2 text-sm text-[#4A4A4A] border-b border-gray-100">Hi, {(name || 'User').split(' ')[0]}</div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-[#4A4A4A] hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                      onClick={doLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {!loggedIn && (
              <Link
                href="/register"
                className="flex items-center space-x-1 bg-[#8F9E8B] text-white hover:opacity-90 transition-colors px-4 py-2 rounded-full"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'hi' ? 'पंजीकरण करें' : t('navRegister')}</span>
              </Link>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-8 z-50 transition-all duration-300">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-[#4A4A4A] font-semibold">
              Home
            </Link>
            <Link href="/find-services" onClick={() => setIsMenuOpen(false)} className="text-[#4A4A4A] font-semibold">
              Find Services
            </Link>
            {!loggedIn && (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-[#4A4A4A] font-semibold">
                Login
              </Link>
            )}
            {!loggedIn && (
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-3/4 inline-flex items-center justify-center rounded-full bg-[#8F9E8B] px-4 py-3 text-white font-semibold"
              >
                Register
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
