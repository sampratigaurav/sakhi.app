 'use client';
 
 import { useEffect, useState } from 'react';
 import { useRouter } from 'next/navigation';
 import { CheckCircle, User, Phone, Mail, CalendarCheck, BadgeCheck, Wallet, ClipboardList } from 'lucide-react';
 
 type UserRole = 'customer' | 'provider' | 'admin';
 
 export default function Profile() {
   const router = useRouter();
   const [role, setRole] = useState<UserRole>('customer');
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [toast, setToast] = useState(false);
 
   useEffect(() => {
     if (typeof window === 'undefined') return;
     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
     const currentUserRaw = localStorage.getItem('currentUser');
     if (!loggedIn || !currentUserRaw) {
       router.push('/login');
       return;
     }
     try {
       const currentUser = JSON.parse(currentUserRaw);
       setRole((currentUser.role as UserRole) || 'customer');
       setName(currentUser.name || '');
       setPhone(currentUser.phone || '');
       setEmail(currentUser.email || '');
     } catch {
       router.push('/login');
     }
   }, [router]);
 
   const save = () => {
     const currentUser = { role, name, phone, email };
     localStorage.setItem('currentUser', JSON.stringify(currentUser));
     setToast(true);
     setTimeout(() => setToast(false), 2000);
   };
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
           <p className="text-gray-600">Manage your personal details and view recent activity</p>
         </div>
 
         <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
             <div className="flex items-center gap-2 mb-4">
               <User className="h-5 w-5 text-orange-600" />
               <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
             </div>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                 <input
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                   placeholder="Your Name"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                 <div className="flex items-center gap-2">
                   <Phone className="h-4 w-4 text-gray-500" />
                   <input
                     value={phone}
                     readOnly
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                 <div className="flex items-center gap-2">
                   <Mail className="h-4 w-4 text-gray-500" />
                   <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                     placeholder="you@example.com"
                   />
                 </div>
               </div>
               <button
                 type="button"
                 onClick={save}
                 className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white font-semibold shadow hover:bg-orange-600 transition"
               >
                 <CheckCircle className="h-5 w-5" />
                 Save Changes
               </button>
             </div>
           </div>
 
           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
             <div className="flex items-center gap-2 mb-4">
               <BadgeCheck className="h-5 w-5 text-blue-600" />
               <h2 className="text-lg font-semibold text-gray-900">My Activity</h2>
             </div>
 
             {role === 'customer' ? (
               <div className="space-y-3">
                 <div className="rounded-lg border border-gray-200 p-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <div className="font-semibold text-gray-900">Tailoring Service - Sunita Sharma</div>
                       <div className="text-sm text-gray-600">Status: Completed</div>
                     </div>
                     <CalendarCheck className="h-5 w-5 text-green-600" />
                   </div>
                   <div className="text-sm text-gray-500 mt-2">Date: Feb 10</div>
                 </div>
                 <div className="rounded-lg border border-gray-200 p-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <div className="font-semibold text-gray-900">Mehendi - Riya Singh</div>
                       <div className="text-sm text-gray-600">Status: Scheduled</div>
                     </div>
                     <CalendarCheck className="h-5 w-5 text-yellow-600" />
                   </div>
                   <div className="text-sm text-gray-500 mt-2">Date: Feb 12</div>
                 </div>
               </div>
             ) : (
               <div className="space-y-4">
                 <div className="rounded-lg border border-gray-200 p-4">
                   <div className="flex items-center gap-2 text-gray-500 mb-2">
                     <Wallet className="h-5 w-5 text-orange-600" />
                     <span className="font-medium">My Earnings</span>
                   </div>
                   <div className="text-3xl font-bold text-gray-900">₹650</div>
                 </div>
                 <div className="rounded-lg border border-gray-200 p-4">
                   <div className="flex items-center gap-2 text-gray-500 mb-2">
                     <ClipboardList className="h-5 w-5 text-blue-600" />
                     <span className="font-medium">Active Jobs</span>
                   </div>
                   <div className="text-gray-800">1. Alteration - Neha Gupta (Due: Feb 14)</div>
                   <div className="text-gray-800">2. Blouse Stitching - Aarti (Due: Feb 16)</div>
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>
 
       {toast && (
         <div className="fixed bottom-6 inset-x-0 flex justify-center px-4">
           <div className="flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 shadow-lg">
             Saved Successfully
           </div>
         </div>
       )}
     </div>
   );
 }
