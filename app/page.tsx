'use client';

import Link from 'next/link';
import { ArrowRight, Search, Star, MessageCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  // const user = { role: 'admin', name: 'HCF Manager' };
  const [simulateAdmin, setSimulateAdmin] = useState(false);
  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      const adminParam = qs.get('admin');
      const ls = localStorage.getItem('simulateAdmin');
      setSimulateAdmin(adminParam === '1' || ls === 'true');
    } catch {}
  }, []);
  const isAdmin = (user?.role === 'admin') || simulateAdmin;

  return (
    <div className="min-h-screen bg-[#F9F4EF]">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] min-h-[300px] flex items-center overflow-hidden bg-[#F9F4EF] pt-24">
        <img
          src="/hero-banner.jpg.jpeg"
          alt="SkillSakhi Hero"
          className="absolute inset-0 w-full h-full object-cover object-[80%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F4EF] via-[#F9F4EF]/80 to-transparent w-full md:w-[65%]" />
        <div className="relative z-10 max-w-2xl px-6 md:px-12">
          <h1 className="text-5xl md:text-7xl font-serif text-[#4A3B32] leading-tight">
            Empowering Women, One Skill at a Time
          </h1>
          <p className="text-lg text-[#6D5D53] mt-6 mb-8 max-w-md">
            Find verified local talent for tailoring, cooking, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/find-services"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#C06C5D] text-white rounded-full font-semibold hover:opacity-90 transition-all"
            >
              Find Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            {user?.role === 'worker' ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#BCA488] text-[#5C4D46] rounded-full font-semibold hover:bg-white/40 transition-all"
              >
                Go to Dashboard
              </Link>
            ) : user?.role === 'customer' ? null : (
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#BCA488] text-[#5C4D46] rounded-full font-semibold hover:bg-white/40 transition-all"
              >
                {language === 'hi' ? 'पंजीकरण करें' : 'Register as Provider'}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#FDFBF7]">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ color: '#4A4A4A', fontFamily: 'Playfair Display, serif' }}>
            {t('howItWorksTitle')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
            {t('howItWorksSubtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#EDEFE9] rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-[#8F9E8B]" />
            </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('howStep1Title')}
              </h3>
              <p style={{ color: '#4A4A4A' }}>
                {t('howStep1Body')}
              </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#EDEFE9] rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-[#8F9E8B]" />
            </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('howStep2Title')}
              </h3>
              <p style={{ color: '#4A4A4A' }}>
                {t('howStep2Body')}
              </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-[#EDEFE9] rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-[#8F9E8B]" />
            </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('howStep3Title')}
              </h3>
              <p style={{ color: '#4A4A4A' }}>
                {t('howStep3Body')}
              </p>
          </div>
        </div>
      </section>

      {/* Top Sakhis Section */}
      <section className="bg-[#FDFBF7] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
              Top Sakhis of the Month
            </h2>
            <span className="rounded-full bg-white border border-stone-300 px-3 py-1 text-sm text-[#C08081]">🏆 Super Sakhis</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              { name: 'Sunita D.', achievement: 'Earned ₹12,000 this month!', color: '#D4AF37' },
              { name: 'Meera P.', achievement: 'Completed 15 Jobs', color: '#C0C0C0' },
              { name: 'Lakshmi N.', achievement: 'Earned ₹9,500 this month!', color: '#CD7F32' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="min-w-[240px] bg-white rounded-2xl shadow-sm border-2 p-4"
                style={{ borderColor: s.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EDEFE9', color: '#C08081' }}>
                    <span className="font-bold">{s.name.split(' ')[0][0]}</span>
                  </div>
                  <span className="text-xs rounded-full bg-[#F6EAEA] text-[#C08081] px-2 py-1">🏆 Super Sakhi</span>
                </div>
                <div className="font-semibold" style={{ color: '#4A4A4A' }}>{s.name}</div>
                <div className="text-sm mt-1" style={{ color: '#4A4A4A' }}>{s.achievement}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
              {t('featuresTitle')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#C08081] mx-auto mb-4" />
              <h3 className="mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('featureVerifiedTitle')}
              </h3>
              <p className="text-sm" style={{ color: '#4A4A4A' }}>
                {t('featureVerifiedBody')}
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#8F9E8B] mx-auto mb-4" />
              <h3 className="mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('featureEasyBookingTitle')}
              </h3>
              <p className="text-sm" style={{ color: '#4A4A4A' }}>
                {t('featureEasyBookingBody')}
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#C08081] mx-auto mb-4" />
              <h3 className="mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('featureSupportWomenTitle')}
              </h3>
              <p className="text-sm" style={{ color: '#4A4A4A' }}>
                {t('featureSupportWomenBody')}
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#8F9E8B] mx-auto mb-4" />
              <h3 className="mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                {t('featureTrustedTitle')}
              </h3>
              <p className="text-sm" style={{ color: '#4A4A4A' }}>
                {t('featureTrustedBody')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
            {t('ctaReadyTitle')}
          </h2>
          <p className="text-xl mb-8" style={{ color: '#4A4A4A' }}>
            {t('ctaReadySubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/find-services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#C08081] rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-sm"
            >
              {t('ctaFindServicesBtn')}
            </Link>
            {user?.role === 'worker' ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#8F9E8B] text-white rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-sm"
              >
                Go to Dashboard
              </Link>
            ) : user?.role === 'customer' ? null : (
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#8F9E8B] text-white rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-sm"
              >
                {t('ctaRegisterNowBtn')}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
