 'use client';
 
 import { useState } from 'react';
 import { User, Phone, Mail, Briefcase, MapPin, CheckCircle } from 'lucide-react';
 import { useLanguage } from '@/src/context/LanguageContext';
 import { useAuth } from '@/app/context/AuthContext';
 import { useEffect } from 'react';
 import { useRouter } from 'next/navigation';
 
 export default function RegisterProvider() {
   const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && user.role === 'admin') {
      router.push('/admin');
    }
  }, [user, router]);
 
   const [formData, setFormData] = useState({
     name: '',
     phone: '',
     email: '',
     service: '',
     location: '',
     experience: '',
     description: '',
   });
 
   const [submitted, setSubmitted] = useState(false);
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value,
     });
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setSubmitted(true);
    const usersRaw = localStorage.getItem('users');
    const users = usersRaw ? JSON.parse(usersRaw) : {};
    users[formData.phone] = {
      role: 'provider',
      name: formData.name,
      phone: formData.phone,
    };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'provider');
    localStorage.setItem('currentUser', JSON.stringify({
      role: 'provider',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    }));
     setTimeout(() => {
       setSubmitted(false);
       setFormData({
         name: '',
         phone: '',
         email: '',
         service: '',
         location: '',
         experience: '',
         description: '',
       });
     }, 2000);
   };
 
   if (submitted) {
     return (
       <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center py-12">
         <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-white rounded-xl shadow-lg p-8">
             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
             <h2 className="text-2xl font-bold text-gray-900 mb-2">
               {t('regSuccessTitle')}
             </h2>
             <p className="text-gray-600">
               {t('regSuccessBody')}
             </p>
           </div>
         </div>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-8">
           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
             {t('registerTitle')}
           </h1>
           <p className="text-xl text-gray-600">
             {t('registerSubtitle')}
           </p>
         </div>
 
         <div className="bg-white rounded-xl shadow-lg p-8">
           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                 <User className="w-4 h-4 inline mr-2" />
                 {t('regFullNameLabel')}
               </label>
               <input
                 type="text"
                 id="name"
                 name="name"
                 required
                 value={formData.name}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                 placeholder={t('regFullNamePlaceholder')}
               />
             </div>
 
             <div>
               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                 <Phone className="w-4 h-4 inline mr-2" />
                 {t('regWhatsappLabel')}
               </label>
               <input
                 type="tel"
                 id="phone"
                 name="phone"
                 required
                 value={formData.phone}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                 placeholder={t('regWhatsappPlaceholder')}
               />
             </div>
 
             <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                 <Mail className="w-4 h-4 inline mr-2" />
                 {t('regEmailLabel')}
               </label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                 placeholder={t('regEmailPlaceholder')}
               />
             </div>
 
             <div>
               <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                 <Briefcase className="w-4 h-4 inline mr-2" />
                 {t('regServiceTypeLabel')}
               </label>
               <select
                 id="service"
                 name="service"
                 required
                 value={formData.service}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
               >
                 <option value="">{t('regServiceTypePlaceholder')}</option>
                 <option value="Tailoring">{t('regServiceTailoring')}</option>
                 <option value="Mehendi">{t('regServiceMehendi')}</option>
                 <option value="Cooking">{t('regServiceCooking')}</option>
                 <option value="Beauty Services">{t('regServiceBeauty')}</option>
                 <option value="Other">{t('regServiceOther')}</option>
               </select>
             </div>
 
             <div>
               <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                 <MapPin className="w-4 h-4 inline mr-2" />
                 {t('regLocationLabel')}
               </label>
               <input
                 type="text"
                 id="location"
                 name="location"
                 required
                 value={formData.location}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                 placeholder={t('regLocationPlaceholder')}
               />
             </div>
 
             <div>
               <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                 {t('regExperienceLabel')}
               </label>
               <input
                 type="number"
                 id="experience"
                 name="experience"
                 required
                 min="0"
                 value={formData.experience}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                 placeholder={t('regExperiencePlaceholder')}
               />
             </div>
 
             <div>
               <label htmlFor="description" className="block text.sm font-medium text-gray-700 mb-2">
                 {t('regAboutServiceLabel')}
               </label>
               <textarea
                 id="description"
                 name="description"
                 required
                 rows={4}
                 value={formData.description}
                 onChange={handleChange}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                 placeholder={t('regAboutServicePlaceholder')}
               />
             </div>
 
             <button
               type="submit"
               className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
             >
               {t('regSubmitBtn')}
             </button>
 
             <p className="mt-6 text-sm text-gray-500 text-center">
               {t('regDisclaimer')}
             </p>
           </form>
         </div>
       </div>
     </div>
   );
 }
