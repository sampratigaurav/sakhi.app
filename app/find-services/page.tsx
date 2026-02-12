'use client';

import { Mic, Star, MessageCircle, Search, MapPin, ShieldCheck, Heart, QrCode, X, CheckCircle, Share2, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import { providerReviews } from '../../data.js';
import { useServiceContext } from '@/app/context/ServiceContext';
import { useLanguage } from '@/app/context/LanguageContext';
import ReviewSection from '../components/ReviewSection';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/src/context/ToastContext';
import ServiceDetailModal from '../components/ServiceDetailModal';
import ServiceCard from '../components/ServiceCard';

export default function FindServices() {
  const { t, language } = useLanguage();
  const { show } = useToast();
  const { providers } = useServiceContext();
  const [showReviewsFor, setShowReviewsFor] = useState<number | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [detailProvider, setDetailProvider] = useState<any | null>(null);
  const [donateOpen, setDonateOpen] = useState(false);
  const [showVerifiedFor, setShowVerifiedFor] = useState<number | null>(null);
  const [showVerifiedDetail, setShowVerifiedDetail] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Services');
  const [sortBy, setSortBy] = useState<string>('Recommended');
  const [shareToast, setShareToast] = useState(false);
  const [shareToastMsg, setShareToastMsg] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(() => {
    const h = new Date().getHours();
    return h >= 9 && h < 19;
  });
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [portfolioPreview, setPortfolioPreview] = useState<string | null>(null);
  const [liveActivityVisible, setLiveActivityVisible] = useState(false);
  const [liveActivityMsg, setLiveActivityMsg] = useState('');

  useEffect(() => {
    try {
      const flag = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') : null;
      setLoggedIn(flag === 'true');
    } catch {
      setLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    let scheduleId: any;
    let showId: any;
    let hideId: any;
    const templates = [
      (p: any) => `Someone in ${p.location} just booked ${p.name}!`,
      (p: any) => `🎉 ${p.name} just received a ₹500 donation!`,
      (p: any) => `⚡ ${p.name} is now available in ${p.location}.`,
    ];
    const schedule = () => {
      const delay = 10000 + Math.floor(Math.random() * 5000);
      scheduleId = setTimeout(() => {
        const p = providers[Math.floor(Math.random() * providers.length)];
        const t = templates[Math.floor(Math.random() * templates.length)];
        setLiveActivityMsg(t(p));
        setLiveActivityVisible(true);
        showId = setTimeout(() => {
          setLiveActivityVisible(false);
          hideId = setTimeout(schedule, 600);
        }, 4000);
      }, delay);
    };
    schedule();
    return () => {
      clearTimeout(scheduleId);
      clearTimeout(showId);
      clearTimeout(hideId);
    };
  }, [providers]);
  useEffect(() => {
    const update = () => {
      const h = new Date().getHours();
      setIsOpenNow(h >= 9 && h < 19);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  const startListening = () => {
    try {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) {
        show('Voice search is not supported in this browser.', 'error');
        return;
      }
      const recognition = new SR();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || '';
        setQuery(transcript);
      };
      recognition.start();
    } catch {
      show('Voice search is not supported in this browser.', 'error');
      setIsListening(false);
    }
  };

  const locations = Array.from(new Set(providers.map((p: any) => p.location))).sort();
  const categories = Array.from(new Set(providers.map((p: any) => p.service)));
  const displayCategory = (c: string) => {
    if (c === 'Tailoring') return 'Tailor';
    if (c === 'Cooking') return 'Cook';
    if (c === 'Beauty Services') return 'Beautician';
    return c;
  };

  const filteredProviders = (() => {
    const q = query.trim().toLowerCase();
    let arr = providers.filter((p: any) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      const matchesLocation =
        selectedLocation === 'All Locations' || p.location === selectedLocation;
      const matchesCategory =
        selectedCategory === 'All Services' || p.service === selectedCategory;
      return matchesQuery && matchesLocation && matchesCategory;
    });
    if (sortBy === 'Price: Low to High') {
      arr = [...arr].sort((a: any, b: any) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === 'Rating: High to Low') {
      arr = [...arr].sort((a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return arr;
  })();
  
  const responseMinutesOf = (p: any) => {
    const v = Number(p.responseMinutes);
    if (v && v > 0) return v;
    const rnd = ((p.id || 1) * 37) % 120;
    return Math.max(5, rnd);
  };
  const responseLabel = (mins: number) => {
    if (mins < 30) return `⚡ Fast Responder · Typically replies in ${mins} mins`;
    if (mins >= 60) {
      const hrs = Math.round(mins / 60);
      return `🕒 Replies in ${hrs} hour${hrs > 1 ? 's' : ''}`;
    }
    return `🕒 Typically replies in ${mins} mins`;
  };
  const responseClass = (mins: number) =>
    mins < 30 ? 'text-green-700' : mins >= 60 ? 'text-gray-500' : 'text-[#4A4A4A]';
  const handleShare = async (provider: any) => {
    try {
      const shareData = {
        title: `Check out ${provider.name} on SkillSakhi!`,
        text: `I found this verified ${displayCategory(provider.service)} near you. Verified by HCF NGO.`,
        url: typeof window !== 'undefined' ? window.location.href : ''
      };
      if ((navigator as any).share) {
        await (navigator as any).share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareToastMsg('Link copied to clipboard!');
        setShareToast(true);
        setTimeout(() => setShareToast(false), 3000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
        setShareToastMsg('Link copied to clipboard!');
        setShareToast(true);
        setTimeout(() => setShareToast(false), 3000);
      } catch {}
    }
  };
  const portfolioImages = (service: string): string[] => {
    if (service === 'Tailoring' || service === 'Tailor') {
      return [
        'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520975669608-564d85ce4e0f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520975910301-f1c6f27bb8bd?q=80&w=600&auto=format&fit=crop',
      ];
    }
    if (service === 'Cooking' || service === 'Cook') {
      return [
        'https://images.unsplash.com/photo-1562967916-eb82221dfb36?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1543353071-873f17a7a5c0?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604908176997-28cfe2e62c54?q=80&w=600&auto=format&fit=crop',
      ];
    }
    if (service === 'Mehendi' || service === 'Beauty Services' || service === 'Beautician') {
      return [
        'https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1592878849129-8d6b0dff78ea?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1603570419981-65475f6bf8af?q=80&w=600&auto=format&fit=crop',
      ];
    }
    if (service === 'Nanny' || service === 'Care') {
      return [
        'https://images.unsplash.com/photo-1516728778615-2d590ea1856f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1533134486753-c8333f0b4d47?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520975910301-f1c6f27bb8bd?q=80&w=600&auto=format&fit=crop',
      ];
    }
    return [
      'https://images.unsplash.com/photo-1543353071-873f17a7a5c0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562967916-eb82221dfb36?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=600&auto=format&fit=crop',
    ];
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-[#F9F4EF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif text-center mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
            {t('findTitle')}
          </h1>
        </div>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4A4A4A] w-6 h-6" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-16 pr-16 py-6 border border-stone-200 rounded-full bg-white text-[#4A4A4A] shadow-xl focus:ring-2 focus:ring-[#C08081] focus:border-transparent transition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={startListening}
                aria-label="Voice search"
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >
                <Mic className={`h-6 w-6 ${isListening ? 'text-red-600 animate-pulse' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2">
            {[
              { label: 'All', value: 'All Services' },
              { label: '🧵 Tailor', value: 'Tailoring' },
              { label: '🍳 Cook', value: 'Cooking' },
              { label: '💄 Beauty', value: 'Beauty Services' },
              { label: '👶 Nanny', value: 'Nanny' },
              { label: '🏥 Care', value: 'Care' },
            ].map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => {
                  if (chip.value === 'Nanny' || chip.value === 'Care') {
                    setSelectedCategory('All Services');
                    setQuery(chip.label.replace(/^[^A-Za-z]+\s*/, ''));
                  } else {
                    setSelectedCategory(chip.value);
                    setQuery('');
                  }
                }}
                className={`rounded-full px-5 py-2 text-sm ${
                  selectedCategory === chip.value
                    ? 'bg-[#C08081] text-white'
                    : 'bg-white border border-stone-300 text-[#4A4A4A]'
                }`}
              >
                {chip.label}
              </button>
            ))}
              <div className="ml-auto relative">
                <button
                  type="button"
                  onClick={() => setShowSortMenu((v) => !v)}
                  className="rounded-full px-4 py-2 text-sm bg-white border border-stone-300 text-[#4A4A4A]"
                  title="Sort"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-stone-200 shadow-xl p-2 z-50">
                    {['Recommended', 'Price: Low to High', 'Rating: High to Low'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setSortBy(opt);
                          setShowSortMenu(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg ${
                          sortBy === opt ? 'bg-[#F6EAEA] text-[#C08081]' : 'hover:bg-gray-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        

        {/* Service Provider Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
          {filteredProviders.map((provider, idx) => (
            <div
              key={provider.id}
              onClick={() => {
                setDetailProvider(provider);
                setDonateOpen(false);
              }}
              className="group bg-white rounded-3xl shadow-sm cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden pointer-events-auto"
              style={{ animation: 'fade-up-enter 0.4s ease-out both', animationDelay: `${(idx % 3) * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                <Image
                  src={provider.image}
                  alt={provider.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(provider);
                  }}
                  className="absolute top-3 right-3 rounded-full bg-white border border-gray-200 p-2 text-[#4A4A4A] shadow-sm hover:bg-gray-50"
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <div className={`absolute ${isOpenNow ? 'text-green-700' : 'text-red-700'} top-12 right-3 rounded-full bg-white border border-gray-200 px-2 py-1 text-xs shadow-sm`}>
                  {isOpenNow ? '🟢 Available Now' : '🔴 Opens at 9 AM'}
                </div>
                <div className="absolute top-3 left-3">
                  <div className="relative inline-block">
                    {provider.verified && (
                    <button
                      type="button"
                      onMouseEnter={() => setShowVerifiedFor(provider.id)}
                      onMouseLeave={() => setShowVerifiedFor((id) => (id === provider.id ? null : id))}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVerifiedFor((id) => (id === provider.id ? null : provider.id));
                      }}
                      className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold rounded-full px-2 py-0.5"
                      title="Verified by HCF NGO"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      HCF Verified
                    </button>
                    )}
                    {provider.verified && showVerifiedFor === provider.id && (
                      <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-green-200 bg-white text-green-800 shadow-md p-3 z-50">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="h-4 w-4" />
                          <span className="font-semibold">Verified by HCF NGO</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Aadhar ID Verified</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Home Visit Completed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Police Verification Clear</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Skill Test Passed</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
                    {provider.name}
                  </h3>
                  <span
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      provider.service === 'Beauty Services'
                        ? 'bg-[#F6EAEA] text-[#C08081]'
                        : provider.service === 'Cooking'
                        ? 'bg-[#E8F3E8] text-[#4A4A4A]'
                        : 'bg-[#EEE9E5] text-[#4A4A4A]'
                    }`}
                  >
                    {displayCategory(provider.service)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-[#C08081]" />
                    <span className="ml-1 font-semibold text-[#4A4A4A]">
                      {provider.rating}
                    </span>
                    <span className="ml-3 text-[#4A4A4A] text-sm">📍 {(((provider.id || 1) * 7) % 5) + 1}km</span>
                    {(() => {
                      const mins = responseMinutesOf(provider);
                      const fast = mins < 10 ? '<10 mins' : `${mins} mins`;
                      return <span className="ml-3 text-[#4A4A4A] text-sm">⚡ {fast}</span>;
                    })()}
                  </div>
                  <div className="flex items-center gap-3">
                    <ServiceCard
                      provider={provider}
                      onShowReviews={(p) => {
                        setDetailProvider(p);
                        setDonateOpen(false);
                      }}
                      onBook={() => {}}
                    />
                    <div className="flex items-center text-[#C08081] font-semibold">
                      <span>₹{provider.price}</span>
                    </div>
                  </div>
                </div>
                

                {loggedIn ? (
                  <a
                    href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${provider.name}, I saw your profile on SkillSakhi and want to book your ${provider.service} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border-2 border-[#C08081] text-[#C08081] rounded-full font-semibold hover:bg-[#C08081] hover:text-white transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('bookBtn')}
                  </a>
                ) : (
                  <Link
                    href="/login"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border-2 border-[#8F9E8B] text-[#4A4A4A] rounded-full font-semibold hover:bg-[#8F9E8B] hover:text-white transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('loginBtn')}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no results) */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {t('emptyStateNoProviders')}
            </p>
          </div>
        )}
      </div>
      {showReviewsFor !== null && (() => {
        const rp = providers.find((p: any) => p.id === showReviewsFor);
        if (!rp) return null;
        const list = (rp.reviewsList ?? []) as Array<{ name: string; rating: number; comment: string; date?: string }>;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold" style={{ color: '#4A4A4A', fontFamily: 'Playfair Display, serif' }}>
                  {`What neighbors say about ${rp.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowReviewsFor(null)}
                  className="rounded-md border border-gray-200 bg-white p-2 text-[#4A4A4A] hover:bg-gray-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {list.length === 0 ? (
                  <p className="text-sm text-[#4A4A4A]">No reviews yet.</p>
                ) : (
                  list.map((r, idx) => {
                    const initial = (r.name || 'U')[0]?.toUpperCase() || 'U';
                    return (
                      <div key={`${rp.id}-${idx}`} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="h-9 w-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EDEFE9', color: '#C08081' }}>
                          <span className="font-bold">{initial}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold" style={{ color: '#4A4A4A' }}>{r.name}</p>
                            <span className="text-xs" style={{ color: '#4A4A4A' }}>{r.date || ''}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={`h-4 w-4 ${i <= r.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="mt-2 text-sm" style={{ color: '#4A4A4A' }}>{r.comment}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })()}
      {shareToast && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center px-4 z-50">
          <div className="flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 shadow-lg">
            <span className="font-semibold">{shareToastMsg}</span>
          </div>
        </div>
      )}
      <ServiceDetailModal
        isOpen={!!detailProvider}
        provider={detailProvider}
        onClose={() => setDetailProvider(null)}
        onPreview={(url) => setPortfolioPreview(url)}
        loggedIn={loggedIn}
      />
      {portfolioPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4" onClick={() => setPortfolioPreview(null)}>
          <div className="relative w-full max-w-3xl">
            <Image
              src={portfolioPreview}
              alt="Portfolio Preview"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPortfolioPreview(null);
              }}
              className="absolute top-4 right-4 rounded-md border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      {liveActivityMsg && (
        <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${liveActivityVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} pointer-events-none`}>
          <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg px-4 py-3 text-[#4A4A4A]">
            <span className="text-sm font-semibold">{liveActivityMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
