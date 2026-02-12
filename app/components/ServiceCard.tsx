 'use client';
 
 import React from 'react';
 
 type Props = {
   provider: any;
   onShowReviews?: (provider: any) => void;
   onBook?: (provider: any) => void;
 };
 
 export default function ServiceCard({ provider, onShowReviews, onBook }: Props) {
   return (
     <button
       onClick={(e) => {
         e.preventDefault();
         e.stopPropagation();
         console.log('Reviews clicked for:', provider?.name);
         onShowReviews && onShowReviews(provider);
       }}
       className="relative z-20 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
     >
       View Reviews
     </button>
   );
 }
