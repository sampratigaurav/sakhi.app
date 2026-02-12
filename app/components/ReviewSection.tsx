 'use client';
 
 import { useState } from 'react';
 import { Star, CheckCircle, X } from 'lucide-react';
 import { useLanguage } from '@/src/context/LanguageContext';
 
 type Review = {
   name: string;
   rating: number;
   comment: string;
   date?: string;
 };
 
 type Props = {
   providerId: number;
   initialReviews: Review[];
   onClose?: () => void;
 };
 
 export default function ReviewSection({ providerId, initialReviews, onClose }: Props) {
   const { t } = useLanguage();
   const [reviews, setReviews] = useState<Review[]>(initialReviews ?? []);
   const [name, setName] = useState('');
   const [rating, setRating] = useState<number>(0);
   const [comment, setComment] = useState('');
   const [success, setSuccess] = useState(false);
 
   const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       if (!name || !rating || !comment) return;
       const newReview: Review = {
         name,
         rating,
         comment,
         date: new Date().toISOString(),
       };
       setReviews([newReview, ...reviews]);
       setName('');
       setRating(0);
       setComment('');
       setSuccess(true);
       setTimeout(() => setSuccess(false), 2000);
   };
 
   return (
     <div className="w-full">
       <div className="flex items-center justify-between mb-4">
         <h3 className="text-xl font-bold text-gray-900">{t('reviewsTitle')}</h3>
         {onClose && (
           <button
             type="button"
             onClick={onClose}
             className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
           >
             <X className="h-4 w-4" />
             <span>{t('closeBtn')}</span>
           </button>
         )}
       </div>
 
       {success && (
         <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-green-700">
           <CheckCircle className="h-5 w-5" />
           <span>{t('reviewSubmittedMsg')}</span>
         </div>
       )}
 
       <div className="space-y-4 mb-6">
         {reviews.length === 0 ? (
           <p className="text-gray-500">{t('noReviews')}</p>
         ) : (
           reviews.map((r, idx) => (
             <div
               key={`${providerId}-${idx}-${r.name}`}
               className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
             >
               <div className="flex items-start justify-between">
                 <div>
                   <p className="font-semibold text-gray-900">{r.name}</p>
                   <div className="flex items-center mt-1">
                     {[1, 2, 3, 4, 5].map((i) => (
                       <Star
                         key={i}
                         className={`h-4 w-4 ${i <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                       />
                     ))}
                   </div>
                 </div>
               </div>
               <p className="mt-2 text-gray-700 text-sm">{r.comment}</p>
             </div>
           ))
         )}
       </div>
 
       <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
         <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('addReviewTitle')}</h4>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">{t('nameLabel')}</label>
             <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">{t('ratingLabel')}</label>
             <div className="flex items-center gap-1">
               {[1, 2, 3, 4, 5].map((i) => (
                 <button
                   key={i}
                   type="button"
                   onClick={() => setRating(i)}
                   className="p-1"
                   aria-label={`rate-${i}`}
                 >
                   <Star className={`h-6 w-6 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                 </button>
               ))}
               <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
             </div>
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">{t('commentLabel')}</label>
             <textarea
               rows={3}
               value={comment}
               onChange={(e) => setComment(e.target.value)}
               className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
             />
           </div>
           <button
             type="submit"
             className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white shadow-sm hover:bg-orange-600"
           >
             {t('submitReviewBtn')}
           </button>
         </form>
       </div>
     </div>
   );
 }
