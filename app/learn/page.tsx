 'use client';
 
 import { useEffect, useState } from 'react';
 import { useRouter } from 'next/navigation';
 import { Sparkles, PlayCircle } from 'lucide-react';
 import Link from 'next/link';
 import { useAuth } from '@/app/context/AuthContext';
 
 export default function Learn() {
   const { user } = useAuth();
   const router = useRouter();
   const [points, setPoints] = useState(0);
   const [showConfetti, setShowConfetti] = useState(false);
   const key = user?.phone ? `skill_points_${user.phone}` : 'skill_points';
 
   useEffect(() => {
     if (!user || user.role !== 'worker') {
       router.push('/login');
       return;
     }
     try {
       const saved = localStorage.getItem(key);
       setPoints(saved ? parseInt(saved, 10) || 0 : 0);
     } catch {
       setPoints(0);
     }
   }, [user, router, key]);
 
   const markCompleted = async () => {
     const next = points + 50;
     setPoints(next);
     try {
       localStorage.setItem(key, String(next));
     } catch {}
     setShowConfetti(true);
     setTimeout(() => setShowConfetti(false), 1000);
   };
 
   const VideoCard = ({
     title,
     src,
   }: {
     title: string;
     src: string;
   }) => (
     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
       <div className="aspect-video w-full bg-[#EDEFE9] flex items-center justify-center">
         <iframe
           className="w-full h-full"
           src={src}
           title={title}
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
           allowFullScreen
         ></iframe>
       </div>
       <div className="p-4">
         <div className="flex items-center gap-2 mb-3">
           <PlayCircle className="h-5 w-5 text-[#C08081]" />
           <h3 className="text-lg font-semibold" style={{ color: '#4A4A4A' }}>{title}</h3>
         </div>
         <button
           type="button"
           onClick={markCompleted}
           className="inline-flex items-center gap-2 rounded-full bg-[#C08081] px-4 py-2 text-white font-semibold hover:opacity-90"
         >
           ❤️ Mark as Completed (+50)
         </button>
       </div>
     </div>
   );
 
   return (
     <div className="min-h-screen bg-[#FDFBF7] py-12">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-8 flex items-center justify-between">
           <div>
             <h1 className="text-3xl sm:text-4xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#4A4A4A' }}>
               Upgrade Your Skills 🚀
             </h1>
             <p className="text-sm" style={{ color: '#4A4A4A' }}>
               Watch curated tutorials and grow your craft. Each completion adds +50 points.
             </p>
           </div>
           <div className="rounded-xl bg-white border border-gray-200 shadow-sm px-4 py-3 text-center">
             <div className="text-xs" style={{ color: '#4A4A4A' }}>Skill Points</div>
             <div className="text-2xl font-bold" style={{ color: '#C08081' }}>{points}</div>
           </div>
         </div>
 
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <VideoCard
             title="Advanced Blouse Cutting Techniques"
             src="https://www.youtube.com/embed/9bZkp7q19f0?rel=0"
           />
           <VideoCard
             title="Hygiene & Safety for Home Cooks"
             src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
           />
           <VideoCard
             title="Bridal Mehendi Designs 2024"
             src="https://www.youtube.com/embed/aqz-KE-bpKQ?rel=0"
           />
           <VideoCard
             title="Tailoring Best Practices"
             src="https://www.youtube.com/embed/oHg5SJYRHA0?rel=0"
           />
         </div>
 
         <div className="mt-10">
           <Link
             href="/dashboard"
             className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-[#4A4A4A] hover:bg-[#F6EAEA]"
           >
             ← Back to Dashboard
           </Link>
         </div>
       </div>
 
       {showConfetti && (
         <div className="pointer-events-none fixed inset-0 z-40">
           <div className="absolute top-10 left-10 text-pink-500">
             <Sparkles className="h-8 w-8" />
           </div>
           <div className="absolute top-20 right-16 text-yellow-500">
             <Sparkles className="h-10 w-10" />
           </div>
           <div className="absolute bottom-24 left-1/3 text-green-500">
             <Sparkles className="h-8 w-8" />
           </div>
           <div className="absolute bottom-12 right-1/4 text-blue-500">
             <Sparkles className="h-9 w-9" />
           </div>
         </div>
       )}
     </div>
   );
 }
