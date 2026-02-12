 'use client';
 
 import { useEffect, useState } from 'react';
 import { createPortal } from 'react-dom';
 import Image from 'next/image';
 import Link from 'next/link';
 import { ShieldCheck, Heart, QrCode, X, CheckCircle, MessageCircle, Star } from 'lucide-react';
 import { useLanguage } from '@/src/context/LanguageContext';
 
 type Provider = {
   id: number;
   name: string;
   location: string;
   service: string;
   description?: string;
   image: string;
   phone: string;
   goalTitle?: string;
   goalAmount?: number;
   currentGoal?: number;
  verified?: boolean;
 };
 
 type Props = {
   isOpen: boolean;
   onClose: () => void;
   provider: Provider | null;
   onPreview: (url: string) => void;
   loggedIn: boolean;
 };
 
 export default function ServiceDetailModal({ isOpen, onClose, provider, onPreview, loggedIn }: Props) {
   const [mounted, setMounted] = useState(false);
  const [showVerifiedDetail, setShowVerifiedDetail] = useState(false);
   const [donateOpen, setDonateOpen] = useState(false);
   const { t, language } = useLanguage();
 
   useEffect(() => {
     setMounted(true);
   }, []);
 
   useEffect(() => {
     if (!mounted) return;
     if (isOpen) {
       document.body.style.overflow = 'hidden';
     }
     return () => {
       document.body.style.overflow = 'unset';
     };
   }, [mounted, isOpen]);
 
   if (!mounted || !isOpen || !provider) return null;
 
   const displayCategory = (c: string) => {
     if (c === 'Tailoring') return 'Tailor';
     if (c === 'Cooking') return 'Cook';
     if (c === 'Beauty Services') return 'Beautician';
     return c;
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
 
   return createPortal(
     <>
       <div className="fixed inset-0 z-[90] bg-black/50" onClick={onClose} />
       <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
         <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
           <div className="flex flex-col md:flex-row">
             <div className="md:w-1/2 relative">
               <Image
                 src={provider.image}
                 alt={provider.name}
                 width={800}
                 height={600}
                 className="h-64 md:h-full w-full object-cover object-top"
               />
               {provider.verified && (
                 <div className="absolute top-3 left-3">
                   <div className="relative inline-block">
                     <button
                       type="button"
                       onMouseEnter={() => setShowVerifiedDetail(true)}
                       onMouseLeave={() => setShowVerifiedDetail(false)}
                       onClick={() => setShowVerifiedDetail((v) => !v)}
                       className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold rounded-full px-2 py-0.5"
                     >
                       <ShieldCheck className="w-3.5 h-3.5" />
                       Verified
                     </button>
                     {showVerifiedDetail && (
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
               )}
             </div>
             <div className="md:w-1/2 p-6">
               <div className="flex items-start justify-between">
                 <div>
                   <h3 className="text-2xl font-bold text-gray-900">{provider.name}</h3>
                   <p className="text-sm text-gray-600">{provider.location}</p>
                 </div>
                 <button
                   type="button"
                   onClick={onClose}
                   className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50"
                  aria-label="Close service details"
                 >
                   <X className="h-5 w-5" />
                 </button>
               </div>
               <div className="mt-4 text-gray-700">
                 <p className="text-sm">
                   {provider.description || 'Passionate local professional dedicated to quality and trust.'}
                 </p>
               </div>
               <div className="mt-6 rounded-xl border border-gray-200 p-4">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                     <Heart className="h-5 w-5 text-orange-600" />
                   </div>
                   <span className="font-semibold text-gray-900">
                     {provider.goalTitle || (language === 'hi' ? 'सिलाई मशीन के लिए बचत' : 'Saving for a Sewing Machine')}
                   </span>
                 </div>
                 {(() => {
                   const target = Number(provider.goalAmount) || 8000;
                   const current = Number(provider.currentGoal) || Math.round(target * 0.35);
                   const percent = Math.min(100, Math.round((current / target) * 100));
                   return (
                     <>
                       <div className="flex items-center justify-between mb-2">
                         <span className="text-sm font-medium text-gray-700">
                           ₹{current.toLocaleString()} / ₹{target.toLocaleString()}
                         </span>
                         <span className="text-sm font-bold text-green-700">{percent}%</span>
                       </div>
                       <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                         <div
                           className="h-full bg-gradient-to-r from-green-500 to-orange-500 rounded-full"
                           style={{ width: `${percent}%` }}
                         />
                       </div>
                     </>
                   );
                 })()}
                 <div className="mt-4 flex flex-col sm:flex-row gap-2">
                   <button
                     type="button"
                     onClick={() => setDonateOpen(true)}
                     className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-white font-semibold hover:bg-pink-700"
                   >
                     ❤️ Donate to her Goal
                   </button>
                   {loggedIn ? (
                     <a
                       href={`https://wa.me/${provider.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${provider.name}, I saw your profile on SkillSakhi and want to book your ${provider.service} service.`)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
                     >
                       <MessageCircle className="w-5 h-5 mr-2" />
                       {t('bookBtn')}
                     </a>
                   ) : (
                     <Link
                       href="/login"
                       className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
                     >
                       <MessageCircle className="w-5 h-5 mr-2" />
                       Login to Book
                     </Link>
                   )}
                 </div>
               </div>
               <div className="mt-6">
                 <h4 className="text-lg font-semibold text-gray-900">My Work Gallery 📸</h4>
                 <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
                   {portfolioImages(displayCategory(provider.service)).map((src, idx) => (
                     <button
                       key={`${provider.id}-pf-${idx}`}
                       type="button"
                       onClick={() => onPreview(src)}
                       className="shrink-0"
                       aria-label="View portfolio image"
                     >
                       <Image
                         src={src}
                        alt="Portfolio sample"
                         width={96}
                         height={96}
                         className="w-24 h-24 rounded-lg object-cover"
                       />
                     </button>
                   ))}
                 </div>
               </div>
             </div>
           </div>
           {donateOpen && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6">
               <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                 <div className="flex items-center justify-between mb-4">
                   <h4 className="text-lg font-semibold text-gray-900">Support {provider.name}</h4>
                   <button
                     type="button"
                     onClick={() => setDonateOpen(false)}
                     className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50"
                   >
                     <X className="h-5 w-5" />
                   </button>
                 </div>
                 <div className="text-center">
                   <div className="inline-flex items-center justify-center rounded-xl bg-gray-100 p-4">
                     <QrCode className="h-24 w-24 text-gray-700" />
                   </div>
                   <p className="mt-4 text-sm text-gray-700">Scan to pay directly to {provider.name} via UPI</p>
                   <p className="mt-1 text-xs text-gray-500">100% of this donation goes to her.</p>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </>,
     document.body
   );
 }
