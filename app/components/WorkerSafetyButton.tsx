 'use client';
 
 import { useState, useEffect } from 'react';
 import { ShieldAlert, MapPin, PhoneCall, X } from 'lucide-react';
 import { useAuth } from '@/app/context/AuthContext';
 
 export default function WorkerSafetyButton() {
   const { user } = useAuth();
   const [showSOSModal, setShowSOSModal] = useState(false);
   const [sosToast, setSosToast] = useState(false);
   const [sosToastMsg, setSosToastMsg] = useState('');
   const [fakeCall, setFakeCall] = useState(false);
 
  if (!user || user.role !== 'worker') return null;
 
   const shareLiveLocation = () => {
     const done = () => {
       setSosToastMsg('Location sent to HCF Admin Team! Tracking started.');
       setSosToast(true);
       setTimeout(() => setSosToast(false), 3000);
       setShowSOSModal(false);
     };
     try {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
           () => done(),
           () => done(),
           { enableHighAccuracy: true, timeout: 5000 }
         );
       } else {
         done();
       }
     } catch {
       done();
     }
   };
 
   const callPolice = () => {
     try {
       window.location.href = 'tel:100';
     } catch {}
   };
 
   const triggerFakeCall = () => {
     setFakeCall(true);
     setShowSOSModal(false);
     setTimeout(() => setFakeCall(false), 5000);
   };
 
   return (
     <>
      <button
         type="button"
         onClick={() => setShowSOSModal(true)}
        className="fixed bottom-6 left-6 z-[9999] inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 text-white text-lg font-bold shadow-2xl shadow-red-500/50 hover:bg-red-700"
       >
         <span className="relative inline-flex">
           <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
          <ShieldAlert className="relative h-6 w-6" />
         </span>
         🆘 SOS HELP
       </button>
 
       {showSOSModal && (
         <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4">
           <div className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-gray-200">
             <div className="border-b border-gray-200 p-4 flex items-center justify-between">
               <h3 className="text-xl font-semibold text-gray-900">Are you feeling unsafe?</h3>
               <button
                 type="button"
                 onClick={() => setShowSOSModal(false)}
                 className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50"
               >
                 <X className="h-5 w-5" />
               </button>
             </div>
             <div className="p-5 space-y-3">
               <button
                 type="button"
                 onClick={shareLiveLocation}
                 className="w-full inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700"
               >
                 <MapPin className="h-5 w-5" />
                 Share Live Location with Admin
               </button>
               <button
                 type="button"
                 onClick={callPolice}
                 className="w-full inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-white font-semibold hover:bg-black"
               >
                 <PhoneCall className="h-5 w-5" />
                 Call Police (100)
               </button>
               <button
                 type="button"
                 onClick={triggerFakeCall}
                 className="w-full inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-gray-900 border border-gray-300 hover:bg-gray-50"
               >
                 <PhoneCall className="h-5 w-5 text-green-600" />
                 Fake Call
               </button>
             </div>
           </div>
         </div>
       )}
 
       {sosToast && (
         <div className="fixed bottom-6 inset-x-0 flex justify-center px-4 z-[10000]">
           <div className="flex items-center gap-2 rounded-full bg-green-600 text-white px-5 py-3 shadow-lg">
             <span className="font-semibold">{sosToastMsg}</span>
           </div>
         </div>
       )}
 
       {fakeCall && (
         <div className="pointer-events-none fixed inset-0 z-[9998]">
           <div className="absolute top-4 right-4 rounded-xl bg-white border border-gray-200 shadow-lg px-4 py-3 flex items-center gap-2 animate-pulse">
             <PhoneCall className="h-6 w-6 text-green-600" />
             <span className="font-semibold text-gray-900">Incoming Call…</span>
           </div>
         </div>
       )}
     </>
   );
 }
